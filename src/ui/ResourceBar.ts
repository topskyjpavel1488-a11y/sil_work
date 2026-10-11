// Resource counters with an icon each; counters pop when they change (spec 6.2, 6.3).
import Phaser from 'phaser';
import { addAsset } from '../assets';
import { FEEDBACK } from '../config';
import type { Content } from '../core/content';
import { RESOURCES, type GameState, type Resource } from '../core/state';
import type { Rect } from '../layout';
import { COLORS, textStyle } from './style';

export class ResourceBar {
  private texts = new Map<Resource, Phaser.GameObjects.Text>();
  private values = new Map<Resource, number>();

  constructor(
    private readonly scene: Phaser.Scene,
    content: Content,
    r: Rect,
  ) {
    const slot = r.w / RESOURCES.length;
    RESOURCES.forEach((res, i) => {
      const def = content.resources.find((x) => x.id === res);
      const x = r.x + i * slot;
      addAsset(scene, def?.image ?? '', { x: x + 8, y: r.y + (r.h - 64) / 2, w: 64, h: 64 });
      this.texts.set(res, scene.add.text(x + 88, r.y + r.h / 2, '0', textStyle(40, COLORS.text, { fontStyle: 'bold' })).setOrigin(0, 0.5));
    });
  }

  // Where a resource's counter sits, so gains can fly towards it.
  anchor(res: Resource): { x: number; y: number } {
    const text = this.texts.get(res);
    return text ? { x: text.x, y: text.y } : { x: 0, y: 0 };
  }

  update(state: GameState): void {
    for (const res of RESOURCES) {
      const text = this.texts.get(res);
      const value = state.resources[res];
      if (!text) continue;
      const previous = this.values.get(res);
      text.setText(String(value));
      if (previous !== undefined && value > previous) {
        this.scene.tweens.add({ targets: text, scale: 1.25, duration: FEEDBACK.tapMs, yoyo: true });
      }
      this.values.set(res, value);
    }
  }
}
