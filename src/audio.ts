// Sound by manifest key with separate music and effects channels (spec 3.3, 3.5).
// Keys without a file play a short synthesized tone through WebAudio.
// Music: one looped track at a time (each room names its own), crossfaded on room change
// and turned down while a long effect (the radio melody) plays.
import { assetUrl, manifest } from './assets';

const SFX_VOLUME = 0.25;
const MUSIC_VOLUME = 0.3;
const MUSIC_FADE_S = 1.2;
// Effects longer than this are "listened to", so the music steps aside for them.
const DUCK_MIN_S = 2;
const DUCK_LEVEL = 0.2;

class Audio {
  private ctx: AudioContext | null = null;
  private sfxGain: GainNode | null = null;
  private musicBus: GainNode | null = null; // on/off and ducking
  private buffers = new Map<string, AudioBuffer>();
  private sfxOn = true;
  private musicOn = true;
  private paused = false;
  private musicKey: string | null = null; // the track that should play
  private track: { key: string; src: AudioBufferSourceNode; gain: GainNode } | null = null;
  private duckUntil = 0;

  // Browsers allow audio only after a user gesture; call this from the first input.
  unlock(): void {
    if (this.ctx) {
      if (!this.paused) void this.ctx.resume().catch(() => undefined);
      return;
    }
    try {
      this.ctx = new AudioContext();
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = this.sfxOn ? SFX_VOLUME : 0;
      this.sfxGain.connect(this.ctx.destination);
      this.musicBus = this.ctx.createGain();
      this.musicBus.gain.value = this.musicOn ? MUSIC_VOLUME : 0;
      this.musicBus.connect(this.ctx.destination);
      void this.loadFiles();
    } catch {
      this.ctx = null;
    }
  }

  setSfx(on: boolean): void {
    this.sfxOn = on;
    if (this.sfxGain) this.sfxGain.gain.value = on ? SFX_VOLUME : 0;
  }

  setMusic(on: boolean): void {
    this.musicOn = on;
    this.rampMusicBus(this.musicLevel(), 0.4);
  }

  // The room's background track; null keeps silence. Safe to call before audio is unlocked or loaded.
  playMusic(key: string | null): void {
    this.musicKey = key;
    this.syncMusic();
  }

  pause(): void {
    this.paused = true;
    void this.ctx?.suspend().catch(() => undefined);
  }

  resume(): void {
    this.paused = false;
    void this.ctx?.resume().catch(() => undefined);
  }

  // vary: random pitch spread (0.08 = ±8%), so a sound heard many times in a row does not tire the ear.
  play(key: string, vary = 0): void {
    const ctx = this.ctx;
    const out = this.sfxGain;
    if (!ctx || !out || !this.sfxOn || this.paused) return;
    const buffer = this.buffers.get(key);
    if (buffer) {
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      if (vary > 0) src.playbackRate.value = 1 + (Math.random() * 2 - 1) * vary;
      src.connect(out);
      src.start();
      if (buffer.duration >= DUCK_MIN_S) this.duck(buffer.duration);
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

  private musicLevel(): number {
    if (!this.musicOn) return 0;
    return this.ctx && this.ctx.currentTime < this.duckUntil ? MUSIC_VOLUME * DUCK_LEVEL : MUSIC_VOLUME;
  }

  private rampMusicBus(level: number, seconds: number): void {
    const ctx = this.ctx;
    const bus = this.musicBus;
    if (!ctx || !bus) return;
    const now = ctx.currentTime;
    bus.gain.cancelScheduledValues(now);
    bus.gain.setValueAtTime(bus.gain.value, now);
    bus.gain.linearRampToValueAtTime(level, now + seconds);
  }

  private duck(seconds: number): void {
    const ctx = this.ctx;
    if (!ctx || !this.musicOn) return;
    this.duckUntil = ctx.currentTime + seconds;
    this.rampMusicBus(MUSIC_VOLUME * DUCK_LEVEL, 0.3);
    window.setTimeout(() => this.rampMusicBus(this.musicLevel(), 1.5), seconds * 1000);
  }

  // Starts the wanted track (with a fade) once its buffer is ready and fades out the previous one.
  private syncMusic(): void {
    const ctx = this.ctx;
    const bus = this.musicBus;
    if (!ctx || !bus || this.track?.key === this.musicKey) return;
    const buffer = this.musicKey ? this.buffers.get(this.musicKey) : undefined;
    if (this.musicKey && !buffer) return; // not loaded yet; loadFiles calls back
    const now = ctx.currentTime;
    if (this.track) {
      const old = this.track;
      old.gain.gain.cancelScheduledValues(now);
      old.gain.gain.setValueAtTime(old.gain.gain.value, now);
      old.gain.gain.linearRampToValueAtTime(0, now + MUSIC_FADE_S);
      old.src.stop(now + MUSIC_FADE_S + 0.05);
      this.track = null;
    }
    if (!buffer || !this.musicKey) return;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(1, now + MUSIC_FADE_S);
    src.connect(gain).connect(bus);
    src.start(now);
    this.track = { key: this.musicKey, src, gain };
  }

  private async loadFiles(): Promise<void> {
    const ctx = this.ctx;
    if (!ctx) return;
    // Effects first: they are small and needed at once; the music tracks follow.
    const entries = Object.entries(manifest.sounds).sort(([a], [b]) => Number(a.startsWith('music_')) - Number(b.startsWith('music_')));
    for (const [key, entry] of entries) {
      const url = entry.file ? assetUrl(entry.file) : undefined;
      if (!url) continue;
      try {
        const data = await (await fetch(url)).arrayBuffer();
        this.buffers.set(key, await ctx.decodeAudioData(data));
        if (key === this.musicKey) this.syncMusic();
      } catch {
        // A broken file falls back to the synthesized tone (effects) or silence (music).
      }
    }
  }
}

export const audio = new Audio();
