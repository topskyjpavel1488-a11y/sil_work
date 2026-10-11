import Phaser from 'phaser';
import { DESIGN_HEIGHT, DESIGN_WIDTH } from './config';
import { MockAdapter } from './platform/mock';
import { BootScene } from './scenes/Boot';

// No context menu or long-tap menu anywhere on the page (spec 2.1, 6.1).
document.addEventListener('contextmenu', (e) => e.preventDefault());

async function start(): Promise<void> {
  const platform = new MockAdapter();
  await platform.init();

  new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#2b2622',
    banner: false,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: DESIGN_WIDTH,
      height: DESIGN_HEIGHT,
    },
    disableContextMenu: true,
    scene: [new BootScene(platform)],
  });
}

void start();
