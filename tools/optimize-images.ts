// npm run images — turns the original art in assets/source/images/ into game-ready files in
// assets/files/images/ and points assets/manifest.json at them.
// File names must be manifest keys (any image format). Each image is scaled down to twice its
// on-screen size; opaque images become JPEG, images with transparency stay PNG.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import sharp from 'sharp';
import type { Manifest } from './content-check';

const SOURCE = 'assets/source/images';
const OUT = 'assets/files/images';
const MANIFEST = 'assets/manifest.json';
const LAYOUT = 'src/data/layout.json';
const SCALE = 2;

type Rect = { w: number; h: number };
const layout = JSON.parse(readFileSync(LAYOUT, 'utf8')) as Record<string, Record<string, Rect>>;
const workshop = layout.workshop ?? {};

// Largest size the game ever shows each key at, in design pixels.
function displaySize(key: string): Rect | null {
  const object = key.match(/^obj_(.+)_\d+$/);
  if (object) return workshop[`object.${object[1]}`] ?? null;
  if (key.startsWith('zone_')) return workshop[`zone.${key.slice(5)}`] ?? null;
  if (key.startsWith('scene_')) return layout.scavenge?.area ?? null;
  if (key === 'room_bg') return workshop.room ?? null;
  if (key.startsWith('find_') || key === 'final_card') return { w: 560, h: 420 };
  if (key.startsWith('debris_')) return { w: 192, h: 176 };
  if (key.startsWith('item_')) return { w: 144, h: 144 };
  if (key.startsWith('res_')) return { w: 80, h: 80 };
  if (key === 'logo') return { w: 128, h: 128 };
  return null;
}

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8')) as Manifest;
if (!existsSync(SOURCE)) {
  console.error(`${SOURCE} does not exist`);
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

const errors: string[] = [];
let done = 0;
for (const name of readdirSync(SOURCE).sort()) {
  const src = join(SOURCE, name);
  if (!statSync(src).isFile()) continue;
  const key = basename(name, extname(name));
  const entry = manifest.images[key];
  const size = displaySize(key);
  if (!entry || !size) {
    errors.push(`${name}: "${key}" is not an image key in ${MANIFEST}`);
    continue;
  }
  const image = sharp(src);
  const meta = await image.metadata();
  // Transparency matters only if some pixel actually uses it.
  const stats = meta.hasAlpha ? await image.stats() : null;
  const transparent = !!stats && (stats.channels[3]?.min ?? 255) < 255;
  const ext = transparent ? 'png' : 'jpg';
  const file = `images/${key}.${ext}`;
  for (const old of ['png', 'jpg']) {
    const stale = join(OUT, `${key}.${old}`);
    if (old !== ext && existsSync(stale)) rmSync(stale);
  }
  const resized = sharp(src).resize({ width: size.w * SCALE, height: size.h * SCALE, fit: 'inside', withoutEnlargement: true });
  const out = transparent
    ? resized.png({ compressionLevel: 9, palette: true, quality: 90 })
    : resized.flatten({ background: '#F3E9D2' }).jpeg({ quality: 82, mozjpeg: true });
  const info = await out.toFile(join(OUT, `${key}.${ext}`));
  entry.file = file;
  done++;
  console.log(`${key}: ${meta.width}×${meta.height} → ${info.width}×${info.height} ${ext}, ${(info.size / 1024).toFixed(0)} KB`);
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`${done} image(s) ready in ${OUT}, manifest updated.`);
if (errors.length) {
  for (const e of errors) console.error(`ERROR: ${e}`);
  process.exit(1);
}
