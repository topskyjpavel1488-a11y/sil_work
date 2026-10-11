import { afterEach, describe, expect, it, vi } from 'vitest';
import { PauseTracker } from '../src/platform/pause';

type Listener = () => void;

function fakePage() {
  const win: Record<string, Listener[]> = {};
  const doc: Record<string, Listener[]> = {};
  const page = { hidden: false, focused: true };
  vi.stubGlobal('window', { addEventListener: (e: string, cb: Listener) => (win[e] ??= []).push(cb) });
  vi.stubGlobal('document', {
    get hidden() {
      return page.hidden;
    },
    hasFocus: () => page.focused,
    addEventListener: (e: string, cb: Listener) => (doc[e] ??= []).push(cb),
  });
  const fire = (target: Record<string, Listener[]>, e: string) => target[e]?.forEach((cb) => cb());
  return { page, win: (e: string) => fire(win, e), doc: (e: string) => fire(doc, e) };
}

afterEach(() => vi.unstubAllGlobals());

function tracked() {
  const t = new PauseTracker();
  const events: string[] = [];
  t.onPause(() => events.push('pause'));
  t.onResume(() => events.push('resume'));
  return { t, events };
}

describe('PauseTracker', () => {
  it('pauses on blur and resumes on focus', () => {
    const page = fakePage();
    const { t, events } = tracked();
    t.watchPage();
    page.win('blur');
    page.win('focus');
    expect(events).toEqual(['pause', 'resume']);
  });

  it('does not stay frozen when focus never comes back', () => {
    const page = fakePage();
    const { t, events } = tracked();
    t.watchPage();
    page.win('blur');
    page.win('pointerdown');
    expect(events).toEqual(['pause', 'resume']);
  });

  it('resumes when a hidden page becomes visible again with focus', () => {
    const page = fakePage();
    const { t, events } = tracked();
    t.watchPage();
    page.win('blur');
    page.page.hidden = true;
    page.doc('visibilitychange');
    page.page.hidden = false;
    page.doc('visibilitychange');
    expect(events).toEqual(['pause', 'resume']);
  });

  it('stays paused while an ad plays even if the player taps', () => {
    const page = fakePage();
    const { t, events } = tracked();
    t.watchPage();
    t.set('ad', true);
    page.win('pointerdown');
    expect(events).toEqual(['pause']);
    t.set('ad', false);
    expect(events).toEqual(['pause', 'resume']);
  });
});
