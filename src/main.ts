import Phaser from 'phaser';
import { audio } from './audio';
import { DESIGN_HEIGHT, DESIGN_WIDTH } from './config';
import { createInitialState } from './core/state';
import { content } from './data';
import { setLanguage } from './i18n';
import { MockAdapter } from './platform/mock';
import { SaveManager } from './save';
import { BootScene } from './scenes/Boot';
import { WorkshopScene } from './scenes/Workshop';
import { Store } from './store';

// No context menu or long-tap menu anywhere on the page (spec 2.1, 6.1).
document.addEventListener('contextmenu', (e) => e.preventDefault());

async function start(): Promise<void> {
  const platform = new MockAdapter();
  await platform.init();
  setLanguage(platform.getLanguage());

  const saver = new SaveManager(platform);
  const saved = await saver.load();
  const store = new Store(content, saved ?? createInitialState(content), saver);
  audio.setSfx(store.state.settings.sfx);
  audio.setMusic(store.state.settings.music);

  // Audio may start only after a user gesture.
  document.addEventListener('pointerdown', () => audio.unlock());
  platform.onPause(() => audio.pause());
  platform.onResume(() => audio.resume());

  new Phaser.Game({
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
    scene: [new BootScene(), new WorkshopScene(store, platform)],
  });
}

void start();
