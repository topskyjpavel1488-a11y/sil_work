// When ads may show (spec 8). Only the release build shows ads; the test build has none.
// Interstitials: right after the player's action, never during the tutorial or the first
// minutes of the very first session, and not more often than the cooldown.
import { BUILD, config } from './config';
import type { RewardKind } from './core/state';
import type { PlatformAdapter } from './platform/adapter';
import type { SaveManager } from './save';
import type { Store } from './store';

export class Ads {
  private showing = false;
  private lastInterstitialAt = 0;
  private readonly sessionStart = Date.now();

  constructor(
    private readonly platform: PlatformAdapter,
    private readonly store: Store,
    private readonly saver: SaveManager,
    private readonly firstSession: boolean,
    readonly enabled: boolean = BUILD === 'release',
  ) {}

  get busy(): boolean {
    return this.showing;
  }

  private canInterstitial(now: number): boolean {
    if (!this.enabled || this.showing || !this.store.state.tutorial.done) return false;
    if (this.firstSession && now - this.sessionStart < config.firstSessionNoAdsSec * 1000) return false;
    return now - this.lastInterstitialAt >= config.adCooldownSec * 1000;
  }

  // Resolves when the ad is closed or was not shown; the caller then continues its action.
  async interstitial(): Promise<void> {
    const now = Date.now();
    if (!this.canInterstitial(now)) return;
    this.showing = true;
    this.lastInterstitialAt = now;
    this.saver.saveNow(true);
    try {
      await this.platform.showInterstitial();
    } finally {
      this.showing = false;
      this.saver.saveNow();
    }
  }

  // The reward is granted only when the platform confirms the view (spec 8.4).
  async rewarded(kind: RewardKind): Promise<boolean> {
    if (!this.enabled || this.showing) return false;
    this.showing = true;
    this.saver.saveNow(true);
    let rewarded: boolean;
    try {
      rewarded = await this.platform.showRewarded();
    } catch {
      rewarded = false;
    } finally {
      this.showing = false;
    }
    if (rewarded) this.store.grantReward(kind);
    else this.saver.saveNow();
    return rewarded;
  }
}
