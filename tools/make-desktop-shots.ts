// Desktop store screenshots (Yandex: landscape only, 16:9, 1280–2560 px on the long side): each portrait
// screenshot from assets/store/screenshots/ is put in the middle of a 1920×1080 frame on the blurred
// workshop background, the way the game itself sits on a desktop screen. Run: npm run shots:desktop.
import { mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..');
const SRC = join(ROOT, 'assets/store/screenshots');
const OUT = join(ROOT, 'assets/store/screenshots_desktop');
const W = 1920;
const H = 1080;
const COLUMN_W = Math.round((H * 9) / 16);

mkdirSync(OUT, { recursive: true });
const shadow = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg"><defs><filter id="b"><feGaussianBlur stdDeviation="24"/></filter></defs>` +
    `<rect x="${(W - COLUMN_W) / 2 - 12}" y="-40" width="${COLUMN_W + 24}" height="${H + 80}" fill="#000" opacity="0.45" filter="url(#b)"/></svg>`,
);
const background = await sharp(join(ROOT, 'assets/files/images/room_bg.jpg'))
  .resize(W, H, { fit: 'cover' })
  .blur(18)
  .modulate({ brightness: 0.8 })
  .composite([{ input: shadow }])
  .png()
  .toBuffer();

for (const name of readdirSync(SRC).filter((f) => f.endsWith('.png')).sort()) {
  const column = await sharp(join(SRC, name)).resize(COLUMN_W, H).png().toBuffer();
  await sharp(background)
    .composite([{ input: column, left: Math.round((W - COLUMN_W) / 2), top: 0 }])
    .png()
    .toFile(join(OUT, name));
  console.log(`screenshots_desktop/${name}  ${W}×${H}`);
}
