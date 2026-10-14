// Development-only: store media in the ?shot mode (add &lang=en for English). Run from the browser console:
//   (await import('/src/dev-video.ts')).shots()   — 7 screenshots → assets/store/screenshots[_en]/
//   (await import('/src/dev-video.ts')).record()  — video frames → assets/store/.frames/, then `npm run video [en]`
//   (await import('/src/dev-video.ts')).recordAd(1 | 2) — ad frames → assets/store/.frames/ad<n>_<lang>/, then `npm run ads [en]`
// The game loop is stopped and stepped by hand, so every animation is captured smoothly however slow the
// browser is; files go to the dev server (vite.config.ts).
import Phaser from 'phaser';
import { dayKey } from './core/daily';
import type { CellRef, GameState, ItemRef } from './core/state';
import { t } from './i18n';
import { session } from './session';
import type { Store } from './store';
import { goTo } from './ui/transition';

const FPS = 30;
const W = 720;
const H = 1280;

interface Tm {
  store: Store;
  game: Phaser.Game;
}

type AnyScene = Phaser.Scene & Record<string, unknown>;
type Stage = 'early' | 'workshop' | 'paint' | 'restored' | 'complete';

const lang = () => (new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'ru');

function rig() {
  const { store, game } = (window as unknown as { __tm: Tm }).__tm;
  const content = store.content;
  game.loop.stop();
  // No welcome-back card in the pictures.
  session.welcomed = true;
  let time = performance.now();

  const step = () => {
    time += 1000 / FPS;
    // A hidden browser tab pauses the game (spec 2.1); recording keeps it running without restarting the loop.
    game.isPaused = false;
    game.step(time, 1000 / FPS);
  };
  const active = () => game.scene.getScenes(true)[0] as AnyScene;
  const start = (key: string, data: object = {}) => {
    for (const s of game.scene.getScenes(true)) game.scene.stop(s.scene.key);
    game.scene.start(key, data);
  };
  const setState = (edit: (n: GameState) => void) => {
    const n = structuredClone(store.state);
    edit(n);
    store.commit({ state: n, events: [] });
  };
  const takeAll = (n: GameState, id: string, count = 99) =>
    (n.zones[id] = { taken: (content.zones.find((z) => z.id === id)?.debris ?? []).slice(0, count).map((d) => d.id) });

  // The same believable saves for screenshots and the video.
  const f = (chain: ItemRef['chain'], level: ItemRef['level']): ItemRef => ({ chain, level });
  const stage = (kind: Stage) =>
    setState((n) => {
      n.tutorial = { done: true, step: 99 };
      n.hints = ['story', 'intro_paint', 'review'];
      n.giftDay = dayKey(new Date());
      n.settings.largeText = false;
      for (const o of content.objects) n.objects[o.id] = { step: 0 };
      for (const z of content.zones) n.zones[z.id] = { taken: [] };
      n.board = [f('fasteners', 1), f('fasteners', 1), f('fasteners', 4), f('paints', 1), f('paints', 1), f('fasteners', 3), f('fasteners', 4), null, f('fasteners', 2), f('paints', 3), null, f('fasteners', 4), f('paints', 2), null, f('fasteners', 2), f('paints', 1), null, null, f('fasteners', 2), null, f('paints', 4), null, null, f('fasteners', 1), null];
      n.box = [f('paints', 1), f('fasteners', 2), null, null, null, null];
      if (kind === 'early') {
        // Nothing repaired yet, everything needed at hand: repair after repair for an ad.
        takeAll(n, 'door', 9);
        n.resources = { wood: 40, metal: 40, parts: 40 };
        n.board = [...Array(10).fill(f('fasteners', 4)), ...Array(8).fill(f('fasteners', 3)), ...Array(5).fill(f('fasteners', 2)), null, null];
        n.room = 'workshop';
        return;
      }
      if (kind === 'workshop') {
        Object.assign(n.objects, { workbench: { step: 3 }, fastener_box: { step: 1 }, lamp: { step: 2 }, window: { step: 2 }, cabinet: { step: 2 }, radio: { step: 1 } });
        takeAll(n, 'door');
        takeAll(n, 'under_workbench');
        takeAll(n, 'window_shelves', 6);
        takeAll(n, 'corner_crates', 5);
        n.resources = { wood: 6, metal: 4, parts: 7 };
        n.finds = ['f_photo', 'f_screws', 'f_note'];
        n.room = 'workshop';
        return;
      }
      for (const o of content.objects.filter((x) => x.room === 'workshop')) n.objects[o.id] = { step: o.steps.length };
      for (const z of content.zones.filter((x) => x.room === 'workshop')) takeAll(n, z.id);
      Object.assign(n.objects, { paint_table: { step: 3 }, drying_rack: { step: 2 }, paint_rack: { step: 2 }, vent_window: { step: 1 }, easel: { step: 1 } });
      takeAll(n, 'cans_entrance');
      takeAll(n, 'under_paint_table', 7);
      takeAll(n, 'drying_corner', 4);
      n.resources = { wood: 5, metal: 3, parts: 4 };
      n.finds = ['f_photo', 'f_screws', 'f_note', 'f_radio', 'f_clock', 'f_sign', 'f_palette'];
      n.room = kind === 'paint' ? 'paint' : 'workshop';
      if (kind === 'complete') {
        for (const o of content.objects) n.objects[o.id] = { step: o.steps.length };
        for (const z of content.zones) takeAll(n, z.id);
      }
    });

  const restart = () => game.loop.start(game.step.bind(game));
  return { store, game, content, step, active, start, stage, setState, restart };
}

// A button anywhere in the scene, including inside a dialog container.
function findButton(scene: Phaser.Scene, label: string): Phaser.GameObjects.Container | undefined {
  const search = (list: Phaser.GameObjects.GameObject[]): Phaser.GameObjects.Container | undefined => {
    for (const o of list) {
      if (!(o instanceof Phaser.GameObjects.Container)) continue;
      if (o.list.some((c) => c instanceof Phaser.GameObjects.Text && c.text === label)) return o;
      const inner = search(o.list);
      if (inner) return inner;
    }
    return undefined;
  };
  return search(scene.children.list);
}

// The seven store screenshots, full canvas size (1080×1920 in the ?shot mode).
export async function shots(): Promise<string> {
  const r = rig();
  const settle = () => {
    for (let k = 0; k < 40; k++) r.step();
  };
  const save = async (name: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = r.game.canvas.width;
    canvas.height = r.game.canvas.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    r.step();
    ctx.fillStyle = '#f3e9d2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(r.game.canvas, 0, 0);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    await fetch(`/__shot?set=${lang()}&name=${name}`, { method: 'POST', body: blob });
  };
  const scene = async (kind: Stage, key: string, data: object, name: string, extra?: () => void | Promise<void>) => {
    r.stage(kind);
    r.start(key, data);
    settle();
    if (extra) {
      await extra();
      settle();
      for (let k = 0; k < 40; k++) r.step();
    }
    await save(name);
  };
  await scene('workshop', 'Workshop', {}, '01_workshop');
  await scene('workshop', 'Scavenge', { zoneId: 'behind_cabinet' }, '02_scavenge');
  await scene('workshop', 'MergeTable', {}, '03_table');
  await scene('workshop', 'Workshop', { repair: 'cabinet' }, '04_repair');
  await scene('paint', 'Workshop', {}, '05_paint');
  await scene('restored', 'Workshop', {}, '06_find', async () => {
    const { showFindCard } = await import('./ui/FindCard');
    const card = r.content.finds.find((x) => x.id === 'f_radio');
    if (card) showFindCard(r.active(), { ...card, sound: undefined }, () => undefined);
  });
  await scene('restored', 'Workshop', {}, '07_before_after', async () => {
    const { showBeforeAfter } = await import('./ui/BeforeAfter');
    showBeforeAfter(r.active(), r.content, r.content.rooms[0] as never, () => undefined);
  });
  r.restart();
  return `7 screenshots (${lang()})`;
}

// Frame-by-frame capture into assets/store/.frames/ (sub: a separate folder for an ad) plus touch rings.
function recorder(r: ReturnType<typeof rig>, sub = '1') {
  const capture = document.createElement('canvas');
  capture.width = W;
  capture.height = H;
  const ctx = capture.getContext('2d', { willReadFrequently: true });
  let index = 0;
  let last: Blob | null = null;

  const frames = async (count: number) => {
    if (!ctx) return;
    for (let k = 0; k < count; k++) {
      r.step();
      // Read the WebGL canvas right after the render, before the browser clears it.
      ctx.fillStyle = '#f3e9d2';
      ctx.fillRect(0, 0, W, H);
      ctx.drawImage(r.game.canvas, 0, 0, W, H);
      // The first render of a new scene can come out empty: repeat the previous frame instead of a flash.
      const empty = [ctx.getImageData(W / 2, H * 0.55, 1, 1), ctx.getImageData(W * 0.2, H * 0.8, 1, 1)].every(({ data }) => data[0] === 0xf3 && data[1] === 0xe9 && data[2] === 0xd2);
      const blob = empty && last ? last : await new Promise<Blob | null>((resolve) => capture.toBlob(resolve, 'image/jpeg', 0.92));
      last = blob;
      await fetch(`/__shot?frame=${sub}&name=f${String(index++).padStart(5, '0')}`, { method: 'POST', body: blob });
    }
  };
  const seconds = (s: number) => frames(Math.round(s * FPS));

  // A soft white ring where the finger touches, so viewers see what is pressed.
  const touch = (x: number, y: number) => {
    const scene = r.active();
    const ring = scene.add.circle(x, y, 44, 0xffffff, 0.35).setStrokeStyle(6, 0xffffff, 0.9).setDepth(1e6).setScale(0.6);
    scene.tweens.add({ targets: ring, scale: 1.3, alpha: 0, duration: 450, onComplete: () => ring.destroy() });
  };
  const tap = (obj: Phaser.GameObjects.GameObject & { getBounds?: () => Phaser.Geom.Rectangle }) => {
    const bounds = obj.getBounds?.();
    if (bounds) touch(bounds.centerX, bounds.centerY);
    obj.emit('pointerdown');
    obj.emit('pointerup');
  };
  const start = async (key: string, data: object = {}) => {
    r.start(key, data);
    await frames(2);
  };
  return { frames, seconds, touch, tap, start, count: () => index };
}

// The gameplay video: workshop → clearing a pile → merging → repairing the radio → paint room → before/after.
export async function record(): Promise<string> {
  const r = rig();
  const { seconds, touch, tap, start, count } = recorder(r);

  // 1. The workshop, then a pile is opened and cleared.
  r.stage('workshop');
  await start('Workshop');
  await seconds(1.6);
  const zones = r.active().zones as Map<string, { box: Phaser.GameObjects.Container }>;
  const pile = zones.get('behind_cabinet');
  if (pile) tap(pile.box);
  await seconds(1);
  const scavenge = r.active();
  const debris = [...(scavenge.debris as Map<string, Phaser.GameObjects.Container>).values()];
  for (const box of debris.slice(0, 6)) {
    tap(box);
    await seconds(0.55);
  }
  await seconds(0.6);

  // 2. The table: two pairs are merged by dragging one item onto its twin.
  goTo(scavenge, 'MergeTable');
  await seconds(0.9);
  const table = r.active();
  const cells = table.cells as { ref: CellRef; r: { x: number; y: number; w: number; h: number } }[];
  const merge = async (from: number, to: number) => {
    const a = cells.find((c) => c.ref.area === 'board' && c.ref.index === from);
    const b = cells.find((c) => c.ref.area === 'board' && c.ref.index === to);
    const items = table.items as Map<string, Phaser.GameObjects.Container>;
    const view = [...items.values()].find((v) => a && Math.abs(v.x - (a.r.x + a.r.w / 2)) < 2 && Math.abs(v.y - (a.r.y + a.r.h / 2)) < 2);
    if (!a || !b || !view) return;
    touch(view.x, view.y);
    view.setDepth(20);
    table.tweens.add({ targets: view, x: b.r.x + b.r.w / 2, y: b.r.y + b.r.h / 2, scale: 1.1, duration: 380, ease: 'Sine.easeInOut' });
    await seconds(0.45);
    (table.move as (x: CellRef, y: CellRef) => void).call(table, a.ref, b.ref);
    await seconds(0.9);
  };
  await seconds(0.4);
  await merge(0, 1);
  await merge(3, 4);
  await seconds(0.3);

  // 3. Back in the workshop: the radio is repaired and tells its story.
  goTo(table, 'Workshop');
  await seconds(0.9);
  (r.active().openRepair as (id: string) => void).call(r.active(), 'radio');
  await seconds(1.1);
  const repairButton = findButton(r.active(), t('ui.repair.button'));
  if (repairButton) tap(repairButton);
  await seconds(3.4);

  // 4. The paint room, mid-way.
  r.stage('paint');
  await start('Workshop');
  await seconds(2.4);

  // 5. Before and after: the restored workshop.
  r.stage('restored');
  await start('Workshop');
  await seconds(0.8);
  const { showBeforeAfter } = await import('./ui/BeforeAfter');
  showBeforeAfter(r.active(), r.content, r.content.rooms[0] as never, () => undefined);
  await seconds(4);

  r.restart();
  return `${count()} frames, ${(count() / FPS).toFixed(1)} s`;
}

// Ads (frames → assets/store/.frames/ad<n>_<lang>/, then `npm run ads [en]`):
// 1 — the before/after handle is dragged slowly across the restored workshop, then the paint room;
// 2 — repair after repair from the very start: the workbench, the lamp, the window.
export async function recordAd(n: 1 | 2): Promise<string> {
  const r = rig();
  const { frames, seconds, tap, start, count } = recorder(r, `ad${n}_${lang()}`);
  if (n === 1) {
    const { showBeforeAfter } = await import('./ui/BeforeAfter');
    const sweep = async (roomIndex: number, hold: number, travel: number) => {
      r.stage('complete');
      r.setState((s) => (s.room = r.content.rooms[roomIndex]?.id ?? 'workshop'));
      await start('Workshop');
      await seconds(0.3);
      showBeforeAfter(r.active(), r.content, r.content.rooms[roomIndex] as never, () => undefined);
      await frames(2);
      // The drag zone of the comparison: a press stops its intro slide, moves follow the finger.
      const find = (list: Phaser.GameObjects.GameObject[]): Phaser.GameObjects.Zone | undefined => {
        for (const o of list) {
          if (o instanceof Phaser.GameObjects.Zone && o.input && o.width === 720 && o.height === 848) return o;
          if (o instanceof Phaser.GameObjects.Container) {
            const inner = find(o.list);
            if (inner) return inner;
          }
        }
        return undefined;
      };
      const zone = find(r.active().children.list);
      if (!zone) return;
      const left = zone.x + 4;
      const right = zone.x + zone.width - 4;
      zone.emit('pointerdown', { x: right, isDown: true });
      await seconds(hold);
      const steps = Math.round(travel * FPS);
      for (let k = 1; k <= steps; k++) {
        const p = k / steps;
        const eased = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
        zone.emit('pointermove', { x: right + (left - right) * eased, isDown: true });
        await frames(1);
      }
      await seconds(hold);
    };
    await sweep(0, 1, 3.2);
    await sweep(1, 0.8, 2.6);
  } else {
    r.stage('early');
    await start('Workshop');
    await seconds(0.8);
    for (const id of ['workbench', 'workbench', 'workbench', 'lamp', 'lamp', 'window']) {
      (r.active().openRepair as (x: string) => void).call(r.active(), id);
      await seconds(0.55);
      const button = findButton(r.active(), t('ui.repair.button'));
      if (button) tap(button);
      await seconds(1.5);
      // A repair that brings a find shows its card: a short look, then it is closed.
      const close = findButton(r.active(), t('ui.close'));
      if (close) {
        await seconds(1.2);
        tap(close);
        await seconds(0.5);
      }
    }
    await seconds(0.6);
  }
  r.restart();
  return `ad${n}: ${count()} frames, ${(count() / FPS).toFixed(1)} s`;
}
