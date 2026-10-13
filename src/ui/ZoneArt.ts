// Zone pictures built from art that already exists (spec 15.6, v0.8), so a zone needs no art of its own:
// - the pile on the main screen is stacked from the sprites of the debris still lying in the zone;
// - the clearing scene shows the room background zoomed in on the zone, softened, as a close-up.
// A dedicated zone_* or scene_* picture, if one is ever added to the manifest, still takes priority.
import Phaser from 'phaser';
import { setAsset } from '../assets';
import { PALETTE } from '../config';
import { objectsIn, zonesIn, type Content, type RoomDef, type ZoneDef } from '../core/content';
import { rect, type Rect } from '../layout';

const PILE_MAX = 5;

// Heap layouts for 1…5 pieces: [x offset, lift above the floor, scale], all in item sizes, back to front.
const PILE_SLOTS: [number, number, number][][] = [
  [[0, 0, 1]],
  [[0.18, 0.22, 0.85], [-0.15, 0, 1]],
  [[0.05, 0.36, 0.82], [-0.27, 0, 1], [0.28, 0.02, 0.9]],
  [[0.1, 0.4, 0.8], [-0.38, 0.14, 0.86], [-0.12, 0, 1], [0.32, 0, 0.9]],
  [[-0.04, 0.44, 0.8], [-0.42, 0.18, 0.84], [0.4, 0.14, 0.86], [-0.2, 0, 1], [0.22, 0, 0.92]],
];

// A small repeatable random generator, so a zone keeps the same heap between redraws.
function seeded(text: string): () => number {
  let x = [...text].reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) >>> 0, 2166136261) || 1;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 4294967296;
  };
}

// Objects that stand on something rather than hang on the wall; in the upper half they get a shelf too.
const SHELF_OBJECTS = new Set(['radio']);

// Spots in the upper (wall) half of the room that need a shelf under them so nothing floats (spec 15.6):
// every zone there and the objects listed above.
export function wallShelfRects(content: Content, room: RoomDef): Rect[] {
  const r = rect(room.layout, 'room');
  const floor = r.y + r.h / 2;
  const zones = zonesIn(content, room.id).map((z) => rect(room.layout, `zone.${z.id}`));
  const objects = objectsIn(content, room.id).filter((o) => SHELF_OBJECTS.has(o.id)).map((o) => rect(room.layout, `object.${o.id}`));
  return [...zones, ...objects].filter((s) => s.y + s.h <= floor);
}

// A simple wooden shelf with two brackets along the bottom edge of a spot, drawn behind it.
export function drawShelf(scene: Phaser.Scene, s: Rect): Phaser.GameObjects.Graphics {
  const g = scene.add.graphics();
  const w = s.w * 0.88;
  const x = s.x + (s.w - w) / 2;
  const y = s.y + s.h - 12;
  // Brackets.
  g.fillStyle(0x5e3d25, 1);
  for (const bx of [x + w * 0.14, x + w * 0.86 - 12]) g.fillTriangle(bx, y + 16, bx + 12, y + 16, bx, y + 40);
  // Soft shadow on the wall, the board, its front edge and a light top line.
  g.fillStyle(0x000000, 0.18).fillRoundedRect(x + 4, y + 10, w, 16, 4);
  g.fillStyle(PALETTE.wood, 1).fillRoundedRect(x, y, w, 16, 4);
  g.fillStyle(0x6b4529, 1).fillRect(x, y + 11, w, 5);
  g.fillStyle(0xb98a5e, 1).fillRect(x + 4, y + 1, w - 8, 3);
  return g;
}

// Picks up to PILE_MAX remaining debris, alternating kinds so the pile looks varied.
function pileKinds(content: Content, zone: ZoneDef, taken: string[]): string[] {
  const left = zone.debris.filter((d) => !taken.includes(d.id));
  const byKind = new Map<string, number>();
  for (const d of left) byKind.set(d.kind, (byKind.get(d.kind) ?? 0) + 1);
  const kinds = [...byKind.keys()];
  const out: string[] = [];
  for (let round = 0; out.length < Math.min(PILE_MAX, left.length); round++) {
    for (const k of kinds) {
      if ((byKind.get(k) ?? 0) > round && out.length < PILE_MAX) out.push(content.debrisKinds[k]?.image ?? '');
    }
  }
  return out;
}

// Fills the hotspot container with the zone's pile. Returns true when real art is shown (no name label needed).
export function drawZonePile(scene: Phaser.Scene, box: Phaser.GameObjects.Container, content: Content, zone: ZoneDef, taken: string[]): boolean {
  if (scene.textures.exists(zone.image)) {
    setAsset(scene, box, zone.image);
    return true;
  }
  const images = pileKinds(content, zone, taken);
  if (images.length === 0 || !images.every((k) => scene.textures.exists(k))) {
    setAsset(scene, box, zone.image);
    return false;
  }
  box.removeAll(true);
  const { width: w, height: h } = box;
  // A heap rather than a row: pieces overlap, lean and rest on each other, the back ones higher up.
  // Slots are [x, lift, scale] in item sizes, drawn back to front; small jitter per zone keeps heaps different.
  const slots = PILE_SLOTS[Math.min(images.length, PILE_SLOTS.length) - 1] ?? [];
  const size = Math.min((w * 0.92) / 1.7, (h * 1.15) / 1.25);
  const bottom = h / 2 - 4;
  const rand = seeded(zone.id);
  images.forEach((key, i) => {
    const [sx, lift, sc] = slots[i] ?? [0, 0, 1];
    const img = scene.add.image((sx + (rand() - 0.5) * 0.12) * size, bottom - (lift + rand() * 0.04) * size, key).setOrigin(0.5, 1);
    img.setScale((size * sc * (0.94 + rand() * 0.12)) / Math.max(img.width, img.height));
    img.setRotation((i % 2 ? 1 : -1) * (0.06 + rand() * 0.2));
    img.setFlipX(rand() < 0.5);
    box.add(img);
  });
  return true;
}

// Background of the clearing scene: the room picture zoomed in around the zone.
export function drawZoneScene(scene: Phaser.Scene, area: Rect, roomImage: string, roomRect: Rect, zoneRect: Rect, sceneImage: string): void {
  if (scene.textures.exists(sceneImage) || !scene.textures.exists(roomImage)) {
    // Dedicated art, or nothing to zoom into yet (placeholder).
    const box = scene.add.container(area.x + area.w / 2, area.y + area.h / 2).setSize(area.w, area.h);
    setAsset(scene, box, sceneImage);
    return;
  }
  const frame = scene.textures.getFrame(roomImage);
  const k = frame.width / roomRect.w; // texture pixels per design pixel inside the room
  const aspect = area.w / area.h;
  // About 2.4× the zone's height, never more than the room, centred on the zone.
  let ch = Math.min(frame.height, Math.max(zoneRect.h * 2.4, zoneRect.w / aspect * 1.3) * k);
  let cw = ch * aspect;
  if (cw > frame.width) {
    cw = frame.width;
    ch = cw / aspect;
  }
  const cx = (zoneRect.x - roomRect.x + zoneRect.w / 2) * k;
  const cy = (zoneRect.y - roomRect.y + zoneRect.h / 2) * k;
  const x0 = Phaser.Math.Clamp(cx - cw / 2, 0, frame.width - cw);
  const y0 = Phaser.Math.Clamp(cy - ch / 2, 0, frame.height - ch);
  const s = area.w / cw;
  const img = scene.add.image(area.x - x0 * s, area.y - y0 * s, roomImage).setOrigin(0).setScale(s);
  img.setCrop(x0, y0, cw, ch);
  // Soft focus keeps the eye on the debris; WebGL only, the canvas renderer just skips it.
  img.preFX?.addBlur(1, 2, 2, 1.2);
  // A light warm veil and a darker frame so the sprites on top read clearly.
  scene.add.rectangle(area.x, area.y, area.w, area.h, PALETTE.cream, 0.18).setOrigin(0);
  const vignette = scene.add.graphics();
  for (let i = 0; i < 6; i++) {
    vignette.lineStyle(24, 0x2a1a10, 0.06);
    vignette.strokeRect(area.x + i * 12, area.y + i * 12, area.w - i * 24, area.h - i * 24);
  }
}
