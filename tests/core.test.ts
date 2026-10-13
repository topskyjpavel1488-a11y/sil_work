import { describe, expect, it } from 'vitest';
import { fixture as content } from './fixture';
import { moveItem, sortTable, stashItem } from '../src/core/merge';
import { currentGoal, isZoneCleared } from '../src/core/progress';
import { checkRepair, repair } from '../src/core/repair';
import { canGrantWasher, grantReward } from '../src/core/rewards';
import { takeDebris } from '../src/core/scavenge';
import { createInitialState, type GameState, type ItemRef } from '../src/core/state';

const item = (level: ItemRef['level']): ItemRef => ({ chain: 'fasteners', level });
const fresh = () => createInitialState(content);
const fill = (cells: (ItemRef | null)[]) => cells.fill(item(4));
const board = (index: number) => ({ area: 'board' as const, index });
const box = (index: number) => ({ area: 'box' as const, index });
const types = (events: { type: string }[]) => events.map((e) => e.type);

describe('scavenge', () => {
  it('adds resources and puts items into the first free board cells', () => {
    let s = fresh();
    s = takeDebris(s, content, 'door', 'door_1').state;
    expect(s.resources.wood).toBe(2);
    s.board[0] = item(3);
    const r = takeDebris(s, content, 'door', 'door_2');
    expect(r.state.board.slice(0, 3)).toEqual([item(3), item(1), item(1)]);
    expect(r.state.zones.door?.taken).toEqual(['door_1', 'door_2']);
  });

  it('spills into the box when the board is full', () => {
    const s = fresh();
    fill(s.board);
    const r = takeDebris(s, content, 'door', 'door_2');
    expect(r.state.box.slice(0, 2)).toEqual([item(1), item(1)]);
  });

  it('leaves the debris and changes nothing when items do not fit', () => {
    const s = fresh();
    fill(s.board);
    fill(s.box);
    s.box[5] = null;
    const r = takeDebris(s, content, 'door', 'door_2');
    expect(r.state).toBe(s);
    expect(types(r.events)).toEqual(['noSpace']);
  });

  it('takes resource-only debris even with a full table', () => {
    const s = fresh();
    fill(s.board);
    fill(s.box);
    expect(takeDebris(s, content, 'door', 'door_1').state.resources.wood).toBe(2);
  });

  it('rejects locked zones and repeated taking', () => {
    const s = fresh();
    expect(types(takeDebris(s, content, 'under_workbench', 'under_1').events)).toEqual(['rejected']);
    const once = takeDebris(s, content, 'door', 'door_1').state;
    expect(takeDebris(once, content, 'door', 'door_1').state).toBe(once);
  });

  it('reports a cleared zone after its last debris', () => {
    let s = fresh();
    const zone = content.zones[0]!;
    let last: string[] = [];
    for (const d of zone.debris) {
      const r = takeDebris(s, content, zone.id, d.id);
      s = r.state;
      last = types(r.events);
    }
    expect(last).toContain('zoneCleared');
    expect(isZoneCleared(s, zone)).toBe(true);
  });
});

describe('merge', () => {
  it('moves an item into an empty cell', () => {
    const s = fresh();
    s.board[0] = item(1);
    const r = moveItem(s, content, board(0), board(5));
    expect(r.state.board[0]).toBeNull();
    expect(r.state.board[5]).toEqual(item(1));
  });

  it('merges two equal items into the next level at the target', () => {
    const s = fresh();
    s.board[0] = item(2);
    s.board[1] = item(2);
    const r = moveItem(s, content, board(0), board(1));
    expect(r.state.board[0]).toBeNull();
    expect(r.state.board[1]).toEqual(item(3));
    expect(types(r.events)).toEqual(['itemsMerged']);
  });

  it('merges an item from the box onto the board', () => {
    const s = fresh();
    s.box[0] = item(1);
    s.board[3] = item(1);
    const r = moveItem(s, content, box(0), board(3));
    expect(r.state.board[3]).toEqual(item(2));
    expect(r.state.box[0]).toBeNull();
  });

  it('swaps different items', () => {
    const s = fresh();
    s.board[0] = item(1);
    s.board[1] = item(2);
    const r = moveItem(s, content, board(0), board(1));
    expect(r.state.board.slice(0, 2)).toEqual([item(2), item(1)]);
    expect(types(r.events)).toEqual(['itemsSwapped']);
  });

  it('swaps instead of merging at the top level', () => {
    const s = fresh();
    s.board[0] = item(4);
    s.board[1] = item(4);
    const r = moveItem(s, content, board(0), board(1));
    expect(r.state.board.slice(0, 2)).toEqual([item(4), item(4)]);
    expect(types(r.events)).toEqual(['itemsSwapped']);
  });

  it('never merges inside the box', () => {
    const s = fresh();
    s.box[0] = item(1);
    s.box[1] = item(1);
    const r = moveItem(s, content, box(0), box(1));
    expect(r.state.box.slice(0, 2)).toEqual([item(1), item(1)]);
    expect(types(r.events)).toEqual(['itemsSwapped']);
  });

  it('ignores empty sources, bad cells and dropping onto itself', () => {
    const s = fresh();
    s.board[0] = item(1);
    expect(moveItem(s, content, board(1), board(2)).state).toBe(s);
    expect(moveItem(s, content, board(0), board(99)).state).toBe(s);
    expect(moveItem(s, content, board(0), board(0)).state).toBe(s);
  });
});

describe('table conveniences', () => {
  it('double tap sends an item to the box and back to the first free board cell', () => {
    const s = fresh();
    s.board[3] = item(2);
    const down = stashItem(s, board(3)).state;
    expect(down.board[3]).toBeNull();
    expect(down.box[0]).toEqual(item(2));
    const up = stashItem(down, box(0)).state;
    expect(up.board[0]).toEqual(item(2));
    expect(up.box[0]).toBeNull();
  });

  it('does nothing when the other side is full or the cell is empty', () => {
    const s = fresh();
    fill(s.box);
    s.board[0] = item(1);
    expect(types(stashItem(s, board(0)).events)).toEqual(['rejected']);
    expect(types(stashItem(fresh(), board(0)).events)).toEqual(['rejected']);
  });

  it('sorts the board, keeps equal items together and lifts items from the box', () => {
    const s = fresh();
    s.board[4] = item(1);
    s.board[9] = item(3);
    s.board[12] = item(1);
    s.box[2] = item(2);
    const r = sortTable(s);
    expect(r.state.board.slice(0, 5)).toEqual([item(3), item(2), item(1), item(1), null]);
    expect(r.state.box.every((c) => c === null)).toBe(true);
    expect(types(r.events)).toEqual(['tableSorted']);
  });

  it('leaves the rest in the box when the board fills up', () => {
    const s = fresh();
    fill(s.board);
    s.board[0] = null;
    s.box[0] = item(1);
    s.box[1] = item(2);
    const r = sortTable(s);
    expect(r.state.board.filter(Boolean)).toHaveLength(s.board.length);
    expect(r.state.box.filter(Boolean)).toHaveLength(1);
  });
});

describe('repair', () => {
  const withWorkbenchDone = (steps: number): GameState => {
    const s = fresh();
    s.objects.workbench = { step: steps };
    return s;
  };

  it('does not change state when something is missing', () => {
    const s = fresh();
    s.resources.wood = 3;
    const r = repair(s, content, 'workbench');
    expect(r.state).toBe(s);
    expect(checkRepair(s, content, 'workbench').requirements).toEqual([{ kind: 'resource', resource: 'wood', have: 3, need: 4 }]);
  });

  it('pays the cost and advances one step', () => {
    const s = fresh();
    s.resources.wood = 5;
    const r = repair(s, content, 'workbench');
    expect(r.state.resources.wood).toBe(1);
    expect(r.state.objects.workbench).toEqual({ step: 1 });
    expect(types(r.events)).toEqual(['repaired']);
  });

  it('never takes lower-level items for a higher requirement', () => {
    const s = withWorkbenchDone(1);
    s.resources.wood = 3;
    s.board[0] = item(1);
    s.board[1] = item(1);
    expect(checkRepair(s, content, 'workbench').ok).toBe(false);
  });

  it('prefers the exact level and splits nothing then', () => {
    const s = withWorkbenchDone(1);
    s.resources.wood = 3;
    s.board[0] = item(3);
    s.box[2] = item(2);
    const check = checkRepair(s, content, 'workbench');
    expect(check.ok).toBe(true);
    expect(check.splits).toEqual([]);
    const r = repair(s, content, 'workbench');
    expect(r.state.board[0]).toEqual(item(3));
    expect(r.state.box[2]).toBeNull();
  });

  it('splits a higher item and leaves the rest on the table', () => {
    const s = withWorkbenchDone(1);
    s.resources.wood = 3;
    s.board[5] = item(3);
    const check = checkRepair(s, content, 'workbench');
    expect(check.ok).toBe(true);
    expect(check.splits).toEqual([item(3)]);
    expect(check.requirements.find((r) => r.kind === 'item')).toMatchObject({ have: 0, covered: 1, need: 1 });
    const r = repair(s, content, 'workbench');
    // 3 = 2 + 2: one goes to the repair, one stays, in the first free cell.
    expect(r.state.board.filter(Boolean)).toEqual([item(2)]);
    expect(r.state.board[0]).toEqual(item(2));
  });

  it('splits level 4 for level 2 into one 3 and one 2 left over', () => {
    const s = withWorkbenchDone(1);
    s.resources.wood = 3;
    s.board[0] = item(4);
    const r = repair(s, content, 'workbench');
    expect(r.state.board.filter(Boolean)).toEqual([item(2), item(3)]);
  });

  it('uses a split leftover for a second item of the same step', () => {
    const s = fresh();
    s.objects = { ...s.objects, workbench: { step: 3 }, lamp: { step: 2 }, window: { step: 2 }, cabinet: { step: 1 } };
    s.resources.metal = 3;
    s.board[0] = item(3);
    const r = repair(s, content, 'cabinet');
    expect(types(r.events)).toContain('repaired');
    expect(r.state.board.filter(Boolean)).toEqual([]);
  });

  it('waits for room when the leftovers have nowhere to go', () => {
    const s = withWorkbenchDone(1);
    s.resources.wood = 3;
    fill(s.board);
    fill(s.box);
    const check = checkRepair(s, content, 'workbench');
    // A 4 split for a 2 leaves a 3 and a 2: one freed cell is not enough.
    expect(check.reason).toBe('noSpace');
    expect(repair(s, content, 'workbench').state).toBe(s);
  });

  it('takes items from the box first, then from the end of the board', () => {
    const s = fresh();
    s.objects = { ...s.objects, workbench: { step: 3 }, lamp: { step: 2 }, window: { step: 2 }, cabinet: { step: 1 } };
    s.resources.metal = 3;
    s.board[0] = item(2);
    s.board[7] = item(2);
    s.board[12] = item(2);
    s.box[4] = item(2);
    const r = repair(s, content, 'cabinet');
    expect(r.state.box[4]).toBeNull();
    expect(r.state.board[12]).toBeNull();
    expect(r.state.board[7]).toEqual(item(2));
    expect(r.state.board[0]).toEqual(item(2));
  });

  it('opens the find once and never repeats a step', () => {
    const s = withWorkbenchDone(1);
    s.resources.wood = 3;
    s.board[0] = item(2);
    const r = repair(s, content, 'workbench');
    expect(r.state.finds).toEqual(['f_photo']);
    expect(types(r.events)).toEqual(['repaired', 'findOpened']);

    const done = withWorkbenchDone(3);
    done.resources.parts = 10;
    done.board[0] = item(3);
    expect(types(repair(done, content, 'workbench').events)).toEqual(['rejected']);
  });

  it('respects requires', () => {
    const s = fresh();
    s.resources.metal = 3;
    s.board[0] = item(2);
    expect(checkRepair(s, content, 'fastener_box').reason).toBe('objectLocked');
    s.objects.workbench = { step: 1 };
    expect(checkRepair(s, content, 'fastener_box').ok).toBe(true);
  });

  it('shows the first available unfinished step as the goal', () => {
    const s = fresh();
    expect(currentGoal(s, content)).toMatchObject({ object: { id: 'workbench' }, stepIndex: 0 });
    s.objects.workbench = { step: 3 };
    expect(currentGoal(s, content)).toMatchObject({ object: { id: 'fastener_box' }, stepIndex: 0 });
  });
});

describe('rewards', () => {
  it('adds two parts', () => {
    const r = grantReward(fresh(), 'parts');
    expect(r.state.resources.parts).toBe(2);
    expect(types(r.events)).toEqual(['rewardGranted']);
  });

  it('puts a washer into the first free cell', () => {
    const s = fresh();
    s.board[0] = item(2);
    expect(grantReward(s, 'washer').state.board[1]).toEqual(item(1));
    fill(s.board);
    expect(grantReward(s, 'washer').state.box[0]).toEqual(item(1));
  });

  it('is not offered and changes nothing when there is no room', () => {
    const s = fresh();
    fill(s.board);
    fill(s.box);
    expect(canGrantWasher(s)).toBe(false);
    expect(grantReward(s, 'washer').state).toBe(s);
  });
});

describe('rooms', () => {
  const restoreWorkshop = (s: GameState) => {
    for (const o of content.objects.filter((x) => x.room === 'workshop')) s.objects[o.id] = { step: o.steps.length };
  };

  it('keeps the second room closed until the first is restored', () => {
    const s = fresh();
    s.resources.wood = 5;
    s.board[0] = { chain: 'paints', level: 2 };
    expect(checkRepair(s, content, 'easel').reason).toBe('objectLocked');
    expect(types(takeDebris(s, content, 'buckets', 'buckets_1').events)).toEqual(['rejected']);
    restoreWorkshop(s);
    expect(checkRepair(s, content, 'easel').ok).toBe(true);
    expect(types(takeDebris(s, content, 'buckets', 'buckets_1').events)).toEqual(['debrisTaken', 'zoneCleared']);
  });

  it('reports a restored room and, after the last room, the end', () => {
    const s = fresh();
    s.objects = { ...s.objects, workbench: { step: 3 }, fastener_box: { step: 1 }, cabinet: { step: 1 } };
    s.resources.metal = 3;
    s.board[0] = item(2);
    s.board[1] = item(2);
    expect(types(repair(s, content, 'cabinet').events)).toEqual(['repaired', 'objectRestored', 'roomRestored']);

    const last = fresh();
    restoreWorkshop(last);
    last.resources.wood = 1;
    last.board[0] = { chain: 'paints', level: 2 };
    expect(types(repair(last, content, 'easel').events)).toEqual(['repaired', 'objectRestored', 'roomRestored', 'finished']);
  });

  it('starts in the first room', () => {
    expect(fresh().room).toBe('workshop');
  });
});
