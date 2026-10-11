// Main screen: the room with object and zone hotspots, goal banner, resources, navigation (spec 6.2).
import Phaser from 'phaser';
import { addAsset, setAsset } from '../assets';
import { audio } from '../audio';
import { FEEDBACK, PALETTE, UI_IMAGES, UI_SOUNDS } from '../config';
import type { ObjectDef, ZoneDef } from '../core/content';
import { currentGoal, isObjectAvailable, isObjectRestored, isZoneCleared, isZoneUnlocked } from '../core/progress';
import { checkRepair } from '../core/repair';
import { RESOURCES, stepOf, type GameEvent, type GameState } from '../core/state';
import { t } from '../i18n';
import { rect, type Rect } from '../layout';
import type { PlatformAdapter } from '../platform/adapter';
import type { Store } from '../store';
import { Button } from '../ui/Button';
import { requirementName } from '../ui/labels';
import { RepairDialog } from '../ui/RepairDialog';
import { COLORS, textStyle } from '../ui/style';

const SECTION = 'workshop';

interface Hotspot {
  box: Phaser.GameObjects.Container;
  label: Phaser.GameObjects.Text;
}

export class WorkshopScene extends Phaser.Scene {
  private objects = new Map<string, Hotspot>();
  private zones = new Map<string, Hotspot>();
  private resourceTexts = new Map<string, Phaser.GameObjects.Text>();
  private goalTitle!: Phaser.GameObjects.Text;
  private goalCost!: Phaser.GameObjects.Text;
  private warmLight!: Phaser.GameObjects.Rectangle;
  private dialog: RepairDialog | null = null;
  private readyReported = false;

  constructor(
    private readonly store: Store,
    private readonly platform: PlatformAdapter,
  ) {
    super('Workshop');
  }

  create(): void {
    this.add.rectangle(0, 0, this.scale.width, this.scale.height, PALETTE.cream).setOrigin(0);
    const room = rect(SECTION, 'room');
    addAsset(this, UI_IMAGES.room, room);
    for (const zone of this.store.content.zones) this.zones.set(zone.id, this.addHotspot(zone.image, rect(SECTION, `zone.${zone.id}`), zone.nameKey, () => this.onZone(zone)));
    for (const object of this.store.content.objects) {
      this.objects.set(object.id, this.addHotspot(object.stateImages[0] ?? '', rect(SECTION, `object.${object.id}`), object.nameKey, () => this.onObject(object)));
    }
    this.warmLight = this.add.rectangle(room.x, room.y, room.w, room.h, PALETTE.copper, 0.14).setOrigin(0).setVisible(false);

    this.createResourceBar();
    this.createGoalBanner();
    this.createNav();
    if (import.meta.env.DEV) void import('../dev').then((dev) => dev.addDevButton(this, this.store));

    const unsubscribe = this.store.subscribe((events, state) => this.onChange(events, state));
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, unsubscribe);
    this.refresh(this.store.state);

    if (!this.readyReported) {
      this.readyReported = true;
      this.platform.gameReady();
    }
  }

  private addHotspot(imageKey: string, r: Rect, nameKey: string, onTap: () => void): Hotspot {
    const box = addAsset(this, imageKey, r);
    const label = this.add
      .text(r.x + r.w / 2, r.y + r.h / 2, t(nameKey), textStyle(32, COLORS.text, { align: 'center', wordWrap: { width: Math.max(r.w - 8, 96) } }))
      .setOrigin(0.5);
    box.setInteractive({ useHandCursor: true });
    box.on('pointerdown', () => this.tweens.add({ targets: box, scale: 0.96, duration: FEEDBACK.tapMs / 2, yoyo: true }));
    box.on('pointerup', () => {
      if (this.dialog) return;
      audio.play(UI_SOUNDS.tap);
      onTap();
    });
    return { box, label };
  }

  private createResourceBar(): void {
    const r = rect(SECTION, 'ui.resources');
    const slot = r.w / RESOURCES.length;
    RESOURCES.forEach((res, i) => {
      const def = this.store.content.resources.find((x) => x.id === res);
      const x = r.x + i * slot;
      addAsset(this, def?.image ?? '', { x: x + 8, y: r.y + (r.h - 64) / 2, w: 64, h: 64 });
      this.resourceTexts.set(res, this.add.text(x + 88, r.y + r.h / 2, '0', textStyle(40, COLORS.text, { fontStyle: 'bold' })).setOrigin(0, 0.5));
    });
    // Settings arrive with the settings window; until then the button is shown inactive.
    const s = rect(SECTION, 'ui.settings');
    new Button(this, { ...s, label: '⚙', fill: PALETTE.dust, textColor: COLORS.text, fontSize: 44, onTap: () => undefined }).setEnabled(false);
  }

  private createGoalBanner(): void {
    const r = rect(SECTION, 'ui.goal');
    const bg = this.add.graphics();
    bg.fillStyle(PALETTE.cream, 1);
    bg.fillRoundedRect(r.x, r.y, r.w, r.h, 24);
    bg.lineStyle(4, PALETTE.wood, 1);
    bg.strokeRoundedRect(r.x, r.y, r.w, r.h, 24);
    this.goalTitle = this.add.text(r.x + 28, r.y + 20, '', textStyle(40, COLORS.text, { fontStyle: 'bold' }));
    this.goalCost = this.add.text(r.x + 28, r.y + 76, '', textStyle(32, COLORS.text));
    const hit = this.add.zone(r.x, r.y, r.w, r.h).setOrigin(0).setInteractive({ useHandCursor: true });
    hit.on('pointerup', () => {
      const goal = currentGoal(this.store.state, this.store.content);
      if (goal && !this.dialog) {
        audio.play(UI_SOUNDS.tap);
        this.openRepair(goal.object.id);
      }
    });
  }

  private createNav(): void {
    const r = rect(SECTION, 'ui.nav');
    this.add.rectangle(r.x, r.y, r.w, r.h, PALETTE.wood).setOrigin(0);
    const keys = ['ui.nav.workshop', 'ui.nav.table', 'ui.nav.journal'];
    const w = (r.w - 16 * 4) / keys.length;
    keys.forEach((key, i) => {
      const button = new Button(this, {
        x: r.x + 16 + i * (w + 16),
        y: r.y + 16,
        w,
        h: r.h - 32,
        label: t(key),
        fill: i === 0 ? PALETTE.copper : PALETTE.metal,
        fontSize: 32,
        onTap: () => undefined,
      });
      // The table and the journal open in later stages (M4, M5).
      if (i > 0) button.setEnabled(false);
    });
  }

  private onObject(object: ObjectDef): void {
    const state = this.store.state;
    if (!isObjectAvailable(state, object)) return;
    const hotspot = this.objects.get(object.id);
    if (isObjectRestored(state, object)) {
      if (hotspot) this.tweens.add({ targets: hotspot.box, scale: 1.06, duration: FEEDBACK.tapMs, yoyo: true });
      return;
    }
    this.openRepair(object.id);
  }

  // Scavenging opens in M3; until then zones only show their state.
  private onZone(zone: ZoneDef): void {
    void zone;
  }

  private openRepair(objectId: string): void {
    audio.play(UI_SOUNDS.open);
    this.dialog = new RepairDialog(this, this.store, objectId, () => {
      this.dialog = null;
    });
  }

  private onChange(events: GameEvent[], state: GameState): void {
    this.refresh(state);
    for (const e of events) {
      if (e.type === 'repaired') this.playRepair(e.objectId);
    }
  }

  private playRepair(objectId: string): void {
    const hotspot = this.objects.get(objectId);
    if (!hotspot) return;
    audio.play(UI_SOUNDS.repair);
    const { box } = hotspot;
    const flash = this.add.rectangle(0, 0, box.width, box.height, 0xffffff, 0.8);
    box.add(flash);
    this.tweens.add({ targets: flash, alpha: 0, duration: FEEDBACK.repairFlashMs, onComplete: () => flash.destroy() });
    this.tweens.add({ targets: box, scale: 1.08, duration: FEEDBACK.repairFlashMs / 2, yoyo: true, ease: 'Sine.easeOut' });
  }

  private refresh(state: GameState): void {
    const { content } = this.store;
    for (const object of content.objects) {
      const hotspot = this.objects.get(object.id);
      if (!hotspot) continue;
      const step = stepOf(state, object.id);
      setAsset(this, hotspot.box, object.stateImages[step] ?? object.stateImages[0] ?? '');
      const available = isObjectAvailable(state, object);
      hotspot.box.setAlpha(available ? 1 : 0.4);
      hotspot.label.setAlpha(available ? 1 : 0.5);
      if (hotspot.box.input) hotspot.box.input.enabled = available;
    }
    for (const zone of content.zones) {
      const hotspot = this.zones.get(zone.id);
      if (!hotspot) continue;
      const open = isZoneUnlocked(state, zone);
      const cleared = isZoneCleared(state, zone);
      hotspot.box.setAlpha(!open ? 0.3 : cleared ? 0.55 : 1);
      hotspot.label.setAlpha(open ? 1 : 0.4);
      if (hotspot.box.input) hotspot.box.input.enabled = open && !cleared;
    }
    const warm = content.objects.some((o) => o.steps.some((s, i) => s.effect === 'warmLight' && stepOf(state, o.id) > i));
    this.warmLight.setVisible(warm);

    for (const res of RESOURCES) this.resourceTexts.get(res)?.setText(String(state.resources[res]));

    const goal = currentGoal(state, content);
    if (!goal) {
      this.goalTitle.setText(t('ui.goal.done'));
      this.goalCost.setText('');
      return;
    }
    this.goalTitle.setText(t('ui.goal.title', { name: t(goal.object.nameKey) }));
    const check = checkRepair(state, content, goal.object.id);
    this.goalCost.setText(check.requirements.map((r) => `${requirementName(content, r)} ${Math.min(r.have, r.need)}/${r.need}`).join(' · '));
  }
}
