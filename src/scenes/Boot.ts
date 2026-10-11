// Loading screen: logo and progress bar while images load (spec 6.2).
import Phaser from 'phaser';
import { addAsset, preloadImages } from '../assets';
import { DESIGN_HEIGHT, DESIGN_WIDTH, PALETTE, UI_IMAGES } from '../config';
import { t } from '../i18n';
import { COLORS, textStyle } from '../ui/style';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload(): void {
    const cx = DESIGN_WIDTH / 2;
    const cy = DESIGN_HEIGHT / 2;
    this.add.rectangle(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT, PALETTE.cream).setOrigin(0);
    addAsset(this, UI_IMAGES.logo, { x: cx - 64, y: cy - 320, w: 128, h: 128 });
    this.add.text(cx, cy - 120, t('ui.title'), textStyle(56, COLORS.text, { fontStyle: 'bold' })).setOrigin(0.5);
    const bar = this.add.rectangle(cx - 240, cy, 0, 24, PALETTE.copper).setOrigin(0, 0.5);
    this.add.rectangle(cx, cy, 480, 24).setStrokeStyle(3, PALETTE.wood);
    this.load.on('progress', (p: number) => bar.setSize(480 * p, 24));
    preloadImages(this);
  }

  create(): void {
    this.scene.start('Workshop');
  }
}
