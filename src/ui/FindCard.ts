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
  // Ready text instead of textKey, for cards put together at run time (welcome back).
  text?: string;
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
  modal.add(scene.add.text(px + 40, py + 568, card.text ?? t(card.textKey), textStyle(34, COLORS.text, { wordWrap: { width: w - 80 }, lineSpacing: 6 })));
  if (card.note) modal.add(scene.add.text(px + 40, py + h - 196, card.note, textStyle(32, '#7D7468', { fontStyle: 'italic' })));
  const secondaryTap = () => {
    if (closed || !card.secondary) return;
    closed = true;
    audio.play(UI_SOUNDS.tap);
    modal.close(card.secondary.onTap);
  };
  // With a note under the text there is no room for a link: the second action becomes a button beside the main one.
  const sideBySide = !!(card.secondary && card.note);
  const mainW = sideBySide ? (w - 96) / 2 : w - 80;
  modal.add(
    new Button(scene, { x: px + w - 40 - mainW, y: py + h - 144, w: mainW, h: 112, label: t(card.buttonKey ?? 'ui.close'), fill: PALETTE.green, onTap: close }),
  );
  if (card.secondary && sideBySide) {
    modal.add(new Button(scene, { x: px + 40, y: py + h - 144, w: mainW, h: 112, label: t(card.secondary.labelKey), fill: PALETTE.wood, fontSize: 32, onTap: secondaryTap }));
  } else if (card.secondary) {
    const link = scene.add
      .text(px + w / 2, py + h - 184, t(card.secondary.labelKey), textStyle(32, '#7D7468', { fontStyle: 'bold' }))
      .setOrigin(0.5)
      .setPadding(24, 16, 24, 16)
      .setInteractive({ useHandCursor: true });
    link.on('pointerup', secondaryTap);
    modal.add(link);
  }
  if (card.sound) audio.play(card.sound);
  return modal;
}
