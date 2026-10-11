// Repair steps (spec 4.4) and finds (spec 4.5).
import { findObject, type Content, type ItemAmount } from './content';
import { isFinished, isObjectAvailable, isObjectRestored } from './progress';
import {
  cloneState,
  countItems,
  reject,
  RESOURCES,
  stepOf,
  type ActionResult,
  type CellRef,
  type ChainId,
  type GameEvent,
  type GameState,
  type ItemRef,
  type Resource,
} from './state';

export type Requirement =
  | { kind: 'resource'; resource: Resource; have: number; need: number }
  // have: items of the exact level; covered: what the payment can supply, splitting higher items if needed.
  | { kind: 'item'; chain: ChainId; level: number; have: number; covered: number; need: number };

export interface RepairCheck {
  ok: boolean;
  reason?: 'unknownObject' | 'objectLocked' | 'objectRestored' | 'notEnough' | 'noSpace';
  requirements: Requirement[];
  // Higher-level items the repair will take apart (spec 4.4, v0.6).
  splits: ItemRef[];
}

interface Held {
  item: ItemRef;
  cell: CellRef | null; // null: a leftover from a split, not placed yet
}

interface PaymentPlan {
  covered: number[]; // per item requirement, in cost order
  splits: ItemRef[];
  removed: CellRef[];
  leftovers: ItemRef[];
}

// Exact items are paid from the box first, then from the board starting at the end (spec 4.4).
function payOrder(state: GameState): Held[] {
  const held: Held[] = [];
  for (let i = state.box.length - 1; i >= 0; i--) {
    const item = state.box[i];
    if (item) held.push({ item, cell: { area: 'box', index: i } });
  }
  for (let i = state.board.length - 1; i >= 0; i--) {
    const item = state.board[i];
    if (item) held.push({ item, cell: { area: 'board', index: i } });
  }
  return held;
}

// Pays item requirements: exact level first, then by splitting the lowest higher-level item of
// the same chain. A split of level M for level L leaves one item of each level L..M-1 over.
function planPayment(state: GameState, items: ItemAmount[]): PaymentPlan {
  const pool = payOrder(state);
  const plan: PaymentPlan = { covered: items.map(() => 0), splits: [], removed: [], leftovers: [] };
  const take = (h: Held) => {
    pool.splice(pool.indexOf(h), 1);
    if (h.cell) plan.removed.push(h.cell);
  };
  // Higher requirements first, so lower ones can still use what is left over.
  const order = items.map((req, i) => ({ req, i })).sort((a, b) => b.req.level - a.req.level);
  for (const { req, i } of order) {
    while ((plan.covered[i] ?? 0) < req.count) {
      const exact = pool.find((h) => h.item.chain === req.chain && h.item.level === req.level);
      if (exact) {
        take(exact);
        plan.covered[i] = (plan.covered[i] ?? 0) + 1;
        continue;
      }
      const higher = pool
        .filter((h) => h.item.chain === req.chain && h.item.level > req.level)
        .sort((a, b) => a.item.level - b.item.level)[0];
      if (!higher) break;
      take(higher);
      if (higher.cell) plan.splits.push(higher.item);
      for (let level = req.level; level < higher.item.level; level++) {
        const leftover: Held = { item: { chain: req.chain, level: level as ItemRef['level'] }, cell: null };
        pool.push(leftover);
      }
      plan.covered[i] = (plan.covered[i] ?? 0) + 1;
    }
  }
  plan.leftovers = pool.filter((h) => h.cell === null).map((h) => h.item);
  return plan;
}

const freeCount = (state: GameState) => [...state.board, ...state.box].filter((c) => c === null).length;

export function checkRepair(state: GameState, content: Content, objectId: string): RepairCheck {
  const object = findObject(content, objectId);
  if (!object) return { ok: false, reason: 'unknownObject', requirements: [], splits: [] };
  if (!isObjectAvailable(state, object)) return { ok: false, reason: 'objectLocked', requirements: [], splits: [] };
  if (isObjectRestored(state, object)) return { ok: false, reason: 'objectRestored', requirements: [], splits: [] };

  const cost = object.steps[stepOf(state, objectId)]?.cost ?? {};
  const requirements: Requirement[] = [];
  for (const resource of RESOURCES) {
    const need = cost.resources?.[resource] ?? 0;
    if (need > 0) requirements.push({ kind: 'resource', resource, have: state.resources[resource], need });
  }
  const items = cost.items ?? [];
  const plan = planPayment(state, items);
  items.forEach((item, i) => {
    requirements.push({
      kind: 'item',
      chain: item.chain,
      level: item.level,
      have: countItems(state, item.chain, item.level),
      covered: plan.covered[i] ?? 0,
      need: item.count,
    });
  });
  const enough = requirements.every((r) => (r.kind === 'item' ? r.covered : r.have) >= r.need);
  if (!enough) return { ok: false, reason: 'notEnough', requirements, splits: plan.splits };
  // Leftovers go into the cells the payment frees and any free cells.
  if (plan.leftovers.length > freeCount(state) + plan.removed.length) {
    return { ok: false, reason: 'noSpace', requirements, splits: plan.splits };
  }
  return { ok: true, requirements, splits: plan.splits };
}

// Atomic: either the whole step is paid and applied, or the state is untouched.
export function repair(state: GameState, content: Content, objectId: string): ActionResult {
  const check = checkRepair(state, content, objectId);
  if (!check.ok) return reject(state, check.reason === 'noSpace' ? 'noSpace' : (check.reason ?? 'notEnough'));
  const object = findObject(content, objectId);
  const stepIndex = stepOf(state, objectId);
  const step = object?.steps[stepIndex];
  if (!object || !step) return reject(state, 'unknownObject');

  const next = cloneState(state);
  for (const resource of RESOURCES) next.resources[resource] -= step.cost.resources?.[resource] ?? 0;
  const plan = planPayment(state, step.cost.items ?? []);
  for (const cell of plan.removed) next[cell.area][cell.index] = null;
  // Leftovers fill free cells: the board first in ascending order, then the box.
  for (const item of plan.leftovers) {
    const area = next.board.includes(null) ? 'board' : 'box';
    next[area][next[area].indexOf(null)] = item;
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
