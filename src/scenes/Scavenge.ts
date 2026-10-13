// Clearing one zone: tap debris to collect resources and items (spec 4.2, 6.2).
import Phaser from 'phaser';
import { addAsset } from '../assets';
import { audio } from '../audio';
import { DESIGN_HEIGHT, DESIGN_WIDTH, FEEDBACK, PALETTE, UI_SOUNDS } from '../config';
import { findRoom, findZone, type DebrisDef, type ZoneDef } from '../core/content';
import { isZoneCleared } from '../core/progress';
import { currentTutorialStep } from '../core/tutorial';
import { RESOURCES, type GameEvent } from '../core/state';
import { t } from '../i18n';
import { rect } from '../layout';
import type { Ads } from '../ads';
import type { Store } from '../store';
import { Button } from '../ui/Button';
import { itemName, resourceName } from '../ui/labels';
import { ResourceBar } from '../ui/ResourceBar';
import { COLORS, textStyle } from '../ui/style';
import { showToast } from '../ui/Toast';
import { TutorialOverlay } from '../ui/TutorialOverlay';
import { fadeIn, goTo } from '../ui/transition';
import { drawZoneScene } from '../ui/ZoneArt';
import { onTap } from '../ui/tap';

const SECTION = 'scavenge';

export class ScavengeScene extends Phaser.Scene {
  private zone!: ZoneDef;
  private resources!: ResourceBar;
  private debris = new Map<string, Phaser.GameObjects.Container>();
  private busy = false;
  private tutorial!: TutorialOverlay;

  constructor(
    private readonly store: Store,
    private readonly ads: Ads,
  ) {
    super('Scavenge');
  }

  init(data: { zoneId: string }): void {
    const zone = findZone(this.store.content, data.zoneId);
    if (!zone) throw new Error(`Unknown zone ${data.zoneId}`);
    this.zone = zone;
    this.debris.clear();
    this.busy = false;
  }

  create(): void {
    fadeIn(this);
    this.add.rectangle(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT, PALETTE.cream).setOrigin(0);
    // The zone has no picture of its own: a close-up of the room around it (spec 15.6).
    const room = findRoom(this.store.content, this.zone.room);
    const roomLayout = room?.layout ?? 'workshop';
    drawZoneScene(this, rect(SECTION, 'area'), room?.image ?? '', rect(roomLayout, 'room'), rect(roomLayout, `zone.${this.zone.id}`), this.zone.sceneImage);

    this.resources = new ResourceBar(this, this.store.content, rect(SECTION, 'ui.resources'));
    this.resources.update(this.store.state);

    const title = rect(SECTION, 'ui.title');
    this.add.text(title.x + title.w / 2, title.y + title.h / 2, t(this.zone.nameKey), textStyle(44, COLORS.text, { fontStyle: 'bold' })).setOrigin(0.5);

    const taken = this.store.state.zones[this.zone.id]?.taken ?? [];
    for (const d of this.zone.debris) {
      if (!taken.includes(d.id)) this.addDebris(d);
    }

    const back = rect(SECTION, 'ui.back');
    new Button(this, { ...back, label: t('ui.back'), fill: PALETTE.wood, onTap: () => this.leave() });

    const unsubscribe = this.store.subscribe((events) => this.onEvents(events));
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, unsubscribe);

    this.tutorial = new TutorialOverlay(this, this.store, rect(SECTION, 'ui.tutorial'));
    this.store.tutorialSignal(`enterZone:${this.zone.id}`);
    this.updateTutorial();

    if (isZoneCleared(this.store.state, this.zone)) this.showCleared();
  }

  // Points at the next debris while the tutorial step is about clearing this zone.
  private updateTutorial(): void {
    const step = currentTutorialStep(this.store.state, this.store.content.tutorial);
    const next = this.zone.debris.find((d) => this.debris.has(d.id));
    const active = step?.target.type === 'debris' && step.target.id === this.zone.id && next;
    this.tutorial.show(active ? step : null, active ? [rect(`${SECTION}.${this.zone.id}`, `debris.${next.id}`)] : []);
  }

  private addDebris(d: DebrisDef): void {
    const kind = this.store.content.debrisKinds[d.kind];
    const r = rect(`${SECTION}.${this.zone.id}`, `debris.${d.id}`);
    const box = addAsset(this, kind?.image ?? '', r);
    if (!this.textures.exists(kind?.image ?? '')) box.add(this.add.text(0, 0, t(kind?.nameKey ?? d.kind), textStyle(32, COLORS.text)).setOrigin(0.5));
    box.setInteractive({ useHandCursor: true });
    box.on('pointerdown', () => this.tweens.add({ targets: box, scale: 0.94, duration: FEEDBACK.tapMs / 2, yoyo: true }));
    onTap(box, () => {
      if (this.busy) return;
      this.store.takeDebris(this.zone.id, d.id);
    });
    this.debris.set(d.id, box);
  }

  private onEvents(events: GameEvent[]): void {
    this.resources.update(this.store.state);
    for (const e of events) {
      if (e.type === 'debrisTaken') this.playTaken(e.debrisId);
      if (e.type === 'noSpace') this.playNoSpace(e.debrisId);
      if (e.type === 'zoneCleared') this.time.delayedCall(FEEDBACK.transitionMs, () => this.showCleared());
    }
    this.updateTutorial();
  }

  private playTaken(debrisId: string): void {
    const box = this.debris.get(debrisId);
    const d = this.zone.debris.find((x) => x.id === debrisId);
    if (!box || !d) return;
    this.debris.delete(debrisId);
    box.disableInteractive();
    audio.play(this.store.content.debrisKinds[d.kind]?.sound ?? UI_SOUNDS.tap);
    this.tweens.add({ targets: box, scale: 1.15, alpha: 0, duration: FEEDBACK.transitionMs, ease: 'Sine.easeOut', onComplete: () => box.destroy() });

    // Each gain floats up from the debris; resources drift towards their counter.
    const lines: { text: string; target?: { x: number; y: number } }[] = [];
    for (const res of RESOURCES) {
      const n = d.drop.resources?.[res] ?? 0;
      if (n > 0) lines.push({ text: `+${n} ${resourceName(this.store.content, res)}`, target: this.resources.anchor(res) });
    }
    for (const item of d.drop.items ?? []) lines.push({ text: `+${item.count} ${itemName(this.store.content, item.chain, item.level)}` });
    lines.forEach((line, i) => {
      const label = this.add
        .text(box.x, box.y + i * 44, line.text, textStyle(32, COLORS.text, { fontStyle: 'bold', stroke: '#F3E9D2', strokeThickness: 6 }))
        .setOrigin(0.5)
        .setDepth(500);
      // Keep the whole label on screen near the edges.
      const margin = label.width / 2 + 16;
      label.x = Phaser.Math.Clamp(label.x, margin, DESIGN_WIDTH - margin);
      const to = line.target ?? { x: label.x, y: box.y - 120 };
      this.tweens.add({ targets: label, x: to.x, y: to.y, alpha: 0, delay: 200, duration: 700, ease: 'Sine.easeIn', onComplete: () => label.destroy() });
    });
  }

  private playNoSpace(debrisId: string): void {
    const box = this.debris.get(debrisId);
    audio.play(UI_SOUNDS.soft);
    showToast(this, t('ui.noSpace'));
    if (box) this.tweens.add({ targets: box, x: box.x + 10, duration: 50, yoyo: true, repeat: 2 });
  }

  private showCleared(): void {
    this.busy = true;
    const w = 560;
    const offerReward = this.ads.enabled;
    const h = offerReward ? 456 : 320;
    const x = (DESIGN_WIDTH - w) / 2;
    const y = (DESIGN_HEIGHT - h) / 2;
    const shade = this.add.rectangle(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT, 0x000000, 0.35).setOrigin(0).setInteractive();
    const panel = this.add.graphics();
    panel.fillStyle(PALETTE.cream, 1);
    panel.fillRoundedRect(x, y, w, h, 32);
    panel.lineStyle(6, PALETTE.green, 1);
    panel.strokeRoundedRect(x, y, w, h, 32);
    const text = this.add.text(DESIGN_WIDTH / 2, y + 88, t('ui.zone.cleared'), textStyle(44, COLORS.text, { fontStyle: 'bold' })).setOrigin(0.5);
    const button = new Button(this, { x: x + 40, y: y + h - 152, w: w - 80, h: 112, label: t('ui.zone.toWorkshop'), fill: PALETTE.green, onTap: () => this.leave() });
    const group = this.add.container(0, 0, [shade, panel, text, button]).setDepth(900).setAlpha(0);
    // R1: an optional bonus after clearing (spec 8.4); offered once, hidden after the attempt.
    if (offerReward) {
      const reward: Button = new Button(this, {
        x: x + 40,
        y: y + 152,
        w: w - 80,
        h: 112,
        label: t('ui.reward.parts'),
        fill: PALETTE.copper,
        fontSize: 32,
        onTap: () => {
          reward.setEnabled(false);
          void this.ads.rewarded('parts').then((ok) => {
            reward.setVisible(false);
            if (ok) showToast(this, t('ui.reward.got'));
          });
        },
      });
      group.add(reward);
    }
    this.tweens.add({ targets: group, alpha: 1, duration: FEEDBACK.transitionMs });
  }

  // Leaving a zone for the main screen is an ad moment (spec 8.3).
  private leave(): void {
    if (this.ads.busy) return;
    this.input.enabled = false;
    void this.ads.interstitial().then(() => goTo(this, 'Workshop'));
  }
}
