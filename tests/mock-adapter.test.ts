import { describe, expect, it, vi } from 'vitest';
import { MockAdapter } from '../src/platform/mock';
import type { SaveData } from '../src/core/state';

const save: SaveData = {
  version: 1,
  resources: { wood: 1, metal: 2, parts: 3 },
  board: [null, { chain: 'fasteners', level: 1 }],
  box: [null],
  objects: {},
  zones: {},
  finds: [],
  tutorial: { done: false, step: 0 },
  settings: { music: true, sfx: true },
  savedAt: 123,
};

describe('MockAdapter', () => {
  it('round-trips cloud saves without sharing references', async () => {
    const a = new MockAdapter();
    await a.init();
    expect(await a.loadCloud()).toBeNull();
    await a.saveCloud(save);
    const loaded = await a.loadCloud();
    expect(loaded).toEqual(save);
    expect(loaded).not.toBe(save);
  });

  it('pauses during a rewarded ad and grants the reward', async () => {
    vi.useFakeTimers();
    const a = new MockAdapter();
    const events: string[] = [];
    a.onPause(() => events.push('pause'));
    a.onResume(() => events.push('resume'));
    const result = a.showRewarded();
    expect(events).toEqual(['pause']);
    await vi.advanceTimersByTimeAsync(1000);
    expect(await result).toBe(true);
    expect(events).toEqual(['pause', 'resume']);
    vi.useRealTimers();
  });

  it('defaults to Russian', () => {
    expect(new MockAdapter().getLanguage()).toBe('ru');
  });
});
