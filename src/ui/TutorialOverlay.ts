// Tutorial hint: a soft pulsing frame around the target and a bubble with the phrase and Skip (spec 4.6).
// The bubble sits in the screen's "ui.tutorial" rect from layout.json, away from what the player taps.
// It never blocks taps on the game underneath. The pulse is about once per second (spec 6.3).
import Phaser from 'phaser';
import { DEPTH, PALETTE } from '../config';
import type { TutorialStep } from '../core/tutorial';
import { t } from '../i18n';
import type { Rect } from '../layout';
import type { Store } from '../store';
import { Button } from './Button';
import { COLORS, textStyle } from './style';

const SKIP_W = 228;
const SKIP_H = 96;

export class TutorialOverlay {
  private layer: Phaser.GameObjects.Container;
  private pulse: Phaser.Tweens.Tween | null = null;
  private shownKey = '';

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly store: Store,
    private readonly bubble: Rect,
  ) {
    this.layer = scene.add.container(0, 0).setDepth(DEPTH.tutorial);
  }

  // Shows the step's phrase and frames the given targets; no targets hides the hint.
  show(step: TutorialStep | null, targets: Rect[]): void {
    const key = step ? `${step.id}:${targets.map((r) => `${r.x},${r.y}`).join('|')}` : '';
    if (key === this.shownKey) return;
    this.shownKey = key;
    this.pulse?.remove();
    this.pulse = null;
    this.layer.removeAll(true);
    if (!step || targets.length === 0) return;

    const frame = this.scene.add.graphics();
    frame.lineStyle(8, PALETTE.copper, 1);
    for (const r of targets) frame.strokeRoundedRect(r.x - 8, r.y - 8, r.w + 16, r.h + 16, 24);
    this.layer.add(frame);
    this.pulse = this.scene.tweens.add({ targets: frame, alpha: 0.35, duration: 500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    const { x, y, w, h } = this.bubble;
    const bg = this.scene.add.graphics();
    bg.fillStyle(PALETTE.metal, 1);
    bg.fillRoundedRect(x, y, w, h, 24);
    this.layer.add(bg);
    this.layer.add(
      this.scene.add
        .text(x + 28, y + h / 2, t(step.textKey), textStyle(34, COLORS.textLight, { wordWrap: { width: w - SKIP_W - 72 } }))
        .setOrigin(0, 0.5),
    );
    this.layer.add(
      new Button(this.scene, {
        x: x + w - SKIP_W - 20,
        y: y + (h - SKIP_H) / 2,
        w: SKIP_W,
        h: SKIP_H,
        label: t('tutorial.skip'),
        fill: PALETTE.dust,
        textColor: COLORS.text,
        fontSize: 32,
        onTap: () => this.store.skipTutorialStep(),
      }),
    );
  }
}
