// A chain item drawn by its manifest key with the level number on top (spec 3.5).
import type Phaser from 'phaser';
import { addAsset } from '../assets';
import type { Content } from '../core/content';
import type { Rect } from '../layout';
import { COLORS, textStyle } from './style';

export function addItemView(scene: Phaser.Scene, content: Content, chain: string, level: number, r: Rect): Phaser.GameObjects.Container {
  const image = content.chains.find((c) => c.id === chain)?.levels[level - 1]?.image ?? '';
  const box = addAsset(scene, image, r);
  const size = Math.max(32, Math.round(Math.min(r.w, r.h) * 0.45));
  box.add(scene.add.text(0, 0, String(level), textStyle(size, COLORS.textLight, { fontStyle: 'bold', stroke: COLORS.text, strokeThickness: 6 })).setOrigin(0.5));
  return box;
}
