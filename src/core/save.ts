// Save format logic (spec 7). Storage I/O lives outside core.
import { BOARD_SIZE, config } from '../config';
import { CHAINS, RESOURCES, type ChainId, type GameState, type ItemRef, type SaveData } from './state';

export const SAVE_VERSION = 2;

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const isCount = (v: unknown): v is number => typeof v === 'number' && Number.isInteger(v) && v >= 0;

function isItemOrNull(v: unknown): v is ItemRef | null {
  if (v === null) return true;
  return isObject(v) && CHAINS.includes(v.chain as ChainId) && [1, 2, 3, 4].includes(v.level as number);
}

const isCells = (v: unknown, length: number) => Array.isArray(v) && v.length === length && v.every(isItemOrNull);

export function isSaveData(v: unknown): v is SaveData {
  if (!isObject(v) || v.version !== SAVE_VERSION) return false;
  const { resources, objects, zones, tutorial, settings } = v;
  return (
    typeof v.room === 'string' &&
    Array.isArray(v.hints) &&
    v.hints.every((h) => typeof h === 'string') &&
    isObject(resources) &&
    RESOURCES.every((r) => isCount(resources[r])) &&
    isCells(v.board, BOARD_SIZE) &&
    isCells(v.box, config.boxSize) &&
    isObject(objects) &&
    Object.values(objects).every((o) => isObject(o) && isCount(o.step)) &&
    isObject(zones) &&
    Object.values(zones).every((z) => isObject(z) && Array.isArray(z.taken) && z.taken.every((t) => typeof t === 'string')) &&
    Array.isArray(v.finds) &&
    v.finds.every((f) => typeof f === 'string') &&
    isObject(tutorial) &&
    typeof tutorial.done === 'boolean' &&
    isCount(tutorial.step) &&
    isObject(settings) &&
    typeof settings.music === 'boolean' &&
    typeof settings.sfx === 'boolean' &&
    (settings.largeText === undefined || typeof settings.largeText === 'boolean') &&
    (v.giftDay === undefined || typeof v.giftDay === 'string') &&
    typeof v.savedAt === 'number'
  );
}

// Older saves are upgraded step by step. v1 → v2 (spec v0.7): one room, so the player is in the
// workshop and has seen no hints yet.
export function migrate(save: unknown): SaveData | null {
  let data = save;
  if (isObject(data) && data.version === 1) data = { ...data, version: 2, room: 'workshop', hints: [] };
  // A bigger table (v0.7: 5×5) gets empty cells at the end.
  if (isObject(data) && Array.isArray(data.board) && data.board.length < BOARD_SIZE) {
    data = { ...data, board: [...data.board, ...Array.from({ length: BOARD_SIZE - data.board.length }, () => null)] };
  }
  return isSaveData(data) ? data : null;
}

export function serializeSave(state: GameState, now: number): string {
  return JSON.stringify({ ...state, savedAt: now });
}

export type ParsedSave = { kind: 'empty' } | { kind: 'ok'; save: SaveData } | { kind: 'corrupted' };

export function parseSave(raw: string | null | undefined): ParsedSave {
  if (raw === null || raw === undefined || raw === '') return { kind: 'empty' };
  try {
    const save = migrate(JSON.parse(raw));
    return save ? { kind: 'ok', save } : { kind: 'corrupted' };
  } catch {
    return { kind: 'corrupted' };
  }
}

// On start both sources are read and the newer one wins (spec 7).
export function pickNewest(local: SaveData | null, cloud: SaveData | null): SaveData | null {
  if (!local) return cloud;
  if (!cloud) return local;
  return cloud.savedAt > local.savedAt ? cloud : local;
}
