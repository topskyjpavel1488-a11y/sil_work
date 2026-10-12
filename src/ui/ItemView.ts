// A chain item drawn by its manifest key with the level number in the lower right corner (spec 3.5).
// The corner keeps the number off the middle of the art (the artist brief asks to leave it free).
import type Phaser from 'phaser';
import { addAsset } from '../assets';
import type { Content } from '../core/content';
import type { Rect } from '../layout';
import { COLORS, textStyle } from './style';

export function addItemView(scene: Phaser.Scene, content: Content, chain: string, level: number, r: Rect): Phaser.GameObjects.Container {
  const image = content.chains.find((c) => c.id === chain)?.levels[level - 1]?.image ?? '';
  const box = addAsset(scene, image, r);
  const size = Math.max(32, Math.round(Math.min(r.w, r.h) * 0.32));
  const inset = Math.round(Math.min(r.w, r.h) * 0.06);
  box.add(
    scene.add
      .text(r.w / 2 - inset, r.h / 2 - inset, String(level), textStyle(size, COLORS.textLight, { fontStyle: 'bold', stroke: COLORS.text, strokeThickness: 6 }))
      .setOrigin(1, 1),
  );
  return box;
}
