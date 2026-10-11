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

export const center = (r: Rect) => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });
