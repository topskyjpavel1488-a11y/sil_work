// "Where to get it" (spec 6.2, v0.8): for each missing requirement of a repair, the best place to get it.
// Pure: reads state and content only.
import type { Content, ZoneDef } from './content';
import { isZoneCleared, isZoneUnlocked } from './progress';
import { checkRepair, type Requirement } from './repair';
import type { GameState } from './state';

export type Source =
  | { kind: 'zone'; zone: ZoneDef } // an open, not yet cleared zone still holds it
  | { kind: 'merge' } // enough lower-level items of the chain are on the table or in the box
  | { kind: 'none' }; // nothing open holds it now (a later zone will)

export interface MissingSource {
  req: Requirement;
  source: Source;
}

const units = (level: number) => 2 ** (level - 1);

// How much of the requirement a zone's remaining debris still drops (resources, or chain items in level-1 units).
function zoneSupply(state: GameState, zone: ZoneDef, req: Requirement): number {
  const taken = state.zones[zone.id]?.taken ?? [];
  let sum = 0;
  for (const d of zone.debris) {
    if (taken.includes(d.id)) continue;
    if (req.kind === 'resource') sum += d.drop.resources?.[req.resource] ?? 0;
    else for (const i of d.drop.items ?? []) if (i.chain === req.chain) sum += i.count * units(i.level);
  }
  return sum;
}

export function sourceFor(state: GameState, content: Content, req: Requirement, preferRoom: string): Source {
  if (req.kind === 'item') {
    // Items of a lower level that could be merged up count before scavenging more.
    const lack = (req.need - req.covered) * units(req.level);
    const below = [...state.board, ...state.box].reduce((n, i) => (i && i.chain === req.chain && i.level < req.level ? n + units(i.level) : n), 0);
    if (below >= lack) return { kind: 'merge' };
  }
  const zones = content.zones
    .filter((z) => isZoneUnlocked(state, content, z) && !isZoneCleared(state, z))
    .map((zone) => ({ zone, supply: zoneSupply(state, zone, req) }))
    .filter((z) => z.supply > 0)
    // The current room first, then the zone that still holds the most.
    .sort((a, b) => Number(b.zone.room === preferRoom) - Number(a.zone.room === preferRoom) || b.supply - a.supply);
  const best = zones[0];
  return best ? { kind: 'zone', zone: best.zone } : { kind: 'none' };
}

// Unmet requirements of the object's next step with their sources, in cost order.
export function missingSources(state: GameState, content: Content, objectId: string, preferRoom: string): MissingSource[] {
  const check = checkRepair(state, content, objectId);
  if (check.reason !== 'notEnough') return [];
  return check.requirements
    .filter((r) => (r.kind === 'item' ? r.covered : r.have) < r.need)
    .map((req) => ({ req, source: sourceFor(state, content, req, preferRoom) }));
}
