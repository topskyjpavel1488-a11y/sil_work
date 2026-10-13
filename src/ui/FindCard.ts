// Find card: picture, title and a short text; closing it is the player's action (spec 4.5, 6.2).
import type Phaser from 'phaser';
import { addAsset } from '../assets';
import { audio } from '../audio';
import { PALETTE, UI_SOUNDS } from '../config';
import { t } from '../i18n';
import { Button } from './Button';
import { Modal } from './Modal';
import { COLORS, textStyle } from './style';

export interface CardData {
  image: string;
  titleKey: string;
  textKey: string;
  sound?: string;
  note?: string;
  buttonKey?: string;
  // A small text link above the main button, e.g. "Skip" in the opening story.
  secondary?: { labelKey: string; onTap: () => void };
}

export function showFindCard(scene: Phaser.Scene, card: CardData, onClose: () => void): Modal {
  const w = 640;
  const h = 1000;
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    modal.close(onClose);
  };
  const modal = new Modal(scene, w, h, close);
  const { px, py } = modal;
  modal.add(addAsset(scene, card.image, { x: px + 40, y: py + 40, w: w - 80, h: 420 }));
  modal.add(scene.add.text(px + 40, py + 492, t(card.titleKey), textStyle(44, COLORS.text, { fontStyle: 'bold', wordWrap: { width: w - 80 } })));
  modal.add(scene.add.text(px + 40, py + 568, t(card.textKey), textStyle(34, COLORS.text, { wordWrap: { width: w - 80 }, lineSpacing: 6 })));
  if (card.note) modal.add(scene.add.text(px + 40, py + h - 196, card.note, textStyle(32, '#7D7468', { fontStyle: 'italic' })));
  modal.add(
    new Button(scene, { x: px + 40, y: py + h - 144, w: w - 80, h: 112, label: t(card.buttonKey ?? 'ui.close'), fill: PALETTE.green, onTap: close }),
  );
  if (card.secondary) {
    const { labelKey, onTap } = card.secondary;
    const link = scene.add
      .text(px + w / 2, py + h - 184, t(labelKey), textStyle(32, '#7D7468', { fontStyle: 'bold' }))
      .setOrigin(0.5)
      .setPadding(24, 16, 24, 16)
      .setInteractive({ useHandCursor: true });
    link.on('pointerup', () => {
      if (closed) return;
      closed = true;
      audio.play(UI_SOUNDS.tap);
      modal.close(onTap);
    });
    modal.add(link);
  }
  if (card.sound) audio.play(card.sound);
  return modal;
}
