// All balance numbers and timings live here (spec 3.3). [ГИПОТЕЗА] values are tunable.

export const DESIGN_WIDTH = 720;
export const DESIGN_HEIGHT = 1280;

export const PALETTE = {
  wood: 0x8b5e3c,
  cream: 0xf3e9d2,
  green: 0x7d9a78,
  copper: 0xb87333,
  metal: 0x3a3f44,
  dust: 0xc9c2b5,
} as const;

export const BUILD: 'test' | 'release' = import.meta.env.VITE_BUILD === 'release' ? 'release' : 'test';

export const config = {
  boardCols: 4,
  boardRows: 5,
  boxSize: 6,
  maxItemLevel: 4,
  saveDebounceMs: 1000,
  adCooldownSec: 180,
  mockAdDelayMs: 1000,
} as const;
