// Journal: a grid of finds, open ones with their picture, the rest as silhouettes (spec 6.2).
import Phaser from 'phaser';
import { addAsset } from '../assets';
import { DESIGN_HEIGHT, DESIGN_WIDTH, PALETTE } from '../config';
import { t } from '../i18n';
import { rect } from '../layout';
import type { Store } from '../store';
import { Button } from '../ui/Button';
import { showFindCard } from '../ui/FindCard';
import { COLORS, textStyle } from '../ui/style';
import { onTap } from '../ui/tap';
import { fadeIn, goTo } from '../ui/transition';

const SECTION = 'journal';

export class JournalScene extends Phaser.Scene {
  private cardOpen = false;

  constructor(private readonly store: Store) {
    super('Journal');
  }

  create(): void {
    this.cardOpen = false;
    fadeIn(this);
    this.add.rectangle(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT, PALETTE.cream).setOrigin(0);
    const title = rect(SECTION, 'ui.title');
    this.add.text(title.x + title.w / 2, title.y + title.h / 2, t('ui.journal.title'), textStyle(48, COLORS.text, { fontStyle: 'bold' })).setOrigin(0.5);

    this.store.content.finds.forEach((find, i) => {
      const r = rect(SECTION, `slot.${i}`);
      const open = this.store.state.finds.includes(find.id);
      const box = open ? addAsset(this, find.image, r) : this.add.container(r.x + r.w / 2, r.y + r.h / 2).setSize(r.w, r.h);
      if (!open) {
        const g = this.add.graphics();
        g.fillStyle(PALETTE.metal, 0.25);
        g.fillRoundedRect(-r.w / 2, -r.h / 2, r.w, r.h, 20);
        box.add([g, this.add.text(0, -24, '?', textStyle(72, COLORS.text)).setOrigin(0.5).setAlpha(0.5)]);
      }
      const caption = open ? t(find.titleKey) : t('ui.journal.locked');
      box.add(
        this.add
          .text(0, r.h / 2 - 16, caption, textStyle(32, COLORS.text, { align: 'center', wordWrap: { width: r.w - 24 } }))
          .setOrigin(0.5, 1)
          .setAlpha(open ? 1 : 0.6),
      );
      if (!open) return;
      box.setInteractive({ useHandCursor: true });
      onTap(box, () => {
        if (this.cardOpen) return;
        this.cardOpen = true;
        showFindCard(this, find, () => (this.cardOpen = false));
      });
    });

    new Button(this, { ...rect(SECTION, 'ui.back'), label: t('ui.back'), fill: PALETTE.wood, onTap: () => goTo(this, 'Workshop') });
  }
}
