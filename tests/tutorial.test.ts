import { describe, expect, it } from 'vitest';
import { createInitialState } from '../src/core/state';
import { applyTutorialSignal, currentTutorialStep, skipTutorialStep, tutorialSignal } from '../src/core/tutorial';
import { content } from '../src/data/index';

const steps = content.tutorial;
const stepId = (s: ReturnType<typeof createInitialState>) => currentTutorialStep(s, steps)?.id ?? null;

describe('tutorial', () => {
  it('starts at the first step and advances only on its own signal', () => {
    const s = createInitialState(content);
    expect(stepId(s)).toBe('open_zone');
    expect(tutorialSignal(s, steps, 'enterTable')).toBe(s);
    expect(stepId(tutorialSignal(s, steps, 'enterZone:door'))).toBe('clear_zone');
  });

  it('can be skipped step by step and then never shows again', () => {
    let s = createInitialState(content);
    for (let i = 0; i < steps.length; i++) s = skipTutorialStep(s, steps);
    expect(s.tutorial.done).toBe(true);
    expect(stepId(s)).toBeNull();
    expect(skipTutorialStep(s, steps)).toBe(s);
  });

  it('skips steps the state already satisfies', () => {
    const s = createInitialState(content);
    s.zones.door = { taken: content.zones[0]!.debris.map((d) => d.id) };
    expect(stepId(applyTutorialSignal(s, content, steps, null))).toBe('open_table');
  });

  it('finishes after the workbench repair', () => {
    let s = createInitialState(content);
    s.tutorial.step = steps.length - 1;
    s = applyTutorialSignal(s, content, steps, 'repaired:workbench');
    expect(s.tutorial.done).toBe(true);
  });
});
