// Prepares the sounds in assets/source/sounds/ (*.mp3, *.ogg, *.wav) for the game and names them in the manifest.
// Run: npm run sounds:process. Uses the ffmpeg binary from the ffmpeg-static dev dependency.
// - sfx_*: trailing silence cut, short fade-out, mono, levelled by loudness (RMS) with a peak limit,
//   so a dense rustle and a sharp knock sound equally loud next to the synthesized UI sounds;
// - music_*: the end is crossfaded into the start for a seamless loop, then levelled quietly (it sits under effects).
import { spawnSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import ffmpegPath from 'ffmpeg-static';

const ROOT = join(import.meta.dirname, '..');
const SRC = join(ROOT, 'assets/source/sounds');
const OUT = join(ROOT, 'assets/files/sounds');
const MANIFEST = join(ROOT, 'assets/manifest.json');

const SFX_RMS_DB = -21; // mean level of a debris sound
const MELODY_LUFS = -18; // the radio melody plays alone over the find card
const MUSIC_LUFS = -24; // background music, well under the effects
const LOOP_XFADE_S = 2;

function ffmpeg(args: string[]): string {
  if (!ffmpegPath) throw new Error('ffmpeg-static has no binary for this platform');
  const r = spawnSync(ffmpegPath, ['-hide_banner', '-y', ...args], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(r.stderr);
  return r.stderr;
}

const meanVolume = (file: string, filters: string) =>
  Number(/mean_volume: (-?[\d.]+) dB/.exec(ffmpeg(['-i', file, '-af', `${filters},volumedetect`, '-f', 'null', '-']))?.[1] ?? -20);

const duration = (file: string) => Number(/Duration: (\d+):(\d+):([\d.]+)/.exec(ffmpeg(['-i', file, '-f', 'null', '-']))?.slice(1).reduce((s, v) => s * 60 + Number(v), 0) ?? 0);

function sfx(src: string, dst: string, melody: boolean): void {
  // Cut the silent tail (reverse, strip leading silence, reverse back), then fade out the last moments.
  const trim = 'areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse';
  const fade = melody ? 'afade=t=in:d=0.15,areverse,afade=t=in:d=1.2,areverse' : 'areverse,afade=t=in:d=0.05,areverse';
  const shape = `${trim},${fade},aformat=channel_layouts=mono`;
  const level = melody ? `loudnorm=I=${MELODY_LUFS}:TP=-2:LRA=11` : `volume=${(SFX_RMS_DB - meanVolume(src, shape)).toFixed(1)}dB,alimiter=limit=0.7:level=false`;
  ffmpeg(['-i', src, '-af', `${shape},${level}`, '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', melody ? '96k' : '80k', dst]);
}

function music(src: string, dst: string): void {
  // body = [x, end - x]; its last x seconds are mixed with the first x seconds fading in, so the loop point is inaudible.
  const x = LOOP_XFADE_S;
  const end = duration(src);
  const graph = [
    `[0:a]asplit=3[a][b][c]`,
    `[a]atrim=0:${x},asetpts=PTS-STARTPTS,afade=t=in:d=${x}[head]`,
    `[b]atrim=${x}:${end - x},asetpts=PTS-STARTPTS[body]`,
    `[c]atrim=${end - x}:${end},asetpts=PTS-STARTPTS,afade=t=out:d=${x}[tail]`,
    `[tail][head]amix=inputs=2:normalize=0[seam]`,
    `[body][seam]concat=n=2:v=0:a=1,loudnorm=I=${MUSIC_LUFS}:TP=-3:LRA=11[out]`,
  ].join(';');
  ffmpeg(['-i', src, '-filter_complex', graph, '-map', '[out]', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', '128k', dst]);
}

mkdirSync(OUT, { recursive: true });
const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8')) as { sounds: Record<string, { file: string | null; synth?: unknown; loop?: boolean }> };
// Sources may be MP3 (ElevenLabs) or OGG (Kenney, CC0); older replaced sources wait in subfolders and are skipped.
for (const name of readdirSync(SRC).filter((f) => /.(mp3|ogg|wav)$/.test(f)).sort()) {
  const key = basename(name, extname(name));
  const file = `sounds/${key}.mp3`;
  const src = join(SRC, name);
  const dst = join(OUT, `${key}.mp3`);
  if (key.startsWith('music_')) music(src, dst);
  else sfx(src, dst, key === 'sfx_radio_melody');
  const entry = (manifest.sounds[key] ??= { file: null });
  entry.file = file;
  if (key.startsWith('music_')) entry.loop = true;
  console.log(`${file}  ${duration(dst).toFixed(2)} s  ${(statSync(dst).size / 1024).toFixed(1)} KB`);
}
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
