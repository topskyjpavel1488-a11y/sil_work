import type { SaveData } from '../core/state';

// The rest of the game talks to the platform only through this interface (spec 3.4).
export interface PlatformAdapter {
  init(): Promise<void>;
  gameReady(): void;
  gameplayStart(): void;
  gameplayStop(): void;
  getLanguage(): 'ru' | 'en';
  loadCloud(): Promise<SaveData | null>;
  saveCloud(data: SaveData, flush?: boolean): Promise<void>; // flush: send now instead of queueing
  isAuthorized(): boolean;
  requestAuth(): Promise<boolean>;
  showInterstitial(): Promise<void>;
  showRewarded(): Promise<boolean>;
  // The platform's own "rate the game" popup: 'sent' or 'closed' once shown, 'unavailable' when it
  // cannot be shown now (guest, already rated, already asked this session).
  requestReview(): Promise<'sent' | 'closed' | 'unavailable'>;
  // "Add a shortcut to the desktop", where the device and browser allow it.
  canShowShortcut(): Promise<boolean>;
  showShortcut(): Promise<boolean>;
  onPause(cb: () => void): void;
  onResume(cb: () => void): void;
}
