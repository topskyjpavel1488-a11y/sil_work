import Phaser from 'phaser';
import { audio } from './audio';
import { BUILD, DESIGN_HEIGHT, DESIGN_WIDTH } from './config';
import { createInitialState } from './core/state';
import { content } from './data';
import { setLanguage } from './i18n';
import type { PlatformAdapter } from './platform/adapter';
import { MockAdapter } from './platform/mock';
import { YandexAdapter } from './platform/yandex';
import { SaveManager } from './save';
import { BootScene } from './scenes/Boot';
import { FinaleScene } from './scenes/Finale';
import { JournalScene } from './scenes/Journal';
import { MergeTableScene } from './scenes/MergeTable';
import { ScavengeScene } from './scenes/Scavenge';
import { WorkshopScene } from './scenes/Workshop';
import { Store } from './store';

// No context menu or long-tap menu anywhere on the page (spec 2.1, 6.1).
document.addEventListener('contextmenu', (e) => e.preventDefault());

// The release build talks to Yandex Games; if the SDK is missing or fails (for example,
// the release build opened locally), the game still runs on the local adapter.
async function createPlatform(): Promise<PlatformAdapter> {
  if (BUILD === 'release' && YandexAdapter.available()) {
    try {
      const yandex = new YandexAdapter();
      await yandex.init();
      return yandex;
    } catch {
      // Fall through to the local adapter.
    }
  }
  const mock = new MockAdapter();
  await mock.init();
  return mock;
}

async function start(): Promise<void> {
  const platform = await createPlatform();
  setLanguage(platform.getLanguage());

  const saver = new SaveManager(platform);
  const saved = await saver.load();
  const store = new Store(content, saved ?? createInitialState(content), saver);
  audio.setSfx(store.state.settings.sfx);
  audio.setMusic(store.state.settings.music);

  // Audio may start only after a user gesture.
  document.addEventListener('pointerdown', () => audio.unlock());

  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    transparent: true,
    banner: false,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: DESIGN_WIDTH,
      height: DESIGN_HEIGHT,
    },
    disableContextMenu: true,
    scene: [
      new BootScene(),
      new WorkshopScene(store, platform),
      new ScavengeScene(store),
      new MergeTableScene(store),
      new JournalScene(store),
      new FinaleScene(store),
    ],
  });

  // Hidden tab, lost focus, an ad or the platform's pause: sound off and the game stops (spec 2.1).
  platform.onPause(() => {
    audio.pause();
    game.pause();
  });
  platform.onResume(() => {
    game.resume();
    audio.resume();
  });
}

void start();
