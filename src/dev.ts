// Development-only helpers, loaded through a dynamic import guarded by import.meta.env.DEV,
// so none of this reaches `npm run build`.
import { audio } from './audio';
import type Phaser from 'phaser';
import { rect } from './layout';
import type { Store } from './store';
import { Button } from './ui/Button';

// Grants resources and a level 2 item so repairs can be tried before scavenging exists.
export function addDevButton(scene: Phaser.Scene, store: Store): void {
  // Console helper for checking scenes by hand: __tm.start('Finale', { roomId: 'workshop' }).
  (window as unknown as { __tm: unknown }).__tm = { start: (key: string, data?: object) => scene.scene.start(key, data), store, game: scene.game, audio };
  // Screenshot mode: no debug button in the picture. __tm.shot('name') saves the canvas to assets/store/screenshots/.
  if (new URLSearchParams(location.search).has('shot')) {
    Object.assign((window as unknown as { __tm: object }).__tm, {
      shot: (name: string) =>
        new Promise<string>((resolve) =>
          scene.game.renderer.snapshot((img) => {
            const canvas = document.createElement('canvas');
            const image = img as HTMLImageElement;
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return resolve('no canvas');
            ctx.fillStyle = '#f3e9d2';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0);
            canvas.toBlob((blob) => void fetch(`/__shot?name=${name}`, { method: 'POST', body: blob }).then(() => resolve(`${canvas.width}x${canvas.height}`)), 'image/png');
          }),
        ),
    });
    return;
  }
  const goal = rect('workshop', 'ui.goal');
  new Button(scene, {
    x: goal.x + goal.w - 128,
    y: goal.y + 20,
    w: 112,
    h: 96,
    label: 'DEV+',
    fill: 0xaa3333,
    fontSize: 32,
    onTap: () => {
      const next = structuredClone(store.state);
      next.resources.wood += 5;
      next.resources.metal += 5;
      next.resources.parts += 5;
      const free = next.board.findIndex((c) => c === null);
      if (free >= 0) next.board[free] = { chain: 'fasteners', level: 2 };
      store.commit({ state: next, events: [] });
    },
  }).setAlpha(0.8);
}
