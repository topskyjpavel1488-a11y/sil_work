// Shared modal frame: a shade that blocks the screen and a centred cream panel.
import Phaser from 'phaser';
import { DESIGN_HEIGHT, DESIGN_WIDTH, FEEDBACK, PALETTE } from '../config';
import { onTap } from './tap';

export class Modal extends Phaser.GameObjects.Container {
  readonly px: number;
  readonly py: number;

  constructor(
    scene: Phaser.Scene,
    readonly pw: number,
    readonly ph: number,
    onShadeTap: (() => void) | null,
  ) {
    super(scene, 0, 0);
    this.px = (DESIGN_WIDTH - pw) / 2;
    this.py = (DESIGN_HEIGHT - ph) / 2;
    const shade = scene.add.rectangle(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT, 0x000000, 0.45).setOrigin(0).setInteractive();
    if (onShadeTap) onTap(shade, onShadeTap);
    const panel = scene.add.graphics();
    panel.fillStyle(PALETTE.cream, 1);
    panel.fillRoundedRect(this.px, this.py, pw, ph, 32);
    panel.lineStyle(6, PALETTE.wood, 1);
    panel.strokeRoundedRect(this.px, this.py, pw, ph, 32);
    // Taps on the panel itself must not reach the shade.
    const hit = scene.add.zone(this.px, this.py, pw, ph).setOrigin(0).setInteractive();
    this.add([shade, panel, hit]);
    this.setDepth(800).setAlpha(0).setScale(0.98);
    scene.add.existing(this);
    scene.tweens.add({ targets: this, alpha: 1, scale: 1, duration: FEEDBACK.transitionMs, ease: 'Sine.easeOut' });
  }

  close(after?: () => void): void {
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: FEEDBACK.transitionMs / 2,
      onComplete: () => {
        this.destroy();
        after?.();
      },
    });
  }
}
