// Moving and merging items on the merge table (spec 4.3).
import { maxLevel, type Content } from './content';
import { CHAINS, cloneState, getCell, reject, sameItem, type ActionResult, type CellRef, type GameState, type ItemRef } from './state';

const sameCell = (a: CellRef, b: CellRef) => a.area === b.area && a.index === b.index;

// Double tap (spec 4.3, v0.8): an item on the board goes to the first free box cell, an item in the box
// to the first free board cell. Nothing happens when the other side is full.
export function stashItem(state: GameState, from: CellRef): ActionResult {
  const item = getCell(state, from);
  if (item === undefined) return reject(state, 'badCell');
  if (item === null) return reject(state, 'emptyCell');
  const area = from.area === 'board' ? 'box' : 'board';
  const index = state[area].findIndex((c) => c === null);
  if (index < 0) return reject(state, 'noSpace');
  const next = cloneState(state);
  next[area][index] = item;
  next[from.area][from.index] = null;
  return { state: next, events: [{ type: 'itemMoved', from, to: { area, index } }] };
}

// "Sort" (spec 4.3, v0.8): board items move to the start of the board, grouped by chain and from the
// highest level down, so equal items sit side by side; free board cells then take items from the box.
export function sortTable(state: GameState): ActionResult {
  const rank = (i: ItemRef) => CHAINS.indexOf(i.chain) * 10 - i.level;
  const board = state.board.filter((c): c is ItemRef => c !== null).sort((a, b) => rank(a) - rank(b));
  const box = state.box.filter((c): c is ItemRef => c !== null);
  const lifted = box.splice(0, state.board.length - board.length);
  const all = [...board, ...lifted].sort((a, b) => rank(a) - rank(b));
  const next = cloneState(state);
  next.board = state.board.map((_c, i) => all[i] ?? null);
  next.box = state.box.map((_c, i) => box[i] ?? null);
  return { state: next, events: [{ type: 'tableSorted' }] };
}

export function moveItem(state: GameState, content: Content, from: CellRef, to: CellRef): ActionResult {
  const a = getCell(state, from);
  const b = getCell(state, to);
  if (a === undefined || b === undefined) return reject(state, 'badCell');
  if (a === null) return reject(state, 'emptyCell');
  if (sameCell(from, to)) return { state, events: [] };

  const next = cloneState(state);
  if (b === null) {
    next[to.area][to.index] = a;
    next[from.area][from.index] = null;
    return { state: next, events: [{ type: 'itemMoved', from, to }] };
  }
  // Merging happens only on the board, and never past the chain's top level.
  if (to.area === 'board' && sameItem(a, b) && b.level < maxLevel(content, b.chain)) {
    const level = (b.level + 1) as ItemRef['level'];
    next[to.area][to.index] = { chain: b.chain, level };
    next[from.area][from.index] = null;
    return { state: next, events: [{ type: 'itemsMerged', from, to, level }] };
  }
  next[to.area][to.index] = a;
  next[from.area][from.index] = b;
  return { state: next, events: [{ type: 'itemsSwapped', a: from, b: to }] };
}
