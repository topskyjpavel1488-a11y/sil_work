// Save I/O (spec 7): localStorage plus the platform cloud, debounced writes, immediate flushes.
import { config } from './config';
import { parseSave, pickNewest, serializeSave } from './core/save';
import type { GameState, SaveData } from './core/state';
import type { PlatformAdapter } from './platform/adapter';

export const SAVE_KEY = 'tm_save';
const CORRUPT_KEY = 'tm_save_corrupt';

function readLocal(): string | null {
  try {
    return localStorage.getItem(SAVE_KEY);
  } catch {
    return null;
  }
}

function writeLocal(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage may be unavailable or full; the game keeps running.
  }
}

export class SaveManager {
  private timer: ReturnType<typeof setTimeout> | null = null;
  private getState: () => GameState = () => {
    throw new Error('SaveManager is not attached');
  };

  constructor(private readonly platform: PlatformAdapter) {}

  async load(): Promise<SaveData | null> {
    const raw = readLocal();
    const local = parseSave(raw);
    if (local.kind === 'corrupted' && raw) writeLocal(CORRUPT_KEY, raw);
    let cloud: SaveData | null;
    try {
      cloud = this.platform.isAuthorized() ? await this.platform.loadCloud() : null;
    } catch {
      cloud = null;
    }
    return pickNewest(local.kind === 'ok' ? local.save : null, cloud);
  }

  attach(getState: () => GameState): void {
    this.getState = getState;
    const flush = () => this.saveNow();
    document.addEventListener('visibilitychange', () => document.hidden && flush());
    window.addEventListener('pagehide', flush);
  }

  // Groups frequent writes (merges, debris) into one per second.
  requestSave(): void {
    if (this.timer) return;
    this.timer = setTimeout(() => this.saveNow(), config.saveDebounceMs);
  }

  saveNow(): void {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
    const state = this.getState();
    const json = serializeSave(state, Date.now());
    writeLocal(SAVE_KEY, json);
    if (this.platform.isAuthorized()) {
      void this.platform.saveCloud(JSON.parse(json) as SaveData).catch(() => undefined);
    }
  }
}
