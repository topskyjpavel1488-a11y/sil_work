import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Ads } from '../src/ads';
import { config } from '../src/config';
import { createInitialState } from '../src/core/state';
import { content } from '../src/data/index';
import type { PlatformAdapter } from '../src/platform/adapter';
import type { SaveManager } from '../src/save';
import type { Store } from '../src/store';

function setup(opts: { tutorialDone?: boolean; firstSession?: boolean; enabled?: boolean; rewarded?: boolean } = {}) {
  const state = createInitialState(content);
  state.tutorial.done = opts.tutorialDone ?? true;
  const platform = {
    showInterstitial: vi.fn(async () => undefined),
    showRewarded: vi.fn(async () => opts.rewarded ?? true),
  } as unknown as PlatformAdapter;
  const store = { state, grantReward: vi.fn() } as unknown as Store;
  const saver = { saveNow: vi.fn() } as unknown as SaveManager;
  const ads = new Ads(platform, store, saver, opts.firstSession ?? false, opts.enabled ?? true);
  return { ads, platform, store, saver };
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('Ads', () => {
  it('shows nothing in the test build', async () => {
    const { ads, platform } = setup({ enabled: false });
    await ads.interstitial();
    expect(await ads.rewarded('parts')).toBe(false);
    expect(platform.showInterstitial).not.toHaveBeenCalled();
    expect(platform.showRewarded).not.toHaveBeenCalled();
  });

  it('shows no interstitial during the tutorial', async () => {
    const { ads, platform } = setup({ tutorialDone: false });
    await ads.interstitial();
    expect(platform.showInterstitial).not.toHaveBeenCalled();
  });

  it('waits out the first minutes of the first session', async () => {
    const { ads, platform } = setup({ firstSession: true });
    await ads.interstitial();
    expect(platform.showInterstitial).not.toHaveBeenCalled();
    vi.advanceTimersByTime(config.firstSessionNoAdsSec * 1000);
    await ads.interstitial();
    expect(platform.showInterstitial).toHaveBeenCalledTimes(1);
  });

  it('keeps the cooldown between interstitials and saves before showing', async () => {
    const { ads, platform, saver } = setup();
    await ads.interstitial();
    await ads.interstitial();
    expect(platform.showInterstitial).toHaveBeenCalledTimes(1);
    expect(saver.saveNow).toHaveBeenCalledWith(true);
    vi.advanceTimersByTime(config.adCooldownSec * 1000);
    await ads.interstitial();
    expect(platform.showInterstitial).toHaveBeenCalledTimes(2);
  });

  it('grants a reward only when the view is confirmed', async () => {
    const watched = setup();
    expect(await watched.ads.rewarded('washer')).toBe(true);
    expect(watched.store.grantReward).toHaveBeenCalledWith('washer');

    const skipped = setup({ rewarded: false });
    expect(await skipped.ads.rewarded('parts')).toBe(false);
    expect(skipped.store.grantReward).not.toHaveBeenCalled();
  });
});
