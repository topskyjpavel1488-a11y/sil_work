// Assembles the store gameplay videos from the frames recorded by src/dev-video.ts (assets/store/.frames/).
// Run: npm run video. Output (Yandex: MP4, up to 28 s, height ≥ 400 px):
// - assets/store/video_horizontal.mp4 — 1920×1080: the portrait game in the middle on a blurred room background;
// - assets/store/video_vertical.mp4 — 1080×1920: the game full frame.
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..');
const FRAMES = join(ROOT, 'assets/store/.frames');
const OUT = join(ROOT, 'assets/store');
const FPS = 30;
const MAX_SECONDS = 28;
const COLUMN_W = 608; // 1080 × 9/16, rounded to an even number for H.264

function ffmpeg(args: string[]): void {
  if (!ffmpegPath) throw new Error('ffmpeg-static has no binary for this platform');
  const r = spawnSync(ffmpegPath, ['-hide_banner', '-y', ...args], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(r.stderr);
}

if (!existsSync(FRAMES) || readdirSync(FRAMES).length === 0) throw new Error('No frames: record them first (src/dev-video.ts)');
const count = readdirSync(FRAMES).filter((f) => f.endsWith('.jpg')).length;

// Background: the workshop picture, blurred and a little darker, with a soft shadow under the game column.
const background = join(FRAMES, 'background.png');
const shadow = Buffer.from(
  `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg"><defs><filter id="b"><feGaussianBlur stdDeviation="24"/></filter></defs>` +
    `<rect x="${(1920 - COLUMN_W) / 2 - 12}" y="-40" width="${COLUMN_W + 24}" height="1160" fill="#000" opacity="0.45" filter="url(#b)"/></svg>`,
);
await sharp(join(ROOT, 'assets/files/images/room_bg.jpg'))
  .resize(1920, 1080, { fit: 'cover' })
  .blur(18)
  .modulate({ brightness: 0.8 })
  .composite([{ input: shadow }])
  .png()
  .toFile(background);

const input = ['-framerate', String(FPS), '-i', join(FRAMES, 'f%05d.jpg')];
const encode = ['-t', String(MAX_SECONDS), '-r', String(FPS), '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an'];
ffmpeg([
  '-loop', '1', '-i', background, ...input,
  '-filter_complex', `[1:v]scale=${COLUMN_W}:1080:flags=lanczos[g];[0:v][g]overlay=(W-w)/2:0:shortest=1`,
  ...encode, join(OUT, 'video_horizontal.mp4'),
]);
ffmpeg([...input, '-vf', 'scale=1080:1920:flags=lanczos', ...encode, join(OUT, 'video_vertical.mp4')]);
console.log(`${count} frames → ${(Math.min(count / FPS, MAX_SECONDS)).toFixed(1)} s: video_horizontal.mp4, video_vertical.mp4`);
