// Shared text styles; nothing smaller than 32 design px (spec 6.1).
import type Phaser from 'phaser';

export const FONT = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

export const COLORS = {
  text: '#3A3F44',
  textLight: '#F3E9D2',
  ok: '#5E7D59',
  missing: '#A0522D',
} as const;

export function textStyle(size: number, color: string = COLORS.text, extra: Phaser.Types.GameObjects.Text.TextStyle = {}) {
  return { fontFamily: FONT, fontSize: `${Math.max(32, size)}px`, color, ...extra };
}
