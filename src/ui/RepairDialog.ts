// Modal repair window: requirements as "have / need" and the Repair button (spec 4.4, 6.2).
import Phaser from 'phaser';
import { addAsset } from '../assets';
import { DEPTH, DESIGN_HEIGHT, DESIGN_WIDTH, FEEDBACK, PALETTE } from '../config';
import { findObject } from '../core/content';
import { checkRepair } from '../core/repair';
import { t } from '../i18n';
import type { Store } from '../store';
import { Button } from './Button';
import { addItemView } from './ItemView';
import { requirementImage, requirementName } from './labels';
import { COLORS, textStyle } from './style';
import { onTap } from './tap';

const PANEL_W = 640;
const ROW_H = 96;

export class RepairDialog extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    store: Store,
    objectId: string,
    private readonly onClose: () => void,
  ) {
    super(scene, 0, 0);
    const object = findObject(store.content, objectId);
    const check = checkRepair(store.state, store.content, objectId);
    const step = store.state.objects[objectId]?.step ?? 0;

    // The shade blocks taps on the room underneath; tapping it closes the dialog.
    const shade = scene.add.rectangle(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT, 0x000000, 0.45).setOrigin(0).setInteractive();
    onTap(shade, () => this.close());
    this.add(shade);

    const rows = check.requirements.length;
    const panelH = 120 + 64 + rows * ROW_H + 176;
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

    this.add(scene.add.text(px + 40, py + 40, t(object?.nameKey ?? objectId), textStyle(44, COLORS.text, { fontStyle: 'bold' })));
    const total = object?.steps.length ?? 0;
    this.add(scene.add.text(px + 40, py + 108, t('ui.repair.step', { n: step + 1, total }), textStyle(32, COLORS.text)));
    this.add(
      new Button(scene, { x: px + PANEL_W - 112, y: py + 16, w: 96, h: 96, label: '✕', fill: PALETTE.dust, textColor: COLORS.text, onTap: () => this.close() }),
    );

    let y = py + 184;
    for (const req of check.requirements) {
      const enough = req.have >= req.need;
      const icon = { x: px + 40, y: y + 8, w: 72, h: 72 };
      this.add(req.kind === 'item' ? addItemView(scene, store.content, req.chain, req.level, icon) : addAsset(scene, requirementImage(store.content, req), icon));
      this.add(
        scene.add.text(px + 136, y + 44, requirementName(store.content, req), textStyle(34, COLORS.text, { wordWrap: { width: 300 } })).setOrigin(0, 0.5),
      );
      this.add(
        scene.add
          .text(px + PANEL_W - 40, y + 44, `${Math.min(req.have, req.need)}/${req.need}`, textStyle(38, enough ? COLORS.ok : COLORS.missing, { fontStyle: 'bold' }))
          .setOrigin(1, 0.5),
      );
      y += ROW_H;
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
