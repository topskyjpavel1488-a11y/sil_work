// Modal repair window: requirements as "have / need" and the Repair button (spec 4.4, 6.2).
import Phaser from 'phaser';
import { addAsset } from '../assets';
import { DEPTH, DESIGN_HEIGHT, DESIGN_WIDTH, FEEDBACK, PALETTE } from '../config';
import { findObject } from '../core/content';
import { missingSources, type Source } from '../core/hints';
import { checkRepair, type Requirement } from '../core/repair';
import { t } from '../i18n';
import type { Store } from '../store';
import { Button } from './Button';
import { addItemView } from './ItemView';
import { available, itemName, requirementImage, requirementName, sourceLabel } from './labels';
import { COLORS, textStyle } from './style';
import { onTap } from './tap';

const PANEL_W = 640;
const ROW_H = 96;
const HINT_ROW_H = 132; // a missing requirement gets a second line: where to get it

export class RepairDialog extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    store: Store,
    objectId: string,
    private readonly onClose: () => void,
    // Tapping a "where to get it" line closes the dialog and leads there.
    onSource?: (source: Source) => void,
  ) {
    super(scene, 0, 0);
    const object = findObject(store.content, objectId);
    const check = checkRepair(store.state, store.content, objectId);
    const step = store.state.objects[objectId]?.step ?? 0;

    // The shade blocks taps on the room underneath; tapping it closes the dialog.
    const shade = scene.add.rectangle(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT, 0x000000, 0.45).setOrigin(0).setInteractive();
    onTap(shade, () => this.close());
    this.add(shade);

    const sources = missingSources(store.state, store.content, objectId, store.state.room);
    const sameReq = (a: Requirement, b: Requirement | undefined) =>
      !!b && (a.kind === 'resource' ? b.kind === 'resource' && a.resource === b.resource : b.kind === 'item' && a.chain === b.chain && a.level === b.level);
    const sourceOf = (i: number) => sources.find((s) => sameReq(s.req, check.requirements[i]))?.source;
    const rowsH = check.requirements.reduce((h, _r, i) => h + (sourceOf(i) ? HINT_ROW_H : ROW_H), 0);
    // One extra line explains a split, or why the repair waits for room on the table.
    const note = check.reason === 'noSpace' ? t('ui.noSpace') : check.splits.length ? t('ui.repair.split', { items: check.splits.map((i) => itemName(store.content, i.chain, i.level)).join(', ') }) : '';
    const noteH = note ? 72 : 0;
    const panelH = 120 + 64 + rowsH + noteH + 176;
    const px = (DESIGN_WIDTH - PANEL_W) / 2;
    const py = (DESIGN_HEIGHT - panelH) / 2;
    const panel = scene.add.graphics();
    panel.fillStyle(PALETTE.cream, 1);
    panel.fillRoundedRect(px, py, PANEL_W, panelH, 32);
    panel.lineStyle(6, PALETTE.wood, 1);
    panel.strokeRoundedRect(px, py, PANEL_W, panelH, 32);
    // Swallow taps on the panel so they do not reach the shade.
    const hit = scene.add.zone(px, py, PANEL_W, panelH).setOrigin(0).setInteractive();
    this.add([panel, hit]);

    // A long name is squeezed so it never runs under the close button.
    const title = scene.add.text(px + 40, py + 40, t(object?.nameKey ?? objectId), textStyle(44, COLORS.text, { fontStyle: 'bold' }));
    const titleMax = PANEL_W - 40 - 136;
    if (title.width > titleMax) title.setScale(titleMax / title.width);
    this.add(title);
    const total = object?.steps.length ?? 0;
    this.add(scene.add.text(px + 40, py + 108, t('ui.repair.step', { n: step + 1, total }), textStyle(32, COLORS.text)));
    this.add(
      new Button(scene, { x: px + PANEL_W - 112, y: py + 16, w: 96, h: 96, label: '✕', fill: PALETTE.dust, textColor: COLORS.text, onTap: () => this.close() }),
    );

    let y = py + 184;
    check.requirements.forEach((req, i) => {
      const enough = available(req) >= req.need;
      const source = sourceOf(i);
      const nameY = source ? y + 30 : y + 44;
      const icon = { x: px + 40, y: y + 8, w: 72, h: 72 };
      this.add(req.kind === 'item' ? addItemView(scene, store.content, req.chain, req.level, icon) : addAsset(scene, requirementImage(store.content, req), icon));
      this.add(
        scene.add.text(px + 136, nameY, requirementName(store.content, req), textStyle(34, COLORS.text, { wordWrap: { width: 300 } })).setOrigin(0, 0.5),
      );
      if (source) {
        const link = scene.add
          .text(px + 136, y + 86, sourceLabel(source), textStyle(32, COLORS.missing, { fontStyle: 'bold', wordWrap: { width: PANEL_W - 176 } }))
          .setOrigin(0, 0.5);
        this.add(link);
        if (source.kind !== 'none' && onSource) {
          link.setInteractive({ useHandCursor: true });
          onTap(link, () => {
            this.close();
            onSource(source);
          });
        }
      }
      this.add(
        scene.add
          .text(px + PANEL_W - 40, nameY, `${Math.min(available(req), req.need)}/${req.need}`, textStyle(38, enough ? COLORS.ok : COLORS.missing, { fontStyle: 'bold' }))
          .setOrigin(1, 0.5),
      );
      y += source ? HINT_ROW_H : ROW_H;
    });
    if (note) {
      this.add(scene.add.text(px + 40, y + 16, note, textStyle(32, check.ok ? COLORS.text : COLORS.missing, { wordWrap: { width: PANEL_W - 80 } })));
      y += noteH;
    }

    const button = new Button(scene, {
      x: px + 40,
      y: y + 40,
      w: PANEL_W - 80,
      h: 112,
      label: t('ui.repair.button'),
      fill: PALETTE.green,
      fontSize: 40,
      onTap: () => {
        this.close();
        store.repair(objectId);
      },
    });
    button.setEnabled(check.ok);
    this.add(button);

    this.setDepth(DEPTH.modal).setAlpha(0);
    scene.add.existing(this);
    scene.tweens.add({ targets: this, alpha: 1, duration: FEEDBACK.transitionMs / 2 });
  }

  private close(): void {
    this.destroy();
    this.onClose();
  }
}
