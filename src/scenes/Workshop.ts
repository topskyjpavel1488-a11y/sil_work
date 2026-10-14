// Main screen: the current room with object and zone hotspots, goal banner, resources, navigation
// (spec 6.2; two rooms since v0.7). The room shown is state.room.
import Phaser from 'phaser';
import { addAsset, setAsset } from '../assets';
import { audio } from '../audio';
import { config, DEPTH, FEEDBACK, PALETTE, UI_SOUNDS } from '../config';
import { findRoom, objectsIn, zonesIn, type ObjectDef, type RoomDef, type ZoneDef } from '../core/content';
import { currentGoal, isObjectAvailable, isObjectRestored, isRoomRestored, isRoomUnlocked, isZoneCleared, isZoneUnlocked } from '../core/progress';
import { missingSources, type Source } from '../core/hints';
import { checkRepair } from '../core/repair';
import { dayKey, welcomeDue } from '../core/daily';
import { session } from '../session';
import { currentTutorialStep } from '../core/tutorial';
import { stepOf, type GameEvent, type GameState, type Resource } from '../core/state';
import { t } from '../i18n';
import { depthKey, rect, type Rect } from '../layout';
import type { Ads } from '../ads';
import type { PlatformAdapter } from '../platform/adapter';
import type { Store } from '../store';
import { Button } from '../ui/Button';
import { available, requirementName, resourceName } from '../ui/labels';
import { showBeforeAfter } from '../ui/BeforeAfter';
import { showFindCard } from '../ui/FindCard';
import { RepairBadge } from '../ui/RepairBadge';
import { RepairDialog } from '../ui/RepairDialog';
import { showSettings } from '../ui/SettingsDialog';
import { playStory } from '../ui/Story';
import { TutorialOverlay } from '../ui/TutorialOverlay';
import { ResourceBar } from '../ui/ResourceBar';
import { COLORS, textStyle } from '../ui/style';
import { fadeIn, goTo } from '../ui/transition';
import { drawShelf, drawZonePile, wallShelfRects } from '../ui/ZoneArt';
import { addGlow, ambientDust, dustPuff, sparkBurst } from '../ui/fx';

// Restored objects that give off light: a soft pulsing glow over them (spec 6.3, v0.8).
const GLOWS: Record<string, number> = { lamp: 0xffc870, radio: 0xffb050, vent_window: 0xfff0c8 };
import { onTap } from '../ui/tap';

const STORY_HINT = 'story';
// The daily gift is shown as an old box from the debris art.
const GIFT_IMAGE = 'debris_box';

interface Hotspot {
  box: Phaser.GameObjects.Container;
  label: Phaser.GameObjects.Text;
}

export class WorkshopScene extends Phaser.Scene {
  private objects = new Map<string, Hotspot>();
  private zones = new Map<string, Hotspot>();
  private badges = new Map<string, RepairBadge>();
  private glows = new Map<string, Phaser.GameObjects.Image>();
  private previousKeys = new Map<string, string>();
  private resources!: ResourceBar;
  private goalTitle!: Phaser.GameObjects.Text;
  private goalCost!: Phaser.GameObjects.Text;
  private goalHint!: Phaser.GameObjects.Text;
  private warmLight!: Phaser.GameObjects.Rectangle;
  private modalOpen = false;
  private navRects: Rect[] = [];
  private tutorial!: TutorialOverlay;
  private readyReported = false;
  private room!: RoomDef;
  private section = '';
  private idleSince = 0;
  private idleFrame: Phaser.GameObjects.Graphics | null = null;
  private roomButton: Button | null = null;

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
    // Each room has its own track; other scenes (table, journal) keep playing the last room's one.
    audio.playMusic(this.room.music ?? null);
    this.objects.clear();
    this.zones.clear();
    this.badges.clear();
    this.glows.clear();
    this.previousKeys.clear();
    this.modalOpen = false;
    this.navRects = [];
    fadeIn(this);
    this.add.rectangle(0, 0, this.scale.width, this.scale.height, PALETTE.cream).setOrigin(0);
    const room = rect(this.section, 'room');
    addAsset(this, this.room.image, room);
    for (const spot of wallShelfRects(content, this.room)) drawShelf(this, spot);
    // Zones and objects are created back to front (byDepth), so nearer things cover farther ones.
    const things = [
      ...zonesIn(content, this.room.id).map((zone) => ({ name: `zone.${zone.id}`, r: rect(this.section, `zone.${zone.id}`), add: (r: Rect) => this.zones.set(zone.id, this.addHotspot(zone.image, r, zone.nameKey, () => this.onZone(zone))) })),
      ...objectsIn(content, this.room.id).map((object) => ({ name: `object.${object.id}`, r: rect(this.section, `object.${object.id}`), add: (r: Rect) => this.objects.set(object.id, this.addHotspot(object.stateImages[0] ?? '', r, object.nameKey, () => this.onObject(object))) })),
    ];
    for (const thing of things.sort((a, b) => depthKey(a.name, a.r) - depthKey(b.name, b.r))) thing.add(thing.r);
    this.warmLight = this.add.rectangle(room.x, room.y, room.w, room.h, PALETTE.copper, 0.14).setOrigin(0).setVisible(false);
    ambientDust(this, room);
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
    this.idleFrame = null;
    this.idleSince = this.time.now;
    this.input.on('pointerdown', () => this.resetIdle());
    this.time.addEvent({ delay: 1000, loop: true, callback: () => this.checkIdle() });
    if (data.repair) this.openRepair(data.repair);
    else if (!this.showStory() && !this.showRoomIntro()) this.showWelcome();

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

  // A long object name ("Шкаф для инструментов") is squeezed to fit the banner instead of running past its border.
  private setGoalTitle(text: string): void {
    const maxWidth = rect(this.section, 'ui.goal').w - 56;
    this.goalTitle.setScale(1).setText(text);
    if (this.goalTitle.width > maxWidth) this.goalTitle.setScale(maxWidth / this.goalTitle.width);
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
    // Where to get the first missing thing, when the cost fits on one line (spec 6.2, v0.8).
    this.goalHint = this.add.text(r.x + 28, r.y + 100, '', textStyle(32, COLORS.missing, { fontStyle: 'bold' }));
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
    // A restored room keeps a "before / after" button, so the comparison is not a one-time chance (spec v0.8).
    const compare = isRoomRestored(this.store.state, this.store.content, this.room.id);
    const labels = [this.roomLabel(), t('ui.nav.table'), t('ui.nav.journal')];
    if (compare) labels.push(t('ui.nav.compare'));
    // The room button is wider: a room name with an arrow is longer than "Table" or "Journal".
    const weights = compare ? [1.25, 0.7, 0.75, 0.8] : [1.4, 0.8, 0.8];
    const unit = (r.w - 16 * 4) / weights.reduce((a, b) => a + b, 0);
    const scenes = [null, 'MergeTable', 'Journal'];
    let x = r.x + 16;
    labels.forEach((label, i) => {
      const w = Math.round(unit * (weights[i] ?? 1));
      const button = { x, y: r.y + 16, w, h: r.h - 32 };
      x += w + 16;
      this.navRects.push(button);
      const created = new Button(this, {
        ...button,
        label,
        fill: i === 0 ? PALETTE.copper : i === 3 ? PALETTE.green : PALETTE.metal,
        fontSize: 32,
        onTap: () => {
          if (i === 0 && other && !this.modalOpen && !this.ads.busy) this.switchRoom(other.id);
          if (i === 3 && !this.modalOpen && !this.ads.busy) {
            this.modalOpen = true;
            showBeforeAfter(this, this.store.content, this.room, () => (this.modalOpen = false));
          }
          const scene = scenes[i];
          if (!scene || this.modalOpen || this.ads.busy) return;
          // Opening the table from the main screen is an ad moment (spec 8.3).
          if (scene === 'MergeTable') {
            this.input.enabled = false;
            void this.ads.interstitial().then(() => goTo(this, scene));
          } else goTo(this, scene);
        },
      });
      if (i === 0) this.roomButton = created;
    });
  }

  // The room button names a room and how many of its things are restored, e.g. "→ Малярная 3/8" on two lines (spec v0.8).
  private roomLabel(): string {
    const { state, content } = this.store;
    const other = this.otherRoom();
    const room = other ?? this.room;
    const objects = objectsIn(content, room.id);
    const done = objects.filter((o) => isObjectRestored(state, o)).length;
    return `${other ? '→ ' : ''}${t(room.nameKey)}\n${done}/${objects.length}`;
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
    playStory(this, content, 'ui.start', () => {
      this.store.markHint(STORY_HINT);
      this.modalOpen = false;
    });
    return true;
  }

  // The first visit to a room may explain what is new there, once.
  private showRoomIntro(): boolean {
    const intro = this.room.intro;
    const hint = `intro_${this.room.id}`;
    if (!intro || this.store.state.hints.includes(hint)) return false;
    this.modalOpen = true;
    this.store.markHint(hint);
    showFindCard(this, intro, () => (this.modalOpen = false));
    return true;
  }

  // Once per visit after the tutorial: today's gift and, after a long break, what the player was doing (spec v0.8).
  private showWelcome(): void {
    const { content } = this.store;
    if (session.welcomed || !this.store.state.tutorial.done) return;
    session.welcomed = true;
    const gift = this.store.claimGift(dayKey(new Date()));
    const giftParts = (Object.entries(gift) as [Resource, number][]).map(([r, n]) => `+${n} ${resourceName(content, r)}`);
    const goal = currentGoal(this.store.state, content);
    const back = welcomeDue(session.lastSeen, Date.now()) && goal !== null;
    if (giftParts.length === 0 && !back) return;
    const lines: string[] = [];
    if (giftParts.length > 0) lines.push(t('ui.welcome.gift', { gift: giftParts.join(', ') }));
    if (back && goal) {
      const check = checkRepair(this.store.state, content, goal.object.id);
      lines.push(t('ui.welcome.goal', { name: t(goal.object.nameKey) }));
      lines.push(check.requirements.map((r) => `${requirementName(content, r)} ${Math.min(available(r), r.need)}/${r.need}`).join(' · '));
    }
    const objectImage = goal ? (goal.object.stateImages[stepOf(this.store.state, goal.object.id)] ?? '') : '';
    this.modalOpen = true;
    showFindCard(
      this,
      { image: giftParts.length > 0 ? GIFT_IMAGE : objectImage, titleKey: 'ui.welcome.title', textKey: '', text: lines.join('\n'), sound: giftParts.length > 0 ? UI_SOUNDS.repair : undefined },
      () => (this.modalOpen = false),
    );
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
    new RepairDialog(
      this,
      this.store,
      objectId,
      () => {
        this.modalOpen = false;
      },
      (source) => this.goToSource(source),
    );
  }

  // Leads to where a missing thing can be found: the zone itself, the table, or the zone's room.
  private goToSource(source: Source): void {
    if (source.kind === 'merge') {
      this.input.enabled = false;
      void this.ads.interstitial().then(() => goTo(this, 'MergeTable'));
    } else if (source.kind === 'zone') {
      if (source.zone.room === this.room.id) goTo(this, 'Scavenge', { zoneId: source.zone.id });
      else this.switchRoom(source.zone.room);
    }
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

  private resetIdle(): void {
    this.idleSince = this.time.now;
    this.idleFrame?.destroy();
    this.idleFrame = null;
  }

  // After a pause, frame what helps next: a repair that can be done, else where the goal's missing part is.
  private checkIdle(): void {
    if (this.idleFrame || this.modalOpen || this.ads.busy || this.time.now - this.idleSince < config.idleHintMs) return;
    const { state, content } = this.store;
    if (currentTutorialStep(state, content.tutorial)) return;
    const target = this.idleTarget();
    if (!target) return;
    const pad = 6;
    const frame = this.add.graphics().setDepth(DEPTH.tutorial - 10);
    frame.lineStyle(6, PALETTE.green, 1);
    frame.strokeRoundedRect(target.x - pad, target.y - pad, target.w + pad * 2, target.h + pad * 2, 20);
    this.tweens.add({ targets: frame, alpha: 0.25, duration: 700, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    this.idleFrame = frame;
  }

  private idleTarget(): Rect | null {
    const { state, content } = this.store;
    const ready = objectsIn(content, this.room.id).find((o) => checkRepair(state, content, o.id).ok);
    if (ready) return rect(this.section, `object.${ready.id}`);
    const goal = currentGoal(state, content);
    if (!goal) return null;
    if (goal.object.room !== this.room.id) return this.navRects[0] ?? null;
    const source = missingSources(state, content, goal.object.id, this.room.id)[0]?.source;
    if (source?.kind === 'merge') return this.navRects[1] ?? null;
    if (source?.kind === 'zone') return source.zone.room === this.room.id ? rect(this.section, `zone.${source.zone.id}`) : (this.navRects[0] ?? null);
    return rect(this.section, `object.${goal.object.id}`);
  }

  private playRepair(objectId: string): void {
    const hotspot = this.objects.get(objectId);
    if (!hotspot) return;
    audio.play(UI_SOUNDS.repair);
    const { box } = hotspot;
    const old = this.previousKeys.get(objectId) ?? '';
    if (this.textures.exists(old)) {
      // The old look fades away over the new one.
      const before = this.add.image(0, 0, old);
      before.setScale(Math.min(box.width / before.width, box.height / before.height));
      box.add(before);
      this.tweens.add({ targets: before, alpha: 0, duration: FEEDBACK.repairFlashMs * 1.6, ease: 'Sine.easeIn', onComplete: () => before.destroy() });
    } else {
      const flash = this.add.rectangle(0, 0, box.width, box.height, 0xffffff, 0.8);
      box.add(flash);
      this.tweens.add({ targets: flash, alpha: 0, duration: FEEDBACK.repairFlashMs, onComplete: () => flash.destroy() });
    }
    dustPuff(this, box.x, box.y + box.height / 2 - 8, box.width);
    sparkBurst(this, box.x, box.y - box.height / 4);
    this.tweens.add({ targets: box, scale: 1.08, duration: FEEDBACK.repairFlashMs / 2, yoyo: true, ease: 'Sine.easeOut' });
  }

  private refresh(state: GameState): void {
    const { content } = this.store;
    for (const object of objectsIn(content, this.room.id)) {
      const hotspot = this.objects.get(object.id);
      if (!hotspot) continue;
      const step = stepOf(state, object.id);
      const key = object.stateImages[step] ?? object.stateImages[0] ?? '';
      // Remember what was shown so a repair can fade from the old look to the new one.
      if (hotspot.box.getData('key') !== key) {
        this.previousKeys.set(object.id, hotspot.box.getData('key') ?? '');
        setAsset(this, hotspot.box, key);
        hotspot.box.setData('key', key);
      }
      const glowColor = GLOWS[object.id];
      if (glowColor !== undefined && isObjectRestored(state, object) && !this.glows.has(object.id)) {
        const r = rect(this.section, `object.${object.id}`);
        this.glows.set(object.id, addGlow(this, r.x + r.w / 2, r.y + r.h / 2, Math.max(r.w, r.h) * 0.45, glowColor));
      }
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
    this.roomButton?.setLabel(this.roomLabel());
    this.updateTutorial(state);

    const goal = currentGoal(state, content);
    if (!goal) {
      this.setGoalTitle(t('ui.goal.done'));
      this.goalCost.setText('');
      this.goalHint.setText('');
      return;
    }
    this.setGoalTitle(t('ui.goal.title', { name: t(goal.object.nameKey) }));
    const check = checkRepair(state, content, goal.object.id);
    this.goalCost.setText(check.requirements.map((r) => `${requirementName(content, r)} ${Math.min(available(r), r.need)}/${r.need}`).join(' · '));
    const first = missingSources(state, content, goal.object.id, this.room.id)[0];
    const oneLine = this.goalCost.height < 50;
    let hint = '';
    if (first && oneLine && first.source.kind === 'zone') hint = t('ui.hint.goalZone', { what: requirementName(content, first.req), zone: t(first.source.zone.nameKey) });
    if (first && oneLine && first.source.kind === 'merge') hint = t('ui.hint.goalMerge');
    this.goalHint.setText(hint);
    // Long hints are shortened rather than spilling out of the banner.
    const maxW = rect(this.section, 'ui.goal').w - 56;
    while (this.goalHint.width > maxW && hint.length > 4) {
      hint = hint.slice(0, -2);
      this.goalHint.setText(`${hint.trimEnd()}…`);
    }
  }
}
