// Screen change with a short fade, under 500 ms in total (spec 6.3).
import type Phaser from 'phaser';
import { FEEDBACK } from '../config';

export function goTo(scene: Phaser.Scene, key: string, data?: object): void {
  const half = FEEDBACK.transitionMs / 2;
  scene.input.enabled = false;
  scene.cameras.main.fadeOut(half, 0x2b, 0x26, 0x22);
  scene.cameras.main.once('camerafadeoutcomplete', () => scene.scene.start(key, data));
}

export function fadeIn(scene: Phaser.Scene): void {
  scene.cameras.main.fadeIn(FEEDBACK.transitionMs / 2, 0x2b, 0x26, 0x22);
}
