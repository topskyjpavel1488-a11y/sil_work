import { config } from '../config';
import type { SaveData } from '../core/state';
import type { PlatformAdapter } from './adapter';

const CLOUD_KEY = 'tm_mock_cloud';

function readStorage(key: string): string | null {
  try {
    return globalThis.localStorage?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string): void {
  try {
    globalThis.localStorage?.setItem(key, value);
  } catch {
    // Storage may be unavailable (private mode, blocked site data); memory copy still works.
  }
}

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// Local development and tests: data in memory + localStorage, ads are a 1 s delay (spec 3.4).
export class MockAdapter implements PlatformAdapter {
  private cloud: SaveData | null = null;
  private authorized = false;
  private pauseHandlers: (() => void)[] = [];
  private resumeHandlers: (() => void)[] = [];

  constructor(private readonly lang: 'ru' | 'en' = 'ru') {}

  async init(): Promise<void> {
    const raw = readStorage(CLOUD_KEY);
    if (raw) {
      try {
        this.cloud = JSON.parse(raw) as SaveData;
      } catch {
        this.cloud = null;
      }
    }
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) this.emitPause();
        else this.emitResume();
      });
      window.addEventListener('blur', () => this.emitPause());
      window.addEventListener('focus', () => this.emitResume());
    }
  }

  gameReady(): void {
    if (typeof performance !== 'undefined') performance.mark('tm-game-ready');
  }

  gameplayStart(): void {}

  gameplayStop(): void {}

  getLanguage(): 'ru' | 'en' {
    return this.lang;
  }

  async loadCloud(): Promise<SaveData | null> {
    return this.cloud ? structuredClone(this.cloud) : null;
  }

  async saveCloud(data: SaveData): Promise<void> {
    this.cloud = structuredClone(data);
    writeStorage(CLOUD_KEY, JSON.stringify(data));
  }

  isAuthorized(): boolean {
    return this.authorized;
  }

  async requestAuth(): Promise<boolean> {
    this.authorized = true;
    return true;
  }

  async showInterstitial(): Promise<void> {
    this.emitPause();
    await delay(config.mockAdDelayMs);
    this.emitResume();
  }

  async showRewarded(): Promise<boolean> {
    this.emitPause();
    await delay(config.mockAdDelayMs);
    this.emitResume();
    return true;
  }

  onPause(cb: () => void): void {
    this.pauseHandlers.push(cb);
  }

  onResume(cb: () => void): void {
    this.resumeHandlers.push(cb);
  }

  private emitPause(): void {
    for (const cb of this.pauseHandlers) cb();
  }

  private emitResume(): void {
    for (const cb of this.resumeHandlers) cb();
  }
}
