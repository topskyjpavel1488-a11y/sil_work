// Main screen: the room with object and zone hotspots, goal banner, resources, navigation (spec 6.2).
import Phaser from 'phaser';
import { addAsset, setAsset } from '../assets';
import { audio } from '../audio';
import { FEEDBACK, PALETTE, UI_IMAGES, UI_SOUNDS } from '../config';
import type { ObjectDef, ZoneDef } from '../core/content';
import { currentGoal, isObjectAvailable, isObjectRestored, isZoneCleared, isZoneUnlocked } from '../core/progress';
import { checkRepair } from '../core/repair';
import { currentTutorialStep } from '../core/tutorial';
import { stepOf, type GameEvent, type GameState } from '../core/state';
import { t } from '../i18n';
import { rect, type Rect } from '../layout';
import type { Ads } from '../ads';
import type { PlatformAdapter } from '../platform/adapter';
import type { Store } from '../store';
import { Button } from '../ui/Button';
import { available, requirementName } from '../ui/labels';
import { showFindCard } from '../ui/FindCard';
import { RepairDialog } from '../ui/RepairDialog';
import { showSettings } from '../ui/SettingsDialog';
import { TutorialOverlay } from '../ui/TutorialOverlay';
import { ResourceBar } from '../ui/ResourceBar';
import { COLORS, textStyle } from '../ui/style';
import { fadeIn, goTo } from '../ui/transition';
import { onTap } from '../ui/tap';

const SECTION = 'workshop';

interface Hotspot {
  box: Phaser.GameObjects.Container;
  label: Phaser.GameObjects.Text;
}

export class WorkshopScene extends Phaser.Scene {
  private objects = new Map<string, Hotspot>();
  private zones = new Map<string, Hotspot>();
  private resources!: ResourceBar;
  private goalTitle!: Phaser.GameObjects.Text;
  private goalCost!: Phaser.GameObjects.Text;
  private warmLight!: Phaser.GameObjects.Rectangle;
  private modalOpen = false;
  private navRects: Rect[] = [];
  private tutorial!: TutorialOverlay;
  private readyReported = false;

  constructor(
    private readonly store: Store,
    private readonly platform: PlatformAdapter,
    private readonly ads: Ads,
  ) {
    super('Workshop');
  }

  create(): void {
    this.objects.clear();
    this.zones.clear();
    this.modalOpen = false;
    this.navRects = [];
    fadeIn(this);
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
    this.tutorial = new TutorialOverlay(this, this.store, rect(SECTION, 'ui.tutorial'));
    this.refresh(this.store.state);

    if (!this.readyReported) {
      this.readyReported = true;
      this.platform.gameReady();
      this.platform.gameplayStart();
    }
  }

  private addHotspot(imageKey: string, r: Rect, nameKey: string, action: () => void): Hotspot {
    const box = addAsset(this, imageKey, r);
    const label = this.add
      .text(r.x + r.w / 2, r.y + r.h / 2, t(nameKey), textStyle(32, COLORS.text, { align: 'center', wordWrap: { width: Math.max(r.w - 8, 96) } }))
      .setOrigin(0.5);
    box.setInteractive({ useHandCursor: true });
    box.on('pointerdown', () => this.tweens.add({ targets: box, scale: 0.96, duration: FEEDBACK.tapMs / 2, yoyo: true }));
    onTap(box, () => {
      if (this.modalOpen) return;
      audio.play(UI_SOUNDS.tap);
      action();
    });
    return { box, label };
  }

  private createResourceBar(): void {
    this.resources = new ResourceBar(this, this.store.content, rect(SECTION, 'ui.resources'));
    const s = rect(SECTION, 'ui.settings');
    new Button(this, {
      ...s,
      label: '⚙',
      fill: PALETTE.dust,
      textColor: COLORS.text,
      fontSize: 44,
      onTap: () => {
        if (this.modalOpen) return;
        this.modalOpen = true;
        showSettings(this, this.store, this.platform, () => (this.modalOpen = false));
      },
    });
  }

  private createGoalBanner(): void {
    const r = rect(SECTION, 'ui.goal');
    const bg = this.add.graphics();
    bg.fillStyle(PALETTE.cream, 1);
    bg.fillRoundedRect(r.x, r.y, r.w, r.h, 24);
    bg.lineStyle(4, PALETTE.wood, 1);
    bg.strokeRoundedRect(r.x, r.y, r.w, r.h, 24);
    this.goalTitle = this.add.text(r.x + 28, r.y + 12, '', textStyle(38, COLORS.text, { fontStyle: 'bold' }));
    // The cost may take two lines when it lists several requirements.
    this.goalCost = this.add.text(r.x + 28, r.y + 62, '', textStyle(32, COLORS.text, { wordWrap: { width: r.w - 56 }, lineSpacing: -4 }));
    const hit = this.add.zone(r.x, r.y, r.w, r.h).setOrigin(0).setInteractive({ useHandCursor: true });
    onTap(hit, () => {
      const goal = currentGoal(this.store.state, this.store.content);
      if (goal && !this.modalOpen) {
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
    const scenes = [null, 'MergeTable', 'Journal'];
    keys.forEach((key, i) => {
      const button = { x: r.x + 16 + i * (w + 16), y: r.y + 16, w, h: r.h - 32 };
      this.navRects.push(button);
      new Button(this, {
        ...button,
        label: t(key),
        fill: i === 0 ? PALETTE.copper : PALETTE.metal,
        fontSize: 32,
        onTap: () => {
          const scene = scenes[i];
          if (!scene || this.modalOpen || this.ads.busy) return;
          // Opening the table from the main screen is an ad moment (spec 8.3).
          if (scene === 'MergeTable') {
            this.input.enabled = false;
            void this.ads.interstitial().then(() => goTo(this, scene));
          } else goTo(this, scene);
        },
      });
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

  private onZone(zone: ZoneDef): void {
    const state = this.store.state;
    if (!isZoneUnlocked(state, zone) || isZoneCleared(state, zone)) return;
    goTo(this, 'Scavenge', { zoneId: zone.id });
  }

  private openRepair(objectId: string): void {
    audio.play(UI_SOUNDS.open);
    this.modalOpen = true;
    new RepairDialog(this, this.store, objectId, () => {
      this.modalOpen = false;
    });
  }

  private onChange(events: GameEvent[], state: GameState): void {
    if (events.some((e) => e.type === 'reset')) {
      this.scene.restart();
      return;
    }
    this.refresh(state);
    for (const e of events) {
      if (e.type === 'repaired') this.playRepair(e.objectId);
    }
    // After the repair animation: the find card, then the finale once everything is restored.
    const find = events.find((e) => e.type === 'findOpened');
    const finished = events.some((e) => e.type === 'finished');
    if (!find && !finished) return;
    this.modalOpen = true;
    this.time.delayedCall(FEEDBACK.repairFlashMs + 200, () => {
      const toFinale = () => (finished ? goTo(this, 'Finale') : (this.modalOpen = false));
      const def = find?.type === 'findOpened' ? this.store.content.finds.find((f) => f.id === find.findId) : undefined;
      // Closing a find card is the natural pause for an ad (spec 4.5, 8.3).
      if (def) showFindCard(this, def, () => void this.ads.interstitial().then(toFinale));
      else toFinale();
    });
  }

  private updateTutorial(state: GameState): void {
    const step = currentTutorialStep(state, this.store.content.tutorial);
    if (!step) return this.tutorial.show(null, []);
    const { type, id } = step.target;
    const targets: Rect[] = [];
    if (type === 'zone' || type === 'debris') targets.push(rect(SECTION, `zone.${id}`));
    if (type === 'object') targets.push(rect(SECTION, `object.${id}`));
    const table = this.navRects[1];
    if ((type === 'nav' || type === 'mergePair') && table) targets.push(table);
    this.tutorial.show(step, targets);
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
      const key = object.stateImages[step] ?? object.stateImages[0] ?? '';
      setAsset(this, hotspot.box, key);
      // Names are written only on placeholders; real art speaks for itself.
      hotspot.label.setVisible(!this.textures.exists(key));
      const unlocked = isObjectAvailable(state, object);
      hotspot.box.setAlpha(unlocked ? 1 : 0.4);
      hotspot.label.setAlpha(unlocked ? 1 : 0.5);
      if (hotspot.box.input) hotspot.box.input.enabled = unlocked;
    }
    for (const zone of content.zones) {
      const hotspot = this.zones.get(zone.id);
      if (!hotspot) continue;
      const open = isZoneUnlocked(state, zone);
      const cleared = isZoneCleared(state, zone);
      hotspot.box.setAlpha(!open ? 0.3 : cleared ? 0.45 : 1);
      hotspot.label.setAlpha(open ? 1 : 0.4);
      const name = this.textures.exists(zone.image) ? '' : t(zone.nameKey);
      hotspot.label.setText(cleared ? `${name} ✓`.trim() : name);
      if (hotspot.box.input) hotspot.box.input.enabled = open && !cleared;
    }
    const warm = content.objects.some((o) => o.steps.some((s, i) => s.effect === 'warmLight' && stepOf(state, o.id) > i));
    this.warmLight.setVisible(warm);

    this.resources.update(state);
    this.updateTutorial(state);

    const goal = currentGoal(state, content);
    if (!goal) {
      this.goalTitle.setText(t('ui.goal.done'));
      this.goalCost.setText('');
      return;
    }
    this.goalTitle.setText(t('ui.goal.title', { name: t(goal.object.nameKey) }));
    const check = checkRepair(state, content, goal.object.id);
    this.goalCost.setText(check.requirements.map((r) => `${requirementName(content, r)} ${Math.min(available(r), r.need)}/${r.need}`).join(' · '));
  }
}
