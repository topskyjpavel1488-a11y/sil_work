// Renders the interface sounds procedurally into assets/files/sounds/*.wav and names them in the manifest.
// Run: npm run sounds. The output is deterministic (seeded noise), so re-running gives the same files.
// Only the sounds that synthesize well live here; debris foley and the radio melody come from the owner.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const RATE = 44100;
const ROOT = join(import.meta.dirname, '..');
const OUT_DIR = join(ROOT, 'assets/files/sounds');
const MANIFEST = join(ROOT, 'assets/manifest.json');

// Small seeded PRNG so the noise, and therefore the files, never change between runs.
function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Buf = Float32Array;
const buffer = (seconds: number): Buf => new Float32Array(Math.round(seconds * RATE));

// A decaying sine: the building block for wooden knocks, metal ticks and chimes.
function mode(buf: Buf, at: number, freq: number, amp: number, decay: number, attack = 0.002, glideTo?: number): void {
  const start = Math.round(at * RATE);
  const len = Math.min(buf.length - start, Math.round(decay * 7 * RATE));
  let phase = 0;
  for (let i = 0; i < len; i++) {
    const t = i / RATE;
    const f = glideTo === undefined ? freq : freq + (glideTo - freq) * Math.min(1, t / (decay * 3));
    phase += (2 * Math.PI * f) / RATE;
    const env = Math.min(1, t / attack) * Math.exp(-t / decay);
    buf[start + i] = (buf[start + i] ?? 0) + amp * env * Math.sin(phase);
  }
}

// RBJ biquad band-pass, used to shape noise into clicks and paper rustle.
function bandpass(input: Buf, freq: number, q: number): Buf {
  const w = (2 * Math.PI * freq) / RATE;
  const alpha = Math.sin(w) / (2 * q);
  const a0 = 1 + alpha;
  const b0 = alpha / a0, b2 = -alpha / a0, a1 = (-2 * Math.cos(w)) / a0, a2 = (1 - alpha) / a0;
  const out = new Float32Array(input.length);
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < input.length; i++) {
    const x = input[i] ?? 0;
    const y = b0 * x + b2 * x2 - a1 * y1 - a2 * y2;
    x2 = x1; x1 = x; y2 = y1; y1 = y;
    out[i] = y;
  }
  return out;
}

// A noise burst through a band-pass, with a fast attack and exponential decay; flutter adds paper-like grain.
function noise(buf: Buf, at: number, dur: number, freq: number, q: number, amp: number, decay: number, seed: number, flutter = 0): void {
  const random = rng(seed);
  const raw = new Float32Array(Math.round(dur * RATE));
  for (let i = 0; i < raw.length; i++) raw[i] = random() * 2 - 1;
  const shaped = bandpass(raw, freq, q);
  const start = Math.round(at * RATE);
  let grain = 1;
  for (let i = 0; i < shaped.length && start + i < buf.length; i++) {
    const t = i / RATE;
    if (flutter && i % 300 === 0) grain = 1 - flutter * random();
    const env = Math.min(1, t / 0.001) * Math.exp(-t / decay) * grain;
    buf[start + i] = (buf[start + i] ?? 0) + amp * env * (shaped[i] ?? 0);
  }
}

// Peak-normalise to the given level and fade the tail so nothing clicks at the end.
function finish(buf: Buf, peakDb: number): Buf {
  let peak = 0;
  for (const v of buf) peak = Math.max(peak, Math.abs(v));
  const gain = peak > 0 ? 10 ** (peakDb / 20) / peak : 1;
  const fade = Math.round(0.015 * RATE);
  for (let i = 0; i < buf.length; i++) {
    const tail = buf.length - i;
    buf[i] = (buf[i] ?? 0) * gain * (tail < fade ? tail / fade : 1);
  }
  return buf;
}

function wav(buf: Buf): Buffer {
  const data = Buffer.alloc(buf.length * 2);
  buf.forEach((v, i) => data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, v)) * 32767), i * 2));
  const head = Buffer.alloc(44);
  head.write('RIFF', 0);
  head.writeUInt32LE(36 + data.length, 4);
  head.write('WAVEfmt ', 8);
  head.writeUInt32LE(16, 16);
  head.writeUInt16LE(1, 20); // PCM
  head.writeUInt16LE(1, 22); // mono
  head.writeUInt32LE(RATE, 24);
  head.writeUInt32LE(RATE * 2, 28);
  head.writeUInt16LE(2, 32);
  head.writeUInt16LE(16, 34);
  head.write('data', 36);
  head.writeUInt32LE(data.length, 40);
  return Buffer.concat([head, data]);
}

// A short knock on wood: a click of filtered noise plus two quickly damped body modes.
function knock(buf: Buf, at: number, body: number, amp: number, seed: number): void {
  noise(buf, at, 0.02, body * 4, 1.5, amp * 0.5, 0.003, seed);
  mode(buf, at, body, amp, 0.018);
  mode(buf, at, body * 2.3, amp * 0.45, 0.009);
}

// A soft bell: a fundamental with a quiet inharmonic partial, like a small felt-struck chime.
function chime(buf: Buf, at: number, freq: number, amp: number, decay: number): void {
  mode(buf, at, freq, amp, decay, 0.004);
  mode(buf, at, freq * 2.76, amp * 0.12, decay * 0.4, 0.004);
  mode(buf, at, freq * 2, amp * 0.18, decay * 0.6, 0.004);
}

const sounds: Record<string, () => Buf> = {
  // The most frequent sound: a small muted wooden tick, kept quiet.
  sfx_tap: () => {
    const b = buffer(0.09);
    knock(b, 0, 620, 1, 11);
    return finish(b, -9);
  },
  // Opening the repair window: a brush of paper and a light knock on the bench.
  sfx_open: () => {
    const b = buffer(0.22);
    noise(b, 0, 0.16, 3200, 0.8, 0.35, 0.05, 21, 0.6);
    knock(b, 0.03, 330, 0.8, 22);
    return finish(b, -8);
  },
  // A friendly "not now": a soft thud on felt, slightly falling; kept above 180 Hz so phone speakers still play it.
  sfx_soft: () => {
    const b = buffer(0.24);
    mode(b, 0, 230, 1, 0.045, 0.004, 185);
    mode(b, 0, 470, 0.35, 0.022, 0.004);
    noise(b, 0, 0.03, 500, 1, 0.3, 0.008, 31);
    return finish(b, -7);
  },
  // Two small metal pieces click together, then a tiny rising chime.
  sfx_merge: () => {
    const b = buffer(0.32);
    noise(b, 0, 0.02, 5200, 3, 0.5, 0.004, 41);
    mode(b, 0, 2450, 0.35, 0.012);
    mode(b, 0, 3710, 0.2, 0.008);
    chime(b, 0.04, 1047, 0.5, 0.07);
    chime(b, 0.085, 1319, 0.55, 0.09);
    return finish(b, -6);
  },
  // The reward: two hammer taps on wood, then a warm major chord of soft chimes.
  sfx_repair: () => {
    const b = buffer(0.8);
    knock(b, 0, 340, 1, 51);
    knock(b, 0.13, 370, 0.9, 52);
    chime(b, 0.27, 523.25, 0.45, 0.16);
    chime(b, 0.3, 659.25, 0.4, 0.15);
    chime(b, 0.33, 783.99, 0.4, 0.17);
    chime(b, 0.36, 1046.5, 0.22, 0.14);
    return finish(b, -4);
  },
};

mkdirSync(OUT_DIR, { recursive: true });
const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8')) as { sounds: Record<string, { file: string | null }> };
for (const [key, render] of Object.entries(sounds)) {
  const file = `sounds/${key}.wav`;
  const data = wav(render());
  writeFileSync(join(ROOT, 'assets/files', file), data);
  const entry = manifest.sounds[key];
  if (entry) entry.file = file;
  console.log(`${file}  ${(data.length / 1024).toFixed(1)} KB`);
}
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
