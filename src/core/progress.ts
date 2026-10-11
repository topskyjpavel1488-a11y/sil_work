// Availability, goals and completion derived from state + content (spec 4.2, 4.4, 4.7).
import type { Condition, Content, ObjectDef, ZoneDef } from './content';
import { stepOf, type GameState } from './state';

export const meets = (state: GameState, cond?: Condition) => !cond || stepOf(state, cond.object) >= cond.step;

export const isObjectAvailable = (state: GameState, obj: ObjectDef) => meets(state, obj.requires);
export const isObjectRestored = (state: GameState, obj: ObjectDef) => stepOf(state, obj.id) >= obj.steps.length;
export const isZoneUnlocked = (state: GameState, zone: ZoneDef) => meets(state, zone.unlock);

export function isZoneCleared(state: GameState, zone: ZoneDef): boolean {
  const taken = state.zones[zone.id]?.taken ?? [];
  return zone.debris.every((d) => taken.includes(d.id));
}

export interface Goal {
  object: ObjectDef;
  stepIndex: number;
}

// The goal banner shows the first available unfinished step in objects.json order (spec 4.4).
export function currentGoal(state: GameState, content: Content): Goal | null {
  for (const object of content.objects) {
    if (isObjectAvailable(state, object) && !isObjectRestored(state, object)) {
      return { object, stepIndex: stepOf(state, object.id) };
    }
  }
  return null;
}

export const isFinished = (state: GameState, content: Content) => content.objects.every((o) => isObjectRestored(state, o));
