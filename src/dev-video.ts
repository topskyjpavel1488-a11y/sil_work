// Development-only: records the store gameplay video frame by frame in the ?shot mode.
// The game loop is stopped and stepped by hand, so every animation is captured smoothly however slow
// the browser is; each frame goes to the dev server (vite.config.ts) as assets/store/.frames/f00000.jpg.
// Then `npm run video` assembles the MP4 files. Run from the browser console: (await import('/src/dev-video.ts')).record()
import Phaser from 'phaser';
import type { CellRef, GameState, ItemRef } from './core/state';
import type { Store } from './store';
import { goTo } from './ui/transition';
import { dayKey } from './core/daily';
import { session } from './session';

const FPS = 30;
const W = 720;
const H = 1280;

interface Tm {
  store: Store;
  game: Phaser.Game;
}

type AnyScene = Phaser.Scene & Record<string, unknown>;

export async function record(): Promise<string> {
  const { store, game } = (window as unknown as { __tm: Tm }).__tm;
  const content = store.content;
  const capture = document.createElement('canvas');
  capture.width = W;
  capture.height = H;
  const ctx = capture.getContext('2d', { willReadFrequently: true });
  if (!ctx) return 'no 2d context';
  game.loop.stop();
  // No welcome-back card in the video.
  session.welcomed = true;
  let time = performance.now();
  let index = 0;
  let last: Blob | null = null;

  const frames = async (count: number) => {
    for (let k = 0; k < count; k++) {
      time += 1000 / FPS;
      // A hidden browser tab pauses the game (spec 2.1); the recording keeps it running without restarting the loop.
      game.isPaused = false;
      game.step(time, 1000 / FPS);
      // Read the WebGL canvas right after the render, before the browser clears it.
      ctx.fillStyle = '#f3e9d2';
      ctx.fillRect(0, 0, W, H);
      ctx.drawImage(game.canvas, 0, 0, W, H);
      // The first render of a new scene can come out empty: repeat the previous frame instead of a flash.
      const empty = [ctx.getImageData(W / 2, H * 0.55, 1, 1), ctx.getImageData(W * 0.2, H * 0.8, 1, 1)].every(({ data }) => data[0] === 0xf3 && data[1] === 0xe9 && data[2] === 0xd2);
      const blob = empty && last ? last : await new Promise<Blob | null>((resolve) => capture.toBlob(resolve, 'image/jpeg', 0.92));
      last = blob;
      await fetch(`/__shot?frame=1&name=f${String(index++).padStart(5, '0')}`, { method: 'POST', body: blob });
    }
  };
  const seconds = (s: number) => frames(Math.round(s * FPS));
  const active = () => game.scene.getScenes(true)[0] as AnyScene;

  // A soft white ring where the finger touches, so viewers see what is pressed.
  const touch = (x: number, y: number) => {
    const scene = active();
    const ring = scene.add.circle(x, y, 44, 0xffffff, 0.35).setStrokeStyle(6, 0xffffff, 0.9).setDepth(1e6).setScale(0.6);
    scene.tweens.add({ targets: ring, scale: 1.3, alpha: 0, duration: 450, onComplete: () => ring.destroy() });
  };
  const tap = (obj: Phaser.GameObjects.GameObject & { getBounds?: () => Phaser.Geom.Rectangle }) => {
    const b = obj.getBounds?.();
    if (b) touch(b.centerX, b.centerY);
    obj.emit('pointerdown');
    obj.emit('pointerup');
  };
  // A button anywhere in the scene, including inside a dialog container.
  const button = (label: string): Phaser.GameObjects.Container | undefined => {
    const search = (list: Phaser.GameObjects.GameObject[]): Phaser.GameObjects.Container | undefined => {
      for (const o of list) {
        if (!(o instanceof Phaser.GameObjects.Container)) continue;
        if (o.list.some((c) => c instanceof Phaser.GameObjects.Text && c.text === label)) return o;
        const inner = search(o.list);
        if (inner) return inner;
      }
      return undefined;
    };
    return search(active().children.list);
  };

  const start = async (key: string, data: object = {}) => {
    for (const s of game.scene.getScenes(true)) game.scene.stop(s.scene.key);
    game.scene.start(key, data);
    await frames(2);
  };
  const setState = (edit: (n: GameState) => void) => {
    const n = structuredClone(store.state);
    edit(n);
    store.commit({ state: n, events: [] });
  };

  // The middle of the workshop: some things repaired, piles left, a full table.
  const f = (chain: ItemRef['chain'], level: ItemRef['level']): ItemRef => ({ chain, level });
  setState((n) => {
    n.tutorial = { done: true, step: 99 };
    n.hints = ['story', 'intro_paint', 'review'];
    n.giftDay = dayKey(new Date());
    n.settings.largeText = false;
    for (const o of content.objects) n.objects[o.id] = { step: 0 };
    for (const z of content.zones) n.zones[z.id] = { taken: [] };
    Object.assign(n.objects, { workbench: { step: 3 }, fastener_box: { step: 1 }, lamp: { step: 2 }, window: { step: 2 }, cabinet: { step: 2 }, radio: { step: 1 } });
    const take = (id: string, count = 99) => (n.zones[id] = { taken: (content.zones.find((z) => z.id === id)?.debris ?? []).slice(0, count).map((d) => d.id) });
    take('door');
    take('under_workbench');
    take('window_shelves', 6);
    take('corner_crates', 5);
    n.resources = { wood: 6, metal: 4, parts: 7 };
    n.finds = ['f_photo', 'f_screws', 'f_note'];
    n.room = 'workshop';
    n.board = [f('fasteners', 1), f('fasteners', 1), f('fasteners', 4), f('paints', 1), f('paints', 1), f('fasteners', 3), f('fasteners', 4), null, f('fasteners', 2), f('paints', 3), null, f('fasteners', 4), f('paints', 2), null, f('fasteners', 2), f('paints', 1), null, null, f('fasteners', 2), null, f('paints', 4), null, null, f('fasteners', 1), null];
    n.box = [f('paints', 1), f('fasteners', 2), null, null, null, null];
  });

  // 1. The workshop, then a pile is opened and cleared.
  await start('Workshop');
  await seconds(1.6);
  const workshop = active();
  const zones = workshop.zones as Map<string, { box: Phaser.GameObjects.Container }>;
  const pile = zones.get('behind_cabinet');
  if (pile) tap(pile.box);
  await seconds(1);
  const scavenge = active();
  const debris = [...(scavenge.debris as Map<string, Phaser.GameObjects.Container>).values()];
  for (const box of debris.slice(0, 6)) {
    tap(box);
    await seconds(0.55);
  }
  await seconds(0.6);

  // 2. The table: two pairs are merged by dragging one item onto its twin.
  goTo(scavenge, 'MergeTable');
  await seconds(0.9);
  const table = active();
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
  (active().openRepair as (id: string) => void).call(active(), 'radio');
  await seconds(1.1);
  const repairButton = button('Починить');
  if (repairButton) tap(repairButton);
  await seconds(3.4);

  // 4. The paint room, mid-way.
  setState((n) => {
    for (const o of content.objects.filter((x) => x.room === 'workshop')) n.objects[o.id] = { step: o.steps.length };
    for (const z of content.zones.filter((x) => x.room === 'workshop')) n.zones[z.id] = { taken: z.debris.map((d) => d.id) };
    Object.assign(n.objects, { paint_table: { step: 3 }, drying_rack: { step: 2 }, paint_rack: { step: 2 }, vent_window: { step: 1 }, easel: { step: 1 } });
    n.zones.cans_entrance = { taken: (content.zones.find((z) => z.id === 'cans_entrance')?.debris ?? []).map((d) => d.id) };
    n.room = 'paint';
  });
  await start('Workshop');
  await seconds(2.4);

  // 5. Before and after: the restored workshop.
  setState((n) => (n.room = 'workshop'));
  await start('Workshop');
  await seconds(0.8);
  const { showBeforeAfter } = await import('./ui/BeforeAfter');
  showBeforeAfter(active(), content, content.rooms[0] as never, () => undefined);
  await seconds(4);

  game.loop.start(game.step.bind(game));
  return `${index} frames, ${(index / FPS).toFixed(1)} s`;
}
