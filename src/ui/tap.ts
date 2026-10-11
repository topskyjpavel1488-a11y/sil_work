// A tap is a press and release on the same object. A release that started elsewhere
// (for example, a dragged item dropped over a button) does not count.
import type Phaser from 'phaser';

export function onTap(target: Phaser.GameObjects.GameObject, cb: () => void): void {
  let pressed = false;
  target.on('pointerdown', () => (pressed = true));
  target.on('pointerout', () => (pressed = false));
  target.on('pointerup', () => {
    if (!pressed) return;
    pressed = false;
    cb();
  });
}
