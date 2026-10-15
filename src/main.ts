import Phaser from 'phaser';
import { Ads } from './ads';
import { audio } from './audio';
import { session } from './session';
import { BUILD, config, DESIGN_HEIGHT, DESIGN_WIDTH, ITCH } from './config';
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
import { setTextResolution, setTextScale } from './ui/style';

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
  // The test build has no SDK: ?lang=en shows the English version (checking texts, English store media).
  // On itch.io the browser language decides: Russian for Russian speakers, English for everyone else.
  const asked = new URLSearchParams(location.search).get('lang');
  const browserRu = typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('ru');
  const lang = asked === 'en' || asked === 'ru' ? asked : ITCH && !browserRu ? 'en' : 'ru';
  const mock = new MockAdapter(lang);
  await mock.init();
  return mock;
}

async function start(): Promise<void> {
  const platform = await createPlatform();
  setLanguage(platform.getLanguage());

  const saver = new SaveManager(platform);
  const saved = await saver.load();
  session.lastSeen = saved?.savedAt ?? 0;
  const store = new Store(content, saved ?? createInitialState(content), saver);
  // A player without any save is in their first session: no ads in its first minutes (spec 8.3).
  const ads = new Ads(platform, store, saver, saved === null);
  audio.setSfx(store.state.settings.sfx);
  audio.setMusic(store.state.settings.music);
  setTextScale(store.state.settings.largeText ? config.largeTextScale : 1);

  // Audio may start only after a user gesture.
  document.addEventListener('pointerdown', () => audio.unlock());

  // Dev only: ?shot renders at 1080×1920 for store screenshots (see src/dev.ts).
  const shot = import.meta.env.DEV && new URLSearchParams(location.search).has('shot') ? 1.5 : 1;
  if (shot !== 1) setTextResolution(shot);
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    transparent: true,
    banner: false,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: DESIGN_WIDTH * shot,
      height: DESIGN_HEIGHT * shot,
    },
    disableContextMenu: true,
    scene: [
      new BootScene(),
      new WorkshopScene(store, platform, ads),
      new ScavengeScene(store, ads),
      new MergeTableScene(store, ads),
      new JournalScene(store),
      new FinaleScene(store, platform),
    ],
  });

  if (shot !== 1) {
    game.events.once(Phaser.Core.Events.READY, () => {
      for (const scene of game.scene.scenes) {
        scene.events.on(Phaser.Scenes.Events.CREATE, () => scene.cameras.main.setZoom(shot).centerOn(DESIGN_WIDTH / 2, DESIGN_HEIGHT / 2));
      }
    });
  }

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
