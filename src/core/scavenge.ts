// Clearing debris in zones (spec 4.2).
import { findZone, type Content } from './content';
import { isZoneCleared, isZoneUnlocked } from './progress';
import {
  cloneState,
  freeCells,
  reject,
  RESOURCES,
  type ActionResult,
  type CellRef,
  type GameEvent,
  type GameState,
  type ItemRef,
} from './state';

export function takeDebris(state: GameState, content: Content, zoneId: string, debrisId: string): ActionResult {
  const zone = findZone(content, zoneId);
  if (!zone) return reject(state, 'unknownZone');
  if (!isZoneUnlocked(state, content, zone)) return reject(state, 'zoneLocked');
  const debris = zone.debris.find((d) => d.id === debrisId);
  if (!debris) return reject(state, 'unknownDebris');
  if (state.zones[zoneId]?.taken.includes(debrisId)) return reject(state, 'debrisTaken');

  const items: ItemRef[] = (debris.drop.items ?? []).flatMap((a) =>
    Array.from({ length: a.count }, () => ({ chain: a.chain, level: a.level as ItemRef['level'] })),
  );
  // Free cells come board-first in ascending index, then the box (spec 4.2).
  const cells = freeCells(state);
  if (cells.length < items.length) {
    return { state, events: [{ type: 'noSpace', zoneId, debrisId }] };
  }

  const next = cloneState(state);
  const placed = cells.slice(0, items.length);
  placed.forEach((cell: CellRef, i) => {
    next[cell.area][cell.index] = items[i] ?? null;
  });
  const resources = debris.drop.resources ?? {};
  for (const r of RESOURCES) next.resources[r] += resources[r] ?? 0;
  next.zones[zoneId] = { taken: [...(next.zones[zoneId]?.taken ?? []), debrisId] };

  const events: GameEvent[] = [{ type: 'debrisTaken', zoneId, debrisId, resources, placed }];
  if (isZoneCleared(next, zone)) events.push({ type: 'zoneCleared', zoneId });
  return { state: next, events };
}
