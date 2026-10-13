// Repair marker on an object (spec 6.2): a round hammer badge in the corner and a row of step pips.
// It shows while the object still has steps to do and disappears once the object is restored.
// When the next step can be paid right now, the badge turns green and gently pulses.
import Phaser from 'phaser';
import { PALETTE } from '../config';
import type { Rect } from '../layout';

const RADIUS = 26;
const PIP = 7;
const PIP_GAP = 22;

export type BadgeState = { kind: 'hidden' } | { kind: 'todo'; done: number; total: number; ready: boolean };

export class RepairBadge {
  private readonly badge: Phaser.GameObjects.Container;
  private readonly circle: Phaser.GameObjects.Graphics;
  private readonly pips: Phaser.GameObjects.Graphics;
  private pulse: Phaser.Tweens.Tween | null = null;
  private last = '';

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly r: Rect,
  ) {
    const x = r.x + r.w - RADIUS - 4;
    const y = r.y + RADIUS + 4;
    this.circle = scene.add.graphics();
    const icon = scene.add.graphics();
    // A small hammer: handle and head, tilted.
    icon.fillStyle(0xffffff, 1);
    icon.fillRoundedRect(-3, -6, 6, 22, 3);
    icon.fillRoundedRect(-11, -14, 22, 10, 3);
    icon.setRotation(-0.7);
    this.badge = scene.add.container(x, y, [this.circle, icon]).setVisible(false);
    this.pips = scene.add.graphics().setVisible(false);
  }

  set(state: BadgeState): void {
    const key = state.kind === 'hidden' ? 'hidden' : `${state.done}/${state.total}/${state.ready}`;
    if (key === this.last) return;
    this.last = key;
    this.pulse?.stop();
    this.pulse = null;
    this.badge.setScale(1);
    if (state.kind === 'hidden') {
      this.badge.setVisible(false);
      this.pips.setVisible(false);
      return;
    }
    const fill = state.ready ? PALETTE.green : PALETTE.copper;
    this.circle.clear();
    this.circle.fillStyle(PALETTE.metal, 0.35);
    this.circle.fillCircle(2, 3, RADIUS);
    this.circle.fillStyle(fill, 1);
    this.circle.fillCircle(0, 0, RADIUS);
    this.circle.lineStyle(3, PALETTE.cream, 1);
    this.circle.strokeCircle(0, 0, RADIUS);
    this.badge.setVisible(true);
    if (state.ready) {
      this.pulse = this.scene.tweens.add({ targets: this.badge, scale: 1.15, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }
    this.drawPips(state.done, state.total);
  }

  // One pip per repair step: filled for done, hollow for still to do, on a dark pill for contrast.
  private drawPips(done: number, total: number): void {
    const g = this.pips.clear().setVisible(true);
    const width = (total - 1) * PIP_GAP + PIP * 2 + 16;
    const cx = this.r.x + this.r.w / 2;
    const cy = this.r.y + this.r.h - PIP - 10;
    g.fillStyle(PALETTE.metal, 0.6);
    g.fillRoundedRect(cx - width / 2, cy - PIP - 6, width, PIP * 2 + 12, PIP + 6);
    for (let i = 0; i < total; i++) {
      const px = cx - ((total - 1) * PIP_GAP) / 2 + i * PIP_GAP;
      if (i < done) {
        g.fillStyle(PALETTE.copper, 1);
        g.fillCircle(px, cy, PIP);
      }
      g.lineStyle(2, PALETTE.cream, 1);
      g.strokeCircle(px, cy, PIP);
    }
  }
}
