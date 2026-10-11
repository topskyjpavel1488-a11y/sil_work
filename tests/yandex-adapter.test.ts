import { afterEach, describe, expect, it, vi } from 'vitest';
import { YandexAdapter } from '../src/platform/yandex';

type Cb = Record<string, ((arg?: unknown) => void) | undefined>;

function fakeSdk(opts: { lang?: string; authorized?: boolean } = {}) {
  const handlers: Record<string, () => void> = {};
  let authorized = opts.authorized ?? false;
  const store: Record<string, unknown> = {};
  const sdk = {
    calls: [] as string[],
    lastAd: null as Cb | null,
    features: {
      LoadingAPI: { ready: () => sdk.calls.push('ready') },
      GameplayAPI: { start: () => sdk.calls.push('start'), stop: () => sdk.calls.push('stop') },
    },
    environment: { i18n: { lang: opts.lang ?? 'ru' } },
    getPlayer: async () => ({
      isAuthorized: () => authorized,
      getData: async () => ({ ...store }),
      setData: async (data: Record<string, unknown>, flush?: boolean) => {
        Object.assign(store, data);
        sdk.calls.push(`setData:${flush ? 'flush' : 'queue'}`);
      },
    }),
    auth: { openAuthDialog: async () => void (authorized = true) },
    adv: {
      showFullscreenAdv: ({ callbacks }: { callbacks: Cb }) => (sdk.lastAd = callbacks),
      showRewardedVideo: ({ callbacks }: { callbacks: Cb }) => (sdk.lastAd = callbacks),
    },
    on: (event: string, cb: () => void) => (handlers[event] = cb),
    emit: (event: string) => handlers[event]?.(),
  };
  vi.stubGlobal('window', { YaGames: { init: async () => sdk }, addEventListener: () => undefined });
  return sdk;
}

async function adapterWith(opts?: Parameters<typeof fakeSdk>[0]) {
  const sdk = fakeSdk(opts);
  const adapter = new YandexAdapter();
  await adapter.init();
  return { sdk, adapter };
}

afterEach(() => vi.unstubAllGlobals());

describe('YandexAdapter', () => {
  it('maps the platform language to ru or en', async () => {
    expect((await adapterWith({ lang: 'ru' })).adapter.getLanguage()).toBe('ru');
    expect((await adapterWith({ lang: 'kk' })).adapter.getLanguage()).toBe('ru');
    expect((await adapterWith({ lang: 'en' })).adapter.getLanguage()).toBe('en');
    expect((await adapterWith({ lang: 'tr' })).adapter.getLanguage()).toBe('en');
  });

  it('reports ready once', async () => {
    const { sdk, adapter } = await adapterWith();
    adapter.gameReady();
    adapter.gameReady();
    expect(sdk.calls.filter((c) => c === 'ready')).toHaveLength(1);
  });

  it('signs in only on request and then stores the cloud save', async () => {
    const { sdk, adapter } = await adapterWith();
    expect(adapter.isAuthorized()).toBe(false);
    expect(await adapter.requestAuth()).toBe(true);
    await adapter.saveCloud({ version: 1 } as never, true);
    expect(sdk.calls).toContain('setData:flush');
    expect(await adapter.loadCloud()).toEqual({ version: 1 });
  });

  it('pauses for an interstitial and resumes when it closes', async () => {
    const { sdk, adapter } = await adapterWith();
    const events: string[] = [];
    adapter.onPause(() => events.push('pause'));
    adapter.onResume(() => events.push('resume'));
    const shown = adapter.showInterstitial();
    expect(events).toEqual(['pause']);
    sdk.lastAd?.onClose?.(true);
    await shown;
    expect(events).toEqual(['pause', 'resume']);
  });

  it('grants a reward only after onRewarded', async () => {
    const { sdk, adapter } = await adapterWith();
    const watched = adapter.showRewarded();
    sdk.lastAd?.onRewarded?.();
    sdk.lastAd?.onClose?.(true);
    expect(await watched).toBe(true);

    const skipped = adapter.showRewarded();
    sdk.lastAd?.onClose?.(false);
    expect(await skipped).toBe(false);

    const failed = adapter.showRewarded();
    sdk.lastAd?.onError?.(new Error('no ads'));
    expect(await failed).toBe(false);
  });

  it('keeps the game paused until both the ad and the platform pause are over', async () => {
    const { sdk, adapter } = await adapterWith();
    const events: string[] = [];
    adapter.onPause(() => events.push('pause'));
    adapter.onResume(() => events.push('resume'));
    sdk.emit('game_api_pause');
    const shown = adapter.showInterstitial();
    sdk.lastAd?.onClose?.(true);
    await shown;
    expect(events).toEqual(['pause']);
    sdk.emit('game_api_resume');
    expect(events).toEqual(['pause', 'resume']);
  });
});
