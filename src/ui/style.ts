// Shared text styles; nothing smaller than 32 design px (spec 6.1). "Large text" in settings scales them all (spec v0.8).
import type Phaser from 'phaser';

export const FONT = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

export const COLORS = {
  text: '#3A3F44',
  textLight: '#F3E9D2',
  ok: '#5E7D59',
  missing: '#A0522D',
} as const;

let textScale = 1;
let textResolution = 1;

// Dev screenshot mode renders the game larger; texts get a matching resolution to stay sharp.
export function setTextResolution(resolution: number): void {
  textResolution = resolution;
}

// Applies to texts created afterwards; the scene is restarted to redraw with it.
export function setTextScale(scale: number): void {
  textScale = scale;
}

export function textStyle(size: number, color: string = COLORS.text, extra: Phaser.Types.GameObjects.Text.TextStyle = {}) {
  return { fontFamily: FONT, fontSize: `${Math.round(Math.max(32, size) * textScale)}px`, color, ...(textResolution !== 1 ? { resolution: textResolution } : {}), ...extra };
}
