import Phaser from 'phaser';
import { DESIGN_HEIGHT, DESIGN_WIDTH, PALETTE } from '../config';
import type { PlatformAdapter } from '../platform/adapter';

// M0 spike: an empty 720x1280 scene that shows the design bounds.
export class BootScene extends Phaser.Scene {
  constructor(private readonly platform: PlatformAdapter) {
    super('Boot');
  }

  create(): void {
    const g = this.add.graphics();
    g.fillStyle(PALETTE.cream, 1);
    g.fillRect(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
    g.lineStyle(8, PALETTE.wood, 1);
    g.strokeRect(4, 4, DESIGN_WIDTH - 8, DESIGN_HEIGHT - 8);
    g.fillStyle(PALETTE.copper, 1);
    g.fillRoundedRect(DESIGN_WIDTH / 2 - 160, DESIGN_HEIGHT / 2 - 60, 320, 120, 24);

    this.add
      .text(DESIGN_WIDTH / 2, DESIGN_HEIGHT / 2, '720×1280', {
        fontFamily: 'sans-serif',
        fontSize: '40px',
        color: '#F3E9D2',
      })
      .setOrigin(0.5);

    this.platform.gameReady();
  }
}
