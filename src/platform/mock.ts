import { config } from '../config';
import type { SaveData } from '../core/state';
import type { PlatformAdapter } from './adapter';
import { PauseTracker } from './pause';

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
  private pause = new PauseTracker();

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
    this.pause.watchPage();
  }

  gameReady(): void {
    if (typeof performance !== 'undefined') performance.mark('tm-game-ready');
  }

  gameplayStart(): void {}

  gameplayStop(): void {}

  getLanguage(): 'ru' | 'en' {
    return this.lang;
  }

  // Outside Yandex Games there is no review popup and no shortcut.
  async requestReview(): Promise<'sent' | 'closed' | 'unavailable'> {
    return 'unavailable';
  }

  async canShowShortcut(): Promise<boolean> {
    return false;
  }

  async showShortcut(): Promise<boolean> {
    return false;
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
    this.pause.set('ad', true);
    await delay(config.mockAdDelayMs);
    this.pause.set('ad', false);
  }

  async showRewarded(): Promise<boolean> {
    this.pause.set('ad', true);
    await delay(config.mockAdDelayMs);
    this.pause.set('ad', false);
    return true;
  }

  onPause(cb: () => void): void {
    this.pause.onPause(cb);
  }

  onResume(cb: () => void): void {
    this.pause.onResume(cb);
  }
}
