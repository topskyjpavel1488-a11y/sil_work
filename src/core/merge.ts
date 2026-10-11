// Moving and merging items on the merge table (spec 4.3).
import { maxLevel, type Content } from './content';
import { cloneState, getCell, reject, sameItem, type ActionResult, type CellRef, type GameState, type ItemRef } from './state';

const sameCell = (a: CellRef, b: CellRef) => a.area === b.area && a.index === b.index;

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
