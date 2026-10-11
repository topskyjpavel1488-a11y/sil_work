// Rounded button with press feedback: sound and a short scale tween (spec 6.3).
import Phaser from 'phaser';
import { audio } from '../audio';
import { FEEDBACK, PALETTE, UI_SOUNDS } from '../config';
import { COLORS, textStyle } from './style';

export interface ButtonOptions {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  fill?: number;
  textColor?: string;
  fontSize?: number;
  onTap: () => void;
}

export class Button extends Phaser.GameObjects.Container {
  private bg: Phaser.GameObjects.Graphics;
  private text: Phaser.GameObjects.Text;
  private enabled = true;

  constructor(scene: Phaser.Scene, private readonly opts: ButtonOptions) {
    super(scene, opts.x + opts.w / 2, opts.y + opts.h / 2);
    this.setSize(opts.w, opts.h);
    this.bg = scene.add.graphics();
    this.text = scene.add
      .text(0, 0, opts.label, textStyle(opts.fontSize ?? 36, opts.textColor ?? COLORS.textLight, { align: 'center', wordWrap: { width: opts.w - 24 } }))
      .setOrigin(0.5);
    this.add([this.bg, this.text]);
    this.draw();
    this.setInteractive({ useHandCursor: true });
    this.on('pointerdown', () => {
      if (!this.enabled) return;
      scene.tweens.add({ targets: this, scale: 0.94, duration: FEEDBACK.tapMs / 2, yoyo: true });
    });
    this.on('pointerup', () => {
      if (!this.enabled) return;
      audio.play(UI_SOUNDS.tap);
      opts.onTap();
    });
    scene.add.existing(this);
  }

  setEnabled(enabled: boolean): this {
    this.enabled = enabled;
    this.setAlpha(enabled ? 1 : 0.45);
    if (this.input) this.input.cursor = enabled ? 'pointer' : 'default';
    return this;
  }

  setLabel(label: string): this {
    this.text.setText(label);
    return this;
  }

  private draw(): void {
    const { w, h } = this.opts;
    this.bg.clear();
    this.bg.fillStyle(this.opts.fill ?? PALETTE.wood, 1);
    this.bg.fillRoundedRect(-w / 2, -h / 2, w, h, 24);
  }
}
