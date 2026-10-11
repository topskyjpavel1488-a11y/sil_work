// Content definitions loaded from src/data/*.json (spec 3.3, 5).
import type { ChainId, Resource } from './state';

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
  nameKey: string;
  image: string;
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
  titleKey: string;
  textKey: string;
  image: string;
  sound?: string;
}

export interface Content {
  resources: { id: Resource; nameKey: string; image: string }[];
  chains: ChainDef[];
  objects: ObjectDef[];
  zones: ZoneDef[];
  debrisKinds: Record<string, DebrisKind>;
  finds: FindDef[];
  final: { titleKey: string; textKey: string; image: string };
}

export function maxLevel(content: Content, chain: ChainId): number {
  return content.chains.find((c) => c.id === chain)?.levels.length ?? 0;
}

export const findObject = (content: Content, id: string) => content.objects.find((o) => o.id === id);
export const findZone = (content: Content, id: string) => content.zones.find((z) => z.id === id);
