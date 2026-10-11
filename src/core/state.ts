// Game state model (spec 4.1). Pure data and helpers, no Phaser/DOM/SDK.
import { BOARD_SIZE, config } from '../config';
import type { Content } from './content';

export type Resource = 'wood' | 'metal' | 'parts';
export const RESOURCES: readonly Resource[] = ['wood', 'metal', 'parts'];

export type ChainId = 'fasteners';

export interface ItemRef {
  chain: ChainId;
  level: 1 | 2 | 3 | 4;
}

export interface GameState {
  version: 1;
  resources: Record<Resource, number>;
  board: (ItemRef | null)[];
  box: (ItemRef | null)[];
  objects: Record<string, { step: number }>;
  zones: Record<string, { taken: string[] }>;
  finds: string[];
  tutorial: { done: boolean; step: number };
  settings: { music: boolean; sfx: boolean };
  savedAt: number;
}

export type SaveData = GameState;

export type CellArea = 'board' | 'box';

// Rewards for watching an ad (spec 8.4).
export type RewardKind = 'parts' | 'washer';

export interface CellRef {
  area: CellArea;
  index: number;
}

// Events let scenes play animations and sounds without re-deriving what happened.
export type GameEvent =
  | { type: 'debrisTaken'; zoneId: string; debrisId: string; resources: Partial<Record<Resource, number>>; placed: CellRef[] }
  | { type: 'noSpace'; zoneId: string; debrisId: string }
  | { type: 'zoneCleared'; zoneId: string }
  | { type: 'itemMoved'; from: CellRef; to: CellRef }
  | { type: 'itemsSwapped'; a: CellRef; b: CellRef }
  | { type: 'itemsMerged'; from: CellRef; to: CellRef; level: number }
  | { type: 'repaired'; objectId: string; step: number }
  | { type: 'objectRestored'; objectId: string }
  | { type: 'findOpened'; findId: string }
  | { type: 'finished' }
  | { type: 'tutorial' }
  | { type: 'settings' }
  | { type: 'reset' }
  | { type: 'rewardGranted'; kind: RewardKind; cell?: CellRef }
  | { type: 'rejected'; reason: RejectReason };

export type RejectReason =
  | 'unknownZone'
  | 'zoneLocked'
  | 'unknownDebris'
  | 'debrisTaken'
  | 'emptyCell'
  | 'badCell'
  | 'unknownObject'
  | 'objectLocked'
  | 'objectRestored'
  | 'notEnough'
  | 'noSpace';

export interface ActionResult {
  state: GameState;
  events: GameEvent[];
}

export const reject = (state: GameState, reason: RejectReason): ActionResult => ({
  state,
  events: [{ type: 'rejected', reason }],
});

export function createInitialState(content: Content): GameState {
  return {
    version: 1,
    resources: { wood: 0, metal: 0, parts: 0 },
    board: Array.from({ length: BOARD_SIZE }, () => null),
    box: Array.from({ length: config.boxSize }, () => null),
    objects: Object.fromEntries(content.objects.map((o) => [o.id, { step: 0 }])),
    zones: Object.fromEntries(content.zones.map((z) => [z.id, { taken: [] }])),
    finds: [],
    tutorial: { done: false, step: 0 },
    settings: { music: true, sfx: true },
    savedAt: 0,
  };
}

export function cloneState(state: GameState): GameState {
  return structuredClone(state);
}

export const getCell = (state: GameState, ref: CellRef): ItemRef | null | undefined => state[ref.area][ref.index];

export const sameItem = (a: ItemRef, b: ItemRef) => a.chain === b.chain && a.level === b.level;

export function countItems(state: GameState, chain: ChainId, level: number): number {
  return [...state.board, ...state.box].filter((i) => i?.chain === chain && i.level === level).length;
}

export function freeCells(state: GameState): CellRef[] {
  const cells: CellRef[] = [];
  state.board.forEach((item, index) => item === null && cells.push({ area: 'board', index }));
  state.box.forEach((item, index) => item === null && cells.push({ area: 'box', index }));
  return cells;
}

export const stepOf = (state: GameState, objectId: string) => state.objects[objectId]?.step ?? 0;
