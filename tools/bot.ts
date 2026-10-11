// Bot that plays the whole game through core/ (spec 5.5): clear everything available,
// merge sensibly, repair in goal order. Used by `validate`, `simulate` and tests.
import type { Bundle, Content } from '../src/core/content';
import { maxLevel } from '../src/core/content';
import { moveItem } from '../src/core/merge';
import { currentGoal, isFinished, isZoneUnlocked } from '../src/core/progress';
import { repair } from '../src/core/repair';
import { takeDebris } from '../src/core/scavenge';
import { countItems, createInitialState, type CellRef, type ChainId, type GameState } from '../src/core/state';

export interface GoalStep {
  objectId: string;
  step: number;
  cost: Bundle;
  openZones: string[];
}

// Repair steps in the order the goal banner presents them, with the zones open before each step.
export function goalSequence(content: Content): GoalStep[] {
  const state = createInitialState(content);
  const steps: GoalStep[] = [];
  for (let goal = currentGoal(state, content); goal; goal = currentGoal(state, content)) {
    const cost = goal.object.steps[goal.stepIndex]?.cost ?? {};
    const openZones = content.zones.filter((z) => isZoneUnlocked(state, z)).map((z) => z.id);
    steps.push({ objectId: goal.object.id, step: goal.stepIndex + 1, cost, openZones });
    state.objects[goal.object.id] = { step: goal.stepIndex + 1 };
  }
  return steps;
}

export interface BotResult {
  finished: boolean;
  stuckAt?: string;
  maxBoard: number;
  maxBox: number;
  actions: number;
  log: string[];
  state: GameState;
}

const used = (cells: unknown[]) => cells.filter((c) => c !== null).length;

export function runBot(content: Content): BotResult {
  let s = createInitialState(content);
  let maxBoard = 0;
  let maxBox = 0;
  let actions = 0;
  const log: string[] = [];

  const record = () => {
    maxBoard = Math.max(maxBoard, used(s.board));
    maxBox = Math.max(maxBox, used(s.box));
  };
  const move = (from: CellRef, to: CellRef) => {
    const r = moveItem(s, content, from, to);
    s = r.state;
    actions++;
    return r.events.some((e) => e.type === 'itemsMerged' || e.type === 'itemMoved');
  };
  const cellsWith = (chain: ChainId, level: number): CellRef[] => {
    const cells: CellRef[] = [];
    s.board.forEach((i, index) => i?.chain === chain && i.level === level && cells.push({ area: 'board', index }));
    s.box.forEach((i, index) => i?.chain === chain && i.level === level && cells.push({ area: 'box', index }));
    return cells;
  };
  const freeBoard = () => s.board.findIndex((c) => c === null);

  // Move everything from the box onto free board cells.
  const tidy = () => {
    s.box.forEach((item, index) => {
      const free = freeBoard();
      if (item && free >= 0) move({ area: 'box', index }, { area: 'board', index: free });
    });
  };

  const mergePair = (chain: ChainId, level: number): boolean => {
    const cells = cellsWith(chain, level);
    if (cells.length < 2) return false;
    let target = cells.find((c) => c.area === 'board');
    if (!target) {
      const free = freeBoard();
      if (free < 0) return false;
      move(cells[0] as CellRef, { area: 'board', index: free });
      target = { area: 'board', index: free };
      cells[0] = target;
    }
    const source = cells.find((c) => c !== target) as CellRef;
    return move(source, target);
  };

  // Items still needed by unfinished repair steps, per chain and level.
  const remainingDemand = (chain: ChainId, level: number) =>
    content.objects.reduce(
      (sum, o) =>
        sum +
        o.steps
          .slice(s.objects[o.id]?.step ?? 0)
          .reduce((n, st) => n + (st.cost.items ?? []).filter((i) => i.chain === chain && i.level === level).reduce((k, i) => k + i.count, 0), 0),
      0,
    );

  // Merge pairs that are surplus to the remaining demand at their level.
  const mergeSurplus = () => {
    for (const chain of content.chains) {
      for (let level = 1; level < maxLevel(content, chain.id); level++) {
        while (countItems(s, chain.id, level) - remainingDemand(chain.id, level) >= 2) {
          if (!mergePair(chain.id, level)) break;
        }
      }
    }
  };

  const produce = (chain: ChainId, level: number): boolean => {
    if (level <= 1) return false;
    while (countItems(s, chain, level - 1) < 2) {
      if (!produce(chain, level - 1)) return false;
    }
    return mergePair(chain, level - 1);
  };

  for (let round = 0; round < 1000; round++) {
    let progress = false;

    for (const zone of content.zones) {
      if (!isZoneUnlocked(s, zone)) continue;
      for (const debris of zone.debris) {
        if (s.zones[zone.id]?.taken.includes(debris.id)) continue;
        tidy();
        mergeSurplus();
        const r = takeDebris(s, content, zone.id, debris.id);
        actions++;
        if (r.events.some((e) => e.type === 'debrisTaken')) {
          s = r.state;
          progress = true;
          record();
        }
      }
    }
    tidy();
    mergeSurplus();
    record();

    for (let goal = currentGoal(s, content); goal; goal = currentGoal(s, content)) {
      for (const item of goal.object.steps[goal.stepIndex]?.cost.items ?? []) {
        while (countItems(s, item.chain, item.level) < item.count && produce(item.chain, item.level));
      }
      const r = repair(s, content, goal.object.id);
      actions++;
      if (!r.events.some((e) => e.type === 'repaired')) break;
      s = r.state;
      progress = true;
      const finds = r.events.flatMap((e) => (e.type === 'findOpened' ? [` find:${e.findId}`] : []));
      log.push(
        `${goal.object.id} ${goal.stepIndex + 1}/${goal.object.steps.length}` +
          ` | W${s.resources.wood} M${s.resources.metal} P${s.resources.parts}` +
          ` | board ${used(s.board)}/${s.board.length} box ${used(s.box)}/${s.box.length}${finds.join('')}`,
      );
      tidy();
      mergeSurplus();
      record();
    }

    if (isFinished(s, content)) return { finished: true, maxBoard, maxBox, actions, log, state: s };
    if (!progress) {
      const goal = currentGoal(s, content);
      const stuckAt = goal ? `${goal.object.id} step ${goal.stepIndex + 1}` : 'no goal';
      return { finished: false, stuckAt, maxBoard, maxBox, actions, log, state: s };
    }
  }
  return { finished: false, stuckAt: 'round limit', maxBoard, maxBox, actions, log, state: s };
}
