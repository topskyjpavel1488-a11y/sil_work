import type { SaveData } from '../core/state';

// The rest of the game talks to the platform only through this interface (spec 3.4).
export interface PlatformAdapter {
  init(): Promise<void>;
  gameReady(): void;
  gameplayStart(): void;
  gameplayStop(): void;
  getLanguage(): 'ru' | 'en';
  loadCloud(): Promise<SaveData | null>;
  saveCloud(data: SaveData): Promise<void>;
  isAuthorized(): boolean;
  requestAuth(): Promise<boolean>;
  showInterstitial(): Promise<void>;
  showRewarded(): Promise<boolean>;
  onPause(cb: () => void): void;
  onResume(cb: () => void): void;
}
