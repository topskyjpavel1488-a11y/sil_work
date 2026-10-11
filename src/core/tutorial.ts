// Tutorial progress (spec 4.6). Scenes send signals; a step ends when its `until` signal arrives
// or when the player skips it. After the last step the tutorial never shows again.
import type { Content } from './content';
import { isZoneCleared } from './progress';
import { cloneState, type GameState } from './state';

export type TutorialTargetType = 'zone' | 'debris' | 'nav' | 'mergePair' | 'object';

export interface TutorialStep {
  id: string;
  textKey: string;
  target: { type: TutorialTargetType; id: string };
  until: string;
}

export function currentTutorialStep(state: GameState, steps: TutorialStep[]): TutorialStep | null {
  if (state.tutorial.done) return null;
  return steps[state.tutorial.step] ?? null;
}

function advance(state: GameState, steps: TutorialStep[]): GameState {
  const next = cloneState(state);
  next.tutorial.step += 1;
  if (next.tutorial.step >= steps.length) next.tutorial.done = true;
  return next;
}

// Returns the same state object when the signal does not end the current step.
export function tutorialSignal(state: GameState, steps: TutorialStep[], signal: string): GameState {
  const step = currentTutorialStep(state, steps);
  return step && step.until === signal ? advance(state, steps) : state;
}

// Applies the signal, then any signals the resulting state already satisfies.
export function applyTutorialSignal(state: GameState, content: Content, steps: TutorialStep[], signal: string | null): GameState {
  let next = signal ? tutorialSignal(state, steps, signal) : state;
  for (let guard = 0; guard < steps.length; guard++) {
    const before = next;
    for (const s of stateSignals(next, content)) next = tutorialSignal(next, steps, s);
    if (next === before) break;
  }
  return next;
}

export function skipTutorialStep(state: GameState, steps: TutorialStep[]): GameState {
  return currentTutorialStep(state, steps) ? advance(state, steps) : state;
}

// Signals implied by the state itself, so a step that is already satisfied (for example,
// a zone cleared before the tutorial reached it) does not wait forever.
export function stateSignals(state: GameState, content: Content): string[] {
  const signals: string[] = [];
  for (const zone of content.zones) {
    if ((state.zones[zone.id]?.taken.length ?? 0) > 0) signals.push(`enterZone:${zone.id}`);
    if (isZoneCleared(state, zone)) signals.push(`zoneCleared:${zone.id}`);
  }
  for (const [objectId, object] of Object.entries(state.objects)) {
    if (object.step > 0) signals.push(`repaired:${objectId}`);
  }
  return signals;
}
