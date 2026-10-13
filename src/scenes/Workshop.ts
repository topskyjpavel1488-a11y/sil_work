// Main screen: the current room with object and zone hotspots, goal banner, resources, navigation
// (spec 6.2; two rooms since v0.7). The room shown is state.room.
import Phaser from 'phaser';
import { addAsset, setAsset } from '../assets';
import { audio } from '../audio';
import { FEEDBACK, PALETTE, UI_SOUNDS } from '../config';
import { findRoom, objectsIn, zonesIn, type ObjectDef, type RoomDef, type ZoneDef } from '../core/content';
import { currentGoal, isObjectAvailable, isObjectRestored, isRoomUnlocked, isZoneCleared, isZoneUnlocked } from '../core/progress';
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
import { RepairBadge } from '../ui/RepairBadge';
import { RepairDialog } from '../ui/RepairDialog';
import { showSettings } from '../ui/SettingsDialog';
import { TutorialOverlay } from '../ui/TutorialOverlay';
import { ResourceBar } from '../ui/ResourceBar';
import { COLORS, textStyle } from '../ui/style';
import { fadeIn, goTo } from '../ui/transition';
import { drawZonePile } from '../ui/ZoneArt';
import { onTap } from '../ui/tap';

const STORY_HINT = 'story';

interface Hotspot {
  box: Phaser.GameObjects.Container;
  label: Phaser.GameObjects.Text;
}

export class WorkshopScene extends Phaser.Scene {
  private objects = new Map<string, Hotspot>();
  private zones = new Map<string, Hotspot>();
  private badges = new Map<string, RepairBadge>();
  private resources!: ResourceBar;
  private goalTitle!: Phaser.GameObjects.Text;
  private goalCost!: Phaser.GameObjects.Text;
  private warmLight!: Phaser.GameObjects.Rectangle;
  private modalOpen = false;
  private navRects: Rect[] = [];
  private tutorial!: TutorialOverlay;
  private readyReported = false;
  private room!: RoomDef;
  private section = '';

  constructor(
    private readonly store: Store,
    private readonly platform: PlatformAdapter,
    private readonly ads: Ads,
  ) {
    super('Workshop');
  }

  // data.repair: open this object's repair window right away (the goal banner pointed to another room).
  create(data: { repair?: string } = {}): void {
    const { content } = this.store;
    this.room = findRoom(content, this.store.state.room) ?? (content.rooms[0] as RoomDef);
    this.section = this.room.layout;
    this.objects.clear();
    this.zones.clear();
    this.badges.clear();
    this.modalOpen = false;
    this.navRects = [];
    fadeIn(this);
    this.add.rectangle(0, 0, this.scale.width, this.scale.height, PALETTE.cream).setOrigin(0);
    const room = rect(this.section, 'room');
    addAsset(this, this.room.image, room);
    for (const zone of zonesIn(content, this.room.id)) {
      this.zones.set(zone.id, this.addHotspot(zone.image, rect(this.section, `zone.${zone.id}`), zone.nameKey, () => this.onZone(zone)));
    }
    for (const object of objectsIn(content, this.room.id)) {
      this.objects.set(object.id, this.addHotspot(object.stateImages[0] ?? '', rect(this.section, `object.${object.id}`), object.nameKey, () => this.onObject(object)));
    }
    this.warmLight = this.add.rectangle(room.x, room.y, room.w, room.h, PALETTE.copper, 0.14).setOrigin(0).setVisible(false);
    // Badges go above every object and the warm light, so none of them is hidden by a neighbour.
    for (const object of objectsIn(content, this.room.id)) {
      this.badges.set(object.id, new RepairBadge(this, rect(this.section, `object.${object.id}`)));
    }

    this.createResourceBar();
    this.createGoalBanner();
    this.createNav();
    if (import.meta.env.DEV) void import('../dev').then((dev) => dev.addDevButton(this, this.store));

    const unsubscribe = this.store.subscribe((events, state) => this.onChange(events, state));
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, unsubscribe);
    this.tutorial = new TutorialOverlay(this, this.store, rect(this.section, 'ui.tutorial'));
    this.refresh(this.store.state);
    if (data.repair) this.openRepair(data.repair);
    else if (!this.showStory()) this.showRoomIntro();

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
    this.resources = new ResourceBar(this, this.store.content, rect(this.section, 'ui.resources'));
    const s = rect(this.section, 'ui.settings');
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
    const r = rect(this.section, 'ui.goal');
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
      if (!goal || this.modalOpen) return;
      audio.play(UI_SOUNDS.tap);
      if (goal.object.room === this.room.id) this.openRepair(goal.object.id);
      else this.switchRoom(goal.object.room, goal.object.id);
    });
  }

  private createNav(): void {
    const r = rect(this.section, 'ui.nav');
    this.add.rectangle(r.x, r.y, r.w, r.h, PALETTE.wood).setOrigin(0);
    // The first button names the room; once another room is open it leads there.
    const other = this.otherRoom();
    const labels = [other ? `→ ${t(other.nameKey)}` : t(this.room.nameKey), t('ui.nav.table'), t('ui.nav.journal')];
    // The room button is wider: a room name with an arrow is longer than "Table" or "Journal".
    const weights = [1.4, 0.8, 0.8];
    const unit = (r.w - 16 * 4) / weights.reduce((a, b) => a + b, 0);
    const scenes = [null, 'MergeTable', 'Journal'];
    let x = r.x + 16;
    labels.forEach((label, i) => {
      const w = Math.round(unit * (weights[i] ?? 1));
      const button = { x, y: r.y + 16, w, h: r.h - 32 };
      x += w + 16;
      this.navRects.push(button);
      new Button(this, {
        ...button,
        label,
        fill: i === 0 ? PALETTE.copper : PALETTE.metal,
        fontSize: 32,
        onTap: () => {
          if (i === 0 && other && !this.modalOpen && !this.ads.busy) this.switchRoom(other.id);
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

  // The other open room, if any (two rooms since v0.7).
  private otherRoom(): RoomDef | undefined {
    return this.store.content.rooms.find((r) => r.id !== this.room.id && isRoomUnlocked(this.store.state, this.store.content, r));
  }

  private switchRoom(roomId: string, repair?: string): void {
    this.store.setRoom(roomId);
    goTo(this, 'Workshop', repair ? { repair } : undefined);
  }

  // Opening story: once, only in a brand-new game (an old save that already played skips it).
  private showStory(): boolean {
    const { state, content } = this.store;
    const fresh = !state.tutorial.done && state.tutorial.step === 0 && Object.values(state.objects).every((o) => o.step === 0);
    if (!fresh || state.hints.includes(STORY_HINT) || content.story.length === 0) return false;
    this.modalOpen = true;
    const finish = () => {
      this.store.markHint(STORY_HINT);
      this.modalOpen = false;
    };
    const show = (i: number) => {
      const card = content.story[i];
      if (!card) return finish();
      const last = i === content.story.length - 1;
      showFindCard(
        this,
        { ...card, buttonKey: last ? 'ui.start' : 'ui.next', secondary: last ? undefined : { labelKey: 'tutorial.skip', onTap: finish } },
        () => show(i + 1),
      );
    };
    show(0);
    return true;
  }

  // The first visit to a room may explain what is new there, once.
  private showRoomIntro(): void {
    const intro = this.room.intro;
    const hint = `intro_${this.room.id}`;
    if (!intro || this.store.state.hints.includes(hint)) return;
    this.modalOpen = true;
    this.store.markHint(hint);
    showFindCard(this, intro, () => (this.modalOpen = false));
  }

  private onObject(object: ObjectDef): void {
    const state = this.store.state;
    if (!isObjectAvailable(state, this.store.content, object)) return;
    const hotspot = this.objects.get(object.id);
    if (isObjectRestored(state, object)) {
      if (hotspot) this.tweens.add({ targets: hotspot.box, scale: 1.06, duration: FEEDBACK.tapMs, yoyo: true });
      return;
    }
    this.openRepair(object.id);
  }

  private onZone(zone: ZoneDef): void {
    const state = this.store.state;
    if (!isZoneUnlocked(state, this.store.content, zone) || isZoneCleared(state, zone)) return;
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
    // After the repair animation: the find card, then the room's finale once the room is restored.
    const find = events.find((e) => e.type === 'findOpened');
    const restored = events.find((e) => e.type === 'roomRestored');
    if (!find && !restored) return;
    this.modalOpen = true;
    this.time.delayedCall(FEEDBACK.repairFlashMs + 200, () => {
      const toFinale = () =>
        restored?.type === 'roomRestored' ? goTo(this, 'Finale', { roomId: restored.roomId }) : (this.modalOpen = false);
      const def = find?.type === 'findOpened' ? this.store.content.finds.find((f) => f.id === find.findId) : undefined;
      // Closing a find card is the natural pause for an ad (spec 4.5, 8.3).
      if (def) showFindCard(this, def, () => void this.ads.interstitial().then(toFinale));
      else toFinale();
    });
  }

  private updateTutorial(state: GameState): void {
    const step = currentTutorialStep(state, this.store.content.tutorial);
    // The tutorial lives in the first room.
    if (!step || this.room.id !== this.store.content.rooms[0]?.id) return this.tutorial.show(null, []);
    const { type, id } = step.target;
    const targets: Rect[] = [];
    if (type === 'zone' || type === 'debris') targets.push(rect(this.section, `zone.${id}`));
    if (type === 'object') targets.push(rect(this.section, `object.${id}`));
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
    for (const object of objectsIn(content, this.room.id)) {
      const hotspot = this.objects.get(object.id);
      if (!hotspot) continue;
      const step = stepOf(state, object.id);
      const key = object.stateImages[step] ?? object.stateImages[0] ?? '';
      setAsset(this, hotspot.box, key);
      // Names are written only on placeholders; real art speaks for itself.
      hotspot.label.setVisible(!this.textures.exists(key));
      const unlocked = isObjectAvailable(state, content, object);
      hotspot.box.setAlpha(unlocked ? 1 : 0.4);
      hotspot.label.setAlpha(unlocked ? 1 : 0.5);
      if (hotspot.box.input) hotspot.box.input.enabled = unlocked;
      const restored = isObjectRestored(state, object);
      this.badges.get(object.id)?.set(
        unlocked && !restored
          ? { kind: 'todo', done: step, total: object.steps.length, ready: checkRepair(state, content, object.id).ok }
          : { kind: 'hidden' },
      );
    }
    for (const zone of zonesIn(content, this.room.id)) {
      const hotspot = this.zones.get(zone.id);
      if (!hotspot) continue;
      const open = isZoneUnlocked(state, content, zone);
      // A cleared pile is gone from the room: nothing is left to tap there (spec 4.2, v0.8).
      const cleared = isZoneCleared(state, zone);
      // The pile is stacked from the debris still lying there, so it shrinks as the zone is cleared.
      const art = cleared ? true : drawZonePile(this, hotspot.box, content, zone, state.zones[zone.id]?.taken ?? []);
      hotspot.box.setVisible(!cleared).setAlpha(open ? 1 : 0.45);
      hotspot.label.setVisible(!cleared && !art).setAlpha(open ? 1 : 0.4);
      if (hotspot.box.input) hotspot.box.input.enabled = open && !cleared;
    }
    const warm = objectsIn(content, this.room.id).some((o) => o.steps.some((s, i) => s.effect === 'warmLight' && stepOf(state, o.id) > i));
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
