// Repair steps (spec 4.4) and finds (spec 4.5).
import { findObject, type Content } from './content';
import { isFinished, isObjectAvailable, isObjectRestored } from './progress';
import {
  cloneState,
  countItems,
  reject,
  RESOURCES,
  stepOf,
  type ActionResult,
  type ChainId,
  type GameEvent,
  type GameState,
  type Resource,
} from './state';

export type Requirement =
  | { kind: 'resource'; resource: Resource; have: number; need: number }
  | { kind: 'item'; chain: ChainId; level: number; have: number; need: number };

export interface RepairCheck {
  ok: boolean;
  reason?: 'unknownObject' | 'objectLocked' | 'objectRestored' | 'notEnough';
  requirements: Requirement[];
}

export function checkRepair(state: GameState, content: Content, objectId: string): RepairCheck {
  const object = findObject(content, objectId);
  if (!object) return { ok: false, reason: 'unknownObject', requirements: [] };
  if (!isObjectAvailable(state, object)) return { ok: false, reason: 'objectLocked', requirements: [] };
  if (isObjectRestored(state, object)) return { ok: false, reason: 'objectRestored', requirements: [] };

  const cost = object.steps[stepOf(state, objectId)]?.cost ?? {};
  const requirements: Requirement[] = [];
  for (const resource of RESOURCES) {
    const need = cost.resources?.[resource] ?? 0;
    if (need > 0) requirements.push({ kind: 'resource', resource, have: state.resources[resource], need });
  }
  // Items count only at the exact level, on the board and in the box together.
  for (const item of cost.items ?? []) {
    const have = countItems(state, item.chain, item.level);
    requirements.push({ kind: 'item', chain: item.chain, level: item.level, have, need: item.count });
  }
  const ok = requirements.every((r) => r.have >= r.need);
  return ok ? { ok, requirements } : { ok, reason: 'notEnough', requirements };
}

// Atomic: either the whole step is paid and applied, or the state is untouched.
export function repair(state: GameState, content: Content, objectId: string): ActionResult {
  const check = checkRepair(state, content, objectId);
  if (!check.ok) return reject(state, check.reason ?? 'notEnough');
  const object = findObject(content, objectId);
  const stepIndex = stepOf(state, objectId);
  const step = object?.steps[stepIndex];
  if (!object || !step) return reject(state, 'unknownObject');

  const next = cloneState(state);
  for (const resource of RESOURCES) next.resources[resource] -= step.cost.resources?.[resource] ?? 0;
  for (const item of step.cost.items ?? []) {
    let left = item.count;
    // Pay from the box first, then from the board starting at the end.
    for (const area of ['box', 'board'] as const) {
      for (let i = next[area].length - 1; i >= 0 && left > 0; i--) {
        const cell = next[area][i];
        if (cell && cell.chain === item.chain && cell.level === item.level) {
          next[area][i] = null;
          left--;
        }
      }
    }
  }
  next.objects[objectId] = { step: stepIndex + 1 };

  const events: GameEvent[] = [{ type: 'repaired', objectId, step: stepIndex + 1 }];
  if (stepIndex + 1 === object.steps.length) events.push({ type: 'objectRestored', objectId });
  if (step.find && !next.finds.includes(step.find)) {
    next.finds.push(step.find);
    events.push({ type: 'findOpened', findId: step.find });
  }
  if (isFinished(next, content)) events.push({ type: 'finished' });
  return { state: next, events };
}
