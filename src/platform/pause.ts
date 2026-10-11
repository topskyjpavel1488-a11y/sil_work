// Pause bookkeeping shared by adapters. Several things can pause the game at once
// (hidden tab, lost focus, an ad, the platform's own pause event); the game resumes only
// when all of them are over, so an ad never gets its sound back because the window refocused.
export type PauseReason = 'hidden' | 'blur' | 'ad' | 'platform';

export class PauseTracker {
  private reasons = new Set<PauseReason>();
  private pauseHandlers: (() => void)[] = [];
  private resumeHandlers: (() => void)[] = [];

  onPause(cb: () => void): void {
    this.pauseHandlers.push(cb);
  }

  onResume(cb: () => void): void {
    this.resumeHandlers.push(cb);
  }

  set(reason: PauseReason, paused: boolean): void {
    const wasPaused = this.reasons.size > 0;
    if (paused) this.reasons.add(reason);
    else this.reasons.delete(reason);
    const isPaused = this.reasons.size > 0;
    if (isPaused && !wasPaused) for (const cb of this.pauseHandlers) cb();
    if (!isPaused && wasPaused) for (const cb of this.resumeHandlers) cb();
  }

  // Sound goes off when the page is hidden or loses focus (spec 2.1).
  watchPage(): void {
    if (typeof document === 'undefined') return;
    document.addEventListener('visibilitychange', () => this.set('hidden', document.hidden));
    window.addEventListener('blur', () => this.set('blur', true));
    window.addEventListener('focus', () => this.set('blur', false));
  }
}
