// Final screen "The workshop is alive" with the final card (spec 4.7).
import Phaser from 'phaser';
import { DESIGN_HEIGHT, DESIGN_WIDTH, PALETTE } from '../config';
import { t } from '../i18n';
import type { Store } from '../store';
import { showFindCard } from '../ui/FindCard';
import { fadeIn, goTo } from '../ui/transition';

export class FinaleScene extends Phaser.Scene {
  constructor(private readonly store: Store) {
    super('Finale');
  }

  create(): void {
    fadeIn(this);
    this.add.rectangle(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT, PALETTE.cream).setOrigin(0);
    this.add.rectangle(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT, PALETTE.copper, 0.3).setOrigin(0);
    const { final } = this.store.content;
    showFindCard(this, { ...final, note: t('ui.final.note'), buttonKey: 'ui.continue' }, () => goTo(this, 'Workshop'));
  }
}
