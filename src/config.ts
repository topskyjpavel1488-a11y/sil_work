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

// Optional chaining keeps this module importable from Node tools, where import.meta.env is absent.
export const BUILD: 'test' | 'release' = import.meta.env?.VITE_BUILD === 'release' ? 'release' : 'test';

export const config = {
  boardCols: 4,
  boardRows: 5,
  boxSize: 6,
  saveDebounceMs: 1000,
  adCooldownSec: 180,
  mockAdDelayMs: 1000,
  findTextMaxChars: 220,
  // Content invariants checked by `npm run validate` (spec 5.5).
  balanceMargin: 1.25,
  zoneCount: { min: 5, max: 7 },
  zoneDebris: { min: 8, max: 10 },
  debrisDropUnits: { min: 1, max: 3 },
  firstZone: { minWood: 4, minLevel1Items: 2 },
  simMaxBoardCells: 18,
  simMaxBoxCells: 3,
} as const;

export const BOARD_SIZE = config.boardCols * config.boardRows;
