// Rewards for watching an ad (spec 8.4). They are extras: the balance never counts on them.
import { cloneState, freeCells, reject, type ActionResult, type GameState, type RewardKind } from './state';

export const REWARD_PARTS = 2;

// R2 is offered only while there is room for the washer.
export const canGrantWasher = (state: GameState) => freeCells(state).length > 0;

export function grantReward(state: GameState, kind: RewardKind): ActionResult {
  const next = cloneState(state);
  if (kind === 'parts') {
    next.resources.parts += REWARD_PARTS;
    return { state: next, events: [{ type: 'rewardGranted', kind }] };
  }
  // The washer goes to the first free cell: the board first, then the box.
  const cell = freeCells(state)[0];
  if (!cell) return reject(state, 'badCell');
  next[cell.area][cell.index] = { chain: 'fasteners', level: 1 };
  return { state: next, events: [{ type: 'rewardGranted', kind, cell }] };
}
