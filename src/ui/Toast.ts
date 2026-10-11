// Short hint at the bottom of the screen that fades out on its own.
import Phaser from 'phaser';
import { DESIGN_HEIGHT, DESIGN_WIDTH, FEEDBACK, PALETTE } from '../config';
import { COLORS, textStyle } from './style';

let current: Phaser.GameObjects.Container | null = null;

export function showToast(scene: Phaser.Scene, message: string): void {
  current?.destroy();
  const text = scene.add.text(0, 0, message, textStyle(34, COLORS.textLight, { align: 'center', wordWrap: { width: DESIGN_WIDTH - 120 } })).setOrigin(0.5);
  const w = Math.min(DESIGN_WIDTH - 64, text.width + 64);
  const h = text.height + 40;
  const bg = scene.add.graphics();
  bg.fillStyle(PALETTE.metal, 0.92);
  bg.fillRoundedRect(-w / 2, -h / 2, w, h, 24);
  const toast = scene.add.container(DESIGN_WIDTH / 2, DESIGN_HEIGHT - 260, [bg, text]).setDepth(1000).setAlpha(0);
  current = toast;
  scene.tweens.add({ targets: toast, alpha: 1, duration: FEEDBACK.tapMs });
  scene.time.delayedCall(FEEDBACK.toastMs, () => {
    scene.tweens.add({
      targets: toast,
      alpha: 0,
      duration: FEEDBACK.transitionMs,
      onComplete: () => {
        toast.destroy();
        if (current === toast) current = null;
      },
    });
  });
}
