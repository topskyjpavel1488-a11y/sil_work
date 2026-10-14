// Assembles the three store ad videos (Yandex "Рекламные видео": 9:16 and 16:9, recommended 1080×1920 / 1920×1080).
// Run: npm run ads [en]. Sources:
//   ad 1 — assets/store/.frames/ad1_<lang>/ (before/after sweeps, src/dev-video.ts recordAd(1));
//   ad 2 — assets/store/.frames/ad2_<lang>/ (repair after repair, recordAd(2));
//   ad 3 — the first 16.6 s of video_vertical[_en].mp4 (clearing a pile → table → the radio and its find).
// Each ad ends on a card: the logo and the game's name over the blurred workshop. Output: assets/store/ads/.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..');
const LANG = process.argv[2] === 'en' ? 'en' : 'ru';
const SUFFIX = LANG === 'en' ? '_en' : '';
const FRAMES = join(ROOT, 'assets/store/.frames');
const OUT = join(ROOT, 'assets/store/ads');
const TMP = join(FRAMES, `ads_tmp${SUFFIX}`);
const FPS = 30;
const CARD_S = 1.8;
const FADE_S = 0.4;
const COLUMN_W = 608;
const TITLE = (JSON.parse(readFileSync(join(ROOT, `src/i18n/${LANG}.json`), 'utf8')) as Record<string, string>)['ui.title'] ?? '';

function ffmpeg(args: string[]): void {
  if (!ffmpegPath) throw new Error('ffmpeg-static has no binary for this platform');
  const r = spawnSync(ffmpegPath, ['-hide_banner', '-y', ...args], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(r.stderr);
}

mkdirSync(OUT, { recursive: true });
mkdirSync(TMP, { recursive: true });
const roomBg = join(ROOT, 'assets/files/images/room_bg.jpg');
const logo = join(ROOT, 'assets/files/images/logo.png');

// Blurred workshop backgrounds: one for the game column in 16:9, one per format for the end card.
async function blurred(w: number, h: number, brightness: number): Promise<Buffer> {
  return sharp(roomBg).resize(w, h, { fit: 'cover' }).blur(18).modulate({ brightness }).png().toBuffer();
}
const shadow = Buffer.from(
  `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg"><defs><filter id="b"><feGaussianBlur stdDeviation="24"/></filter></defs>` +
    `<rect x="${(1920 - COLUMN_W) / 2 - 12}" y="-40" width="${COLUMN_W + 24}" height="1160" fill="#000" opacity="0.45" filter="url(#b)"/></svg>`,
);
const columnBg = join(TMP, 'column_bg.png');
await sharp(await blurred(1920, 1080, 0.8)).composite([{ input: shadow }]).toFile(columnBg);

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
async function card(w: number, h: number, file: string): Promise<void> {
  const size = Math.round(Math.min(w, h) * 0.42);
  const icon = await sharp(await sharp(logo).trim().toBuffer()).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const font = Math.round(Math.min(w, h) * 0.085);
  const text = Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">` +
      `<text x="${w / 2}" y="${h / 2 + size / 2 + font * 1.6}" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="${font}" fill="#F3E9D2" text-anchor="middle">${escape(TITLE)}</text></svg>`,
  );
  await sharp(await blurred(w, h, 0.55))
    .composite([
      { input: icon, left: Math.round((w - size) / 2), top: Math.round(h / 2 - size / 2 - font * 0.6) },
      { input: text, left: 0, top: 0 },
    ])
    .png()
    .toFile(file);
}
const cardV = join(TMP, 'card_v.png');
const cardH = join(TMP, 'card_h.png');
await card(1080, 1920, cardV);
await card(1920, 1080, cardH);

// One ad in both formats: the gameplay, then a fade into the end card.
function render(name: string, source: string[], seconds: number): void {
  const offset = (seconds - FADE_S).toFixed(3);
  const encode = ['-r', String(FPS), '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an'];
  const norm = `fps=${FPS},format=yuv420p,setsar=1`;
  ffmpeg([
    ...source, '-loop', '1', '-t', String(CARD_S), '-i', cardV,
    '-filter_complex', `[0:v]scale=1080:1920:flags=lanczos,${norm}[a];[1:v]${norm}[b];[a][b]xfade=transition=fade:duration=${FADE_S}:offset=${offset}`,
    ...encode, join(OUT, `${name}_vertical${SUFFIX}.mp4`),
  ]);
  ffmpeg([
    ...source, '-loop', '1', '-t', String(seconds), '-i', columnBg, '-loop', '1', '-t', String(CARD_S), '-i', cardH,
    '-filter_complex', `[0:v]scale=${COLUMN_W}:1080:flags=lanczos[g];[1:v][g]overlay=(W-w)/2:0,${norm}[a];[2:v]${norm}[b];[a][b]xfade=transition=fade:duration=${FADE_S}:offset=${offset}`,
    ...encode, join(OUT, `${name}_horizontal${SUFFIX}.mp4`),
  ]);
  console.log(`ads/${name}_{vertical,horizontal}${SUFFIX}.mp4  ${(seconds + CARD_S - FADE_S).toFixed(1)} s`);
}

for (const n of [1, 2]) {
  const dir = join(FRAMES, `ad${n}_${LANG}`);
  if (!existsSync(dir)) throw new Error(`No frames in ${dir}: record them first (src/dev-video.ts recordAd(${n}))`);
  const count = readdirSync(dir).filter((f) => f.endsWith('.jpg')).length;
  render(`ad${n}`, ['-framerate', String(FPS), '-i', join(dir, 'f%05d.jpg')], count / FPS);
}
const main = join(ROOT, `assets/store/video_vertical${SUFFIX}.mp4`);
render('ad3', ['-t', '16.6', '-i', main], 16.6);
