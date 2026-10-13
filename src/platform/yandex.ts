// Yandex Games SDK adapter (spec 3.4). Method names follow the SDK documentation:
// https://yandex.ru/dev/games/doc/ru/sdk/sdk-about (checked 2026-10-11).
import type { SaveData } from '../core/state';
import type { PlatformAdapter } from './adapter';
import { PauseTracker } from './pause';

interface YPlayer {
  isAuthorized(): boolean;
  getData(keys?: string[]): Promise<Record<string, unknown>>;
  setData(data: Record<string, unknown>, flush?: boolean): Promise<void>;
}

interface AdCallbacks {
  onOpen?: () => void;
  onClose?: (wasShown: boolean) => void;
  onError?: (error: unknown) => void;
  onRewarded?: () => void;
}

interface YSDK {
  features: {
    LoadingAPI?: { ready(): void };
    GameplayAPI?: { start(): void; stop(): void };
  };
  environment: { i18n: { lang: string } };
  getPlayer(opts?: { signed?: boolean }): Promise<YPlayer>;
  auth: { openAuthDialog(): Promise<void> };
  adv: {
    showFullscreenAdv(opts: { callbacks: AdCallbacks }): void;
    showRewardedVideo(opts: { callbacks: AdCallbacks }): void;
  };
  feedback?: {
    canReview(): Promise<{ value: boolean; reason?: string }>;
    requestReview(): Promise<{ feedbackSent: boolean }>;
  };
  shortcut?: {
    canShowPrompt(): Promise<{ canShow: boolean }>;
    showPrompt(): Promise<{ outcome?: string }>;
  };
  on(event: 'game_api_pause' | 'game_api_resume', cb: () => void): void;
}

declare global {
  interface Window {
    YaGames?: { init(): Promise<YSDK> };
  }
}

const SAVE_KEY = 'save';
// Languages whose players most likely read Russian; everyone else gets English (spec 6.4).
const RUSSIAN_READERS = new Set(['ru', 'be', 'kk', 'uk', 'uz']);

export class YandexAdapter implements PlatformAdapter {
  private ysdk!: YSDK;
  private player: YPlayer | null = null;
  private pause = new PauseTracker();
  private ready = false;

  static available(): boolean {
    return typeof window !== 'undefined' && !!window.YaGames;
  }

  async init(): Promise<void> {
    const sdk = window.YaGames;
    if (!sdk) throw new Error('Yandex Games SDK is not loaded');
    this.ysdk = await sdk.init();
    this.ysdk.on('game_api_pause', () => this.pause.set('platform', true));
    this.ysdk.on('game_api_resume', () => this.pause.set('platform', false));
    this.pause.watchPage();
    await this.refreshPlayer();
  }

  gameReady(): void {
    if (this.ready) return;
    this.ready = true;
    this.ysdk.features.LoadingAPI?.ready();
  }

  gameplayStart(): void {
    this.ysdk.features.GameplayAPI?.start();
  }

  gameplayStop(): void {
    this.ysdk.features.GameplayAPI?.stop();
  }

  getLanguage(): 'ru' | 'en' {
    const lang = this.ysdk.environment.i18n.lang;
    if (!lang) return 'ru';
    return RUSSIAN_READERS.has(lang) ? 'ru' : 'en';
  }

  async loadCloud(): Promise<SaveData | null> {
    if (!this.player) return null;
    const data = await this.player.getData([SAVE_KEY]);
    return (data[SAVE_KEY] as SaveData | undefined) ?? null;
  }

  async saveCloud(data: SaveData, flush = false): Promise<void> {
    await this.player?.setData({ [SAVE_KEY]: data }, flush);
  }

  isAuthorized(): boolean {
    return this.player?.isAuthorized() ?? false;
  }

  // Only ever called from the sign-in button (spec 2.1, rule 1.2).
  async requestAuth(): Promise<boolean> {
    try {
      await this.ysdk.auth.openAuthDialog();
    } catch {
      // The player closed the dialog; nothing changes.
    }
    await this.refreshPlayer();
    return this.isAuthorized();
  }

  // https://yandex.ru/dev/games/doc/ru/sdk/sdk-review (checked 2026-10-13): canReview first, once per session.
  async requestReview(): Promise<'sent' | 'closed' | 'unavailable'> {
    try {
      const feedback = this.ysdk.feedback;
      // A silent SDK must not hold the game on the finale screen.
      const timeout = new Promise<{ value: false }>((resolve) => setTimeout(() => resolve({ value: false }), 5000));
      if (!feedback || !(await Promise.race([feedback.canReview(), timeout])).value) return 'unavailable';
      const { feedbackSent } = await feedback.requestReview();
      return feedbackSent ? 'sent' : 'closed';
    } catch {
      return 'unavailable';
    }
  }

  // https://yandex.ru/dev/games/doc/ru/sdk/sdk-shortcut (checked 2026-10-13).
  async canShowShortcut(): Promise<boolean> {
    try {
      return (await this.ysdk.shortcut?.canShowPrompt())?.canShow ?? false;
    } catch {
      return false;
    }
  }

  async showShortcut(): Promise<boolean> {
    try {
      return (await this.ysdk.shortcut?.showPrompt())?.outcome === 'accepted';
    } catch {
      return false;
    }
  }

  showInterstitial(): Promise<void> {
    return new Promise((resolve) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        this.pause.set('ad', false);
        resolve();
      };
      this.pause.set('ad', true);
      try {
        this.ysdk.adv.showFullscreenAdv({ callbacks: { onClose: finish, onError: finish } });
      } catch {
        finish();
      }
    });
  }

  showRewarded(): Promise<boolean> {
    return new Promise((resolve) => {
      let rewarded = false;
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        this.pause.set('ad', false);
        resolve(rewarded);
      };
      this.pause.set('ad', true);
      try {
        this.ysdk.adv.showRewardedVideo({
          callbacks: {
            onRewarded: () => (rewarded = true),
            onClose: finish,
            onError: finish,
          },
        });
      } catch {
        finish();
      }
    });
  }

  onPause(cb: () => void): void {
    this.pause.onPause(cb);
  }

  onResume(cb: () => void): void {
    this.pause.onResume(cb);
  }

  private async refreshPlayer(): Promise<void> {
    try {
      this.player = await this.ysdk.getPlayer();
    } catch {
      this.player = null;
    }
  }
}
