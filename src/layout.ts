// Positions and sizes in 720x1280 design coordinates, edited with `npm run layout` (spec 6.5).
import layoutJson from './data/layout.json';

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type Layout = Record<string, Record<string, Rect>>;

export const layout: Layout = layoutJson;

export function rect(section: string, name: string): Rect {
  const r = layout[section]?.[name];
  if (!r) throw new Error(`layout.json has no "${section}" → "${name}"`);
  return r;
}

// Depth order for things standing in a room: whatever reaches lower on the screen is closer to the viewer
// and is drawn later, so a table in front of a rack covers the rack, not the other way round.
export const byDepth = (a: Rect, b: Rect) => a.y + a.h - (b.y + b.h);

// Things that stand on top of other furniture (the lamp and the box on the workbench) are drawn after it.
export const ON_TOP = new Set(['object.lamp', 'object.fastener_box']);
export const depthKey = (name: string, r: Rect) => (ON_TOP.has(name) ? 1e6 : 0) + r.y + r.h;

export const center = (r: Rect) => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });
