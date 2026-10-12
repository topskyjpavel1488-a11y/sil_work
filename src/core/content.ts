// Content definitions loaded from src/data/*.json (spec 3.3, 5).
import type { ChainId, Resource } from './state';
import type { TutorialStep } from './tutorial';

export interface Condition {
  object: string;
  step: number;
}

export interface ItemAmount {
  chain: ChainId;
  level: number;
  count: number;
}

export interface Bundle {
  resources?: Partial<Record<Resource, number>>;
  items?: ItemAmount[];
}

export type StepEffect = 'warmLight';

export interface RepairStep {
  cost: Bundle;
  find?: string;
  effect?: StepEffect;
}

export interface ObjectDef {
  id: string;
  room: string;
  nameKey: string;
  requires?: Condition;
  steps: RepairStep[];
  // One image per state: index = completed steps (0 = abandoned, last = restored).
  stateImages: string[];
}

export interface DebrisDef {
  id: string;
  kind: string;
  drop: Bundle;
}

export interface ZoneDef {
  id: string;
  room: string;
  nameKey: string;
  // The pile on the main screen and the backdrop of the zone's own scene.
  image: string;
  sceneImage: string;
  unlock?: Condition;
  debris: DebrisDef[];
}

export interface DebrisKind {
  nameKey: string;
  image: string;
  sound: string;
}

export interface ChainLevel {
  nameKey: string;
  image: string;
}

export interface ChainDef {
  id: ChainId;
  levels: ChainLevel[];
}

export interface FindDef {
  id: string;
  room: string;
  titleKey: string;
  textKey: string;
  image: string;
  sound?: string;
}

export interface CardDef {
  titleKey: string;
  textKey: string;
  image: string;
}

// A room of the workshop (spec v0.7). A room opens once every object of `unlockAfter` is restored.
export interface RoomDef {
  id: string;
  nameKey: string;
  image: string;
  layout: string; // section of layout.json with this room's main screen
  unlockAfter?: string;
  final: CardDef; // shown when every object of the room is restored
  finalNoteKey: string;
  intro?: CardDef; // shown once on the first visit
}

export interface Content {
  rooms: RoomDef[];
  resources: { id: Resource; nameKey: string; image: string }[];
  chains: ChainDef[];
  objects: ObjectDef[];
  zones: ZoneDef[];
  debrisKinds: Record<string, DebrisKind>;
  finds: FindDef[];
  tutorial: TutorialStep[];
}

export function maxLevel(content: Content, chain: ChainId): number {
  return content.chains.find((c) => c.id === chain)?.levels.length ?? 0;
}

export const findObject = (content: Content, id: string) => content.objects.find((o) => o.id === id);
export const findZone = (content: Content, id: string) => content.zones.find((z) => z.id === id);
export const findRoom = (content: Content, id: string) => content.rooms.find((r) => r.id === id);
export const objectsIn = (content: Content, room: string) => content.objects.filter((o) => o.room === room);
export const zonesIn = (content: Content, room: string) => content.zones.filter((z) => z.room === room);
export const findsIn = (content: Content, room: string) => content.finds.filter((f) => f.room === room);
