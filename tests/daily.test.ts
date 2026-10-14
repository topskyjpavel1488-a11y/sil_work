import { describe, expect, it } from 'vitest';
import { fixture as content } from './fixture';
import { claimGift, dayKey, giftDue, giftFor, welcomeDue } from '../src/core/daily';
import { createInitialState } from '../src/core/state';

const played = () => {
  const s = createInitialState(content);
  s.tutorial = { done: true, step: 99 };
  return s;
};

describe('coming back', () => {
  it('formats the local day', () => {
    expect(dayKey(new Date(2026, 0, 5, 23, 59))).toBe('2026-01-05');
  });

  it('only starts the count on the first day, without a gift', () => {
    const r = claimGift(played(), content, '2026-10-14');
    expect(r.gift).toEqual({});
    expect(r.state.giftDay).toBe('2026-10-14');
    expect(r.state.resources).toEqual(played().resources);
  });

  it('gives the gift once on a new day, mostly what the goal lacks', () => {
    const s = played();
    s.giftDay = '2026-10-13';
    expect(giftDue(s, '2026-10-14')).toBe(true);
    const r = claimGift(s, content, '2026-10-14');
    expect(r.gift).toEqual(giftFor(s, content));
    expect(r.gift.wood).toBe(2); // the workbench needs wood first
    expect(r.state.resources.wood).toBe(2);
    expect(claimGift(r.state, content, '2026-10-14').state).toBe(r.state);
  });

  it('waits for the tutorial and stops once everything is restored', () => {
    const s = played();
    s.giftDay = '2026-10-13';
    expect(giftDue({ ...s, tutorial: { done: false, step: 2 } }, '2026-10-14')).toBe(false);
    for (const o of content.objects) s.objects[o.id] = { step: o.steps.length };
    expect(giftFor(s, content)).toEqual({});
  });

  it('welcomes back after a long break only', () => {
    const now = Date.UTC(2026, 9, 14, 12);
    expect(welcomeDue(0, now)).toBe(false);
    expect(welcomeDue(now - 2 * 3600_000, now)).toBe(false);
    expect(welcomeDue(now - 7 * 3600_000, now)).toBe(true);
  });
});
