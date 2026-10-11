// Sound by manifest key with separate music and effects channels (spec 3.3, 3.5).
// Keys without a file play a short synthesized tone through WebAudio.
import { assetUrl, manifest } from './assets';

class Audio {
  private ctx: AudioContext | null = null;
  private sfxGain: GainNode | null = null;
  private buffers = new Map<string, AudioBuffer>();
  private sfxOn = true;
  private paused = false;

  // Browsers allow audio only after a user gesture; call this from the first input.
  unlock(): void {
    if (this.ctx) {
      if (!this.paused) void this.ctx.resume().catch(() => undefined);
      return;
    }
    try {
      this.ctx = new AudioContext();
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = this.sfxOn ? 0.25 : 0;
      this.sfxGain.connect(this.ctx.destination);
      void this.loadFiles();
    } catch {
      this.ctx = null;
    }
  }

  setSfx(on: boolean): void {
    this.sfxOn = on;
    if (this.sfxGain) this.sfxGain.gain.value = on ? 0.25 : 0;
  }

  // Music is added once the owner provides a file (spec 3.5); the flag is kept for settings.
  setMusic(on: boolean): void {
    void on;
  }

  pause(): void {
    this.paused = true;
    void this.ctx?.suspend().catch(() => undefined);
  }

  resume(): void {
    this.paused = false;
    void this.ctx?.resume().catch(() => undefined);
  }

  play(key: string): void {
    const ctx = this.ctx;
    const out = this.sfxGain;
    if (!ctx || !out || !this.sfxOn || this.paused) return;
    const buffer = this.buffers.get(key);
    if (buffer) {
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(out);
      src.start();
      return;
    }
    const synth = manifest.sounds[key]?.synth;
    if (!synth) return;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    const now = ctx.currentTime;
    const dur = synth.ms / 1000;
    osc.type = (synth.wave ?? 'sine') as OscillatorType;
    osc.frequency.setValueAtTime(synth.freq, now);
    env.gain.setValueAtTime(0.0001, now);
    env.gain.exponentialRampToValueAtTime(1, now + 0.01);
    env.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(env).connect(out);
    osc.start(now);
    osc.stop(now + dur + 0.02);
  }

  private async loadFiles(): Promise<void> {
    const ctx = this.ctx;
    if (!ctx) return;
    for (const [key, entry] of Object.entries(manifest.sounds)) {
      const url = entry.file ? assetUrl(entry.file) : undefined;
      if (!url) continue;
      try {
        const data = await (await fetch(url)).arrayBuffer();
        this.buffers.set(key, await ctx.decodeAudioData(data));
      } catch {
        // A broken file falls back to the synthesized tone.
      }
    }
  }
}

export const audio = new Audio();
