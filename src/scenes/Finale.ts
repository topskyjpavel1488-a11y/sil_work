// A room's final card (spec 4.7, v0.7): the last room ends the first version of the game,
// an earlier room opens the next one and the player continues there.
import Phaser from 'phaser';
import { DESIGN_HEIGHT, DESIGN_WIDTH, PALETTE } from '../config';
import { findRoom } from '../core/content';
import { t } from '../i18n';
import type { Store } from '../store';
import { showBeforeAfter } from '../ui/BeforeAfter';
import { showFindCard } from '../ui/FindCard';
import { fadeIn, goTo } from '../ui/transition';

export class FinaleScene extends Phaser.Scene {
  constructor(private readonly store: Store) {
    super('Finale');
  }

  create(data: { roomId?: string } = {}): void {
    fadeIn(this);
    this.add.rectangle(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT, PALETTE.cream).setOrigin(0);
    this.add.rectangle(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT, PALETTE.copper, 0.3).setOrigin(0);
    const { content } = this.store;
    const room = findRoom(content, data.roomId ?? '') ?? content.rooms[content.rooms.length - 1];
    if (!room) return goTo(this, 'Workshop');
    const next = content.rooms.find((r) => r.unlockAfter === room.id);
    const card = () =>
      showFindCard(
        this,
        {
          ...room.final,
          note: t(room.finalNoteKey, next ? { room: t(next.nameKey) } : {}),
          buttonKey: 'ui.continue',
          // The room as it was found and as it is now (spec 4.7, v0.8).
          secondary: { labelKey: 'ui.final.compare', onTap: () => showBeforeAfter(this, content, room, card) },
        },
        () => {
          if (next) this.store.setRoom(next.id);
          goTo(this, 'Workshop');
        },
      );
    card();
  }
}
