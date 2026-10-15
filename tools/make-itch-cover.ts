// itch.io cover (630×500, the size itch recommends): the store cover cropped to the itch proportions,
// with the game's English name on a soft dark band at the bottom. Run: npm run itch:cover.
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..');
const OUT = join(ROOT, 'assets/store/itch');
const W = 630;
const H = 500;

mkdirSync(OUT, { recursive: true });
const band = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e1814" stop-opacity="0"/><stop offset="1" stop-color="#1e1814" stop-opacity="0.85"/></linearGradient></defs>` +
    `<rect y="${H * 0.55}" width="${W}" height="${H * 0.45}" fill="url(#g)"/>` +
    `<text x="${W / 2}" y="${H - 52}" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="58" fill="#F3E9D2" text-anchor="middle">Quiet Workshop</text>` +
    `<text x="${W / 2}" y="${H - 18}" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#E8D9B8" text-anchor="middle">a cozy restoration game</text></svg>`,
);
await sharp(join(ROOT, 'assets/store/store_cover.png'))
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .composite([{ input: band }])
  .png()
  .toFile(join(OUT, 'cover.png'));
console.log('assets/store/itch/cover.png  630×500');
