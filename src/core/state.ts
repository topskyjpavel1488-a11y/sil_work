// Game state model (spec 4.1). Pure data, no Phaser/DOM/SDK.

export type Resource = 'wood' | 'metal' | 'parts';

export interface ItemRef {
  chain: 'fasteners';
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
