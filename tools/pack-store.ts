// Packs every store media file into store-media.zip (in the project root) for the Yandex console:
// rus/ and en/ folders, files named by where they go (mob_screen_1, desktop_video_1, ad_mob_video_1…).
// Run: npm run pack:store (Windows: uses PowerShell's Compress-Archive).
import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const STORE = join(ROOT, 'assets/store');
const STAGE = join(STORE, '.frames/pack');
const ZIP = join(ROOT, 'store-media.zip');

rmSync(STAGE, { recursive: true, force: true });
const missing: string[] = [];
const put = (from: string, folder: string, name: string) => {
  const src = join(STORE, from);
  if (!existsSync(src)) return void missing.push(from);
  mkdirSync(join(STAGE, folder), { recursive: true });
  copyFileSync(src, join(STAGE, folder, name));
};
const screens = (dir: string) => (existsSync(join(STORE, dir)) ? readdirSync(join(STORE, dir)).filter((f) => f.endsWith('.png')).sort() : []);

for (const [folder, sfx] of [['rus', ''], ['en', '_en']] as const) {
  put('store_icon.png', folder, 'icon.png');
  put('store_cover.png', folder, 'cover.png');
  screens(`screenshots${sfx}`).forEach((f, i) => put(`screenshots${sfx}/${f}`, folder, `mob_screen_${i + 1}.png`));
  screens(`screenshots_desktop${sfx}`).forEach((f, i) => put(`screenshots_desktop${sfx}/${f}`, folder, `desktop_screen_${i + 1}.png`));
  put(`video_vertical${sfx}.mp4`, folder, 'mob_video_1.mp4');
  put(`video_horizontal${sfx}.mp4`, folder, 'desktop_video_1.mp4');
  for (const n of [1, 2, 3]) {
    put(`ads/ad${n}_vertical${sfx}.mp4`, folder, `ad_mob_video_${n}.mp4`);
    put(`ads/ad${n}_horizontal${sfx}.mp4`, folder, `ad_desktop_video_${n}.mp4`);
  }
}
if (missing.length > 0) throw new Error(`Missing: ${missing.join(', ')}`);

writeFileSync(
  join(STAGE, 'README.txt'),
  [
    'Медиа для черновика Яндекс Игр. Папка rus — вкладка «Русский», en — «English».',
    '',
    'icon.png              → Иконка (512×512)',
    'cover.png             → Обложка (800×470)',
    'mob_screen_N.png      → Скриншоты, тип «Мобильные», ориентация «Портретная» (1080×1920)',
    'desktop_screen_N.png  → Скриншоты, тип «Десктоп» (1920×1080)',
    'mob_video_1.mp4       → Вертикальное видео (9:16)',
    'desktop_video_1.mp4   → Горизонтальное видео (16:9, обязательное)',
    'ad_mob_video_N.mp4    → Рекламные видео, вертикальные (9:16)',
    'ad_desktop_video_N.mp4 → Рекламные видео, горизонтальные (16:9)',
    '',
  ].join('\r\n'),
);
rmSync(ZIP, { force: true });
const r = spawnSync('powershell', ['-NoProfile', '-Command', `Compress-Archive -Path '${STAGE}\\*' -DestinationPath '${ZIP}' -Force`], { encoding: 'utf8' });
if (r.status !== 0) throw new Error(r.stderr);
rmSync(STAGE, { recursive: true, force: true });
console.log(`store-media.zip ready`);
