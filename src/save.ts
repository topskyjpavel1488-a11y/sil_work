// Save I/O (spec 7): localStorage plus the platform cloud, debounced writes, immediate flushes.
import { config } from './config';
import { migrate, parseSave, pickNewest, serializeSave } from './core/save';
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
  private cloudTimer: ReturnType<typeof setTimeout> | null = null;
  private lastCloudAt = 0;
  private pendingCloud: SaveData | null = null;
  // When local progress was last written; compared with a cloud save after sign-in.
  lastSavedAt = 0;
  private getState: () => GameState = () => {
    throw new Error('SaveManager is not attached');
  };

  constructor(private readonly platform: PlatformAdapter) {}

  async load(): Promise<SaveData | null> {
    const raw = readLocal();
    const local = parseSave(raw);
    if (local.kind === 'corrupted' && raw) writeLocal(CORRUPT_KEY, raw);
    const save = pickNewest(local.kind === 'ok' ? local.save : null, await this.loadCloud());
    this.lastSavedAt = save?.savedAt ?? 0;
    return save;
  }

  // A cloud record that fails validation is ignored like a corrupted local one.
  async loadCloud(): Promise<SaveData | null> {
    if (!this.platform.isAuthorized()) return null;
    try {
      return migrate(await this.platform.loadCloud());
    } catch {
      return null;
    }
  }

  attach(getState: () => GameState): void {
    this.getState = getState;
    const flush = () => this.saveNow(true);
    document.addEventListener('visibilitychange', () => document.hidden && flush());
    window.addEventListener('pagehide', flush);
  }

  // Groups frequent writes (merges, debris) into one per second.
  requestSave(): void {
    if (this.timer) return;
    this.timer = setTimeout(() => this.saveNow(), config.saveDebounceMs);
  }

  // Local storage is written at once; the cloud at most every few seconds (SDK rate limit),
  // except when the page is being hidden or closed.
  saveNow(urgent = false): void {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
    this.lastSavedAt = Date.now();
    const json = serializeSave(this.getState(), this.lastSavedAt);
    writeLocal(SAVE_KEY, json);
    if (!this.platform.isAuthorized()) return;
    this.pendingCloud = JSON.parse(json) as SaveData;
    const wait = this.lastCloudAt + config.cloudSaveMinIntervalMs - Date.now();
    if (urgent || wait <= 0) this.flushCloud(urgent);
    else if (!this.cloudTimer) this.cloudTimer = setTimeout(() => this.flushCloud(false), wait);
  }

  private flushCloud(urgent: boolean): void {
    if (this.cloudTimer) clearTimeout(this.cloudTimer);
    this.cloudTimer = null;
    const data = this.pendingCloud;
    if (!data) return;
    this.pendingCloud = null;
    this.lastCloudAt = Date.now();
    void this.platform.saveCloud(data, urgent).catch(() => undefined);
  }
}
