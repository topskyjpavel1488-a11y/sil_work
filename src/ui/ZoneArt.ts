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
  // A tight cluster: a smaller back row tucked behind the front row, everything resting on the bottom edge.
  const back = images.slice(0, Math.floor(images.length / 2));
  const front = images.slice(back.length);
  const size = Math.min(h * 0.92, (w * 0.85) / Math.max(front.length * 0.75, 1));
  const place = (keys: string[], y: number, s: number, spread: number) =>
    keys.forEach((key, i) => {
      const x = keys.length === 1 ? 0 : (i / (keys.length - 1) - 0.5) * spread;
      const img = scene.add.image(x, y, key);
      img.setScale(s / Math.max(img.width, img.height));
      box.add(img);
    });
  place(back, h / 2 - size * 0.78, size * 0.82, Math.min(w - size, size * 0.9 * back.length));
  place(front, h / 2 - size / 2, size, Math.min(w - size, size * 0.75 * front.length));
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
