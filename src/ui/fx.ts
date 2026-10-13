// Small effects drawn in code, no art files (spec 6.3, v0.8): sparks, dust, flying icons, glows and
// floating dust in the light. No vibration: in the Yandex Games iframe the browser blocks it and logs an error.
import Phaser from 'phaser';
import { PALETTE } from '../config';

const DOT = 'fx_dot';
const GLOW = 'fx_glow';

// Textures are shared by all scenes, so they are made once.
export function ensureFxTextures(scene: Phaser.Scene): void {
  if (!scene.textures.exists(DOT)) {
    const g = scene.make.graphics({}, false);
    g.fillStyle(0xffffff, 1).fillCircle(8, 8, 8);
    g.generateTexture(DOT, 16, 16);
    g.destroy();
  }
  if (!scene.textures.exists(GLOW)) {
    const size = 128;
    const canvas = scene.textures.createCanvas(GLOW, size, size);
    const ctx = canvas?.getContext();
    if (ctx && canvas) {
      const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.4, 'rgba(255,255,255,0.45)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      canvas.refresh();
    }
  }
}

function burst(scene: Phaser.Scene, x: number, y: number, config: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig, count: number, depth = 600): void {
  ensureFxTextures(scene);
  const emitter = scene.add.particles(x, y, DOT, { ...config, emitting: false }).setDepth(depth);
  emitter.explode(count);
  scene.time.delayedCall(Number(config.lifespan ?? 800) + 200, () => emitter.destroy());
}

// Merge: a small bright spray of sparks.
export function sparkBurst(scene: Phaser.Scene, x: number, y: number): void {
  burst(
    scene,
    x,
    y,
    { speed: { min: 140, max: 320 }, lifespan: 520, scale: { start: 0.9, end: 0 }, alpha: { start: 1, end: 0 }, tint: [PALETTE.copper, 0xffd27a, 0xfff3d6], blendMode: 'ADD' },
    16,
  );
}

// Repair or a taken pile: a puff of dust rising from the bottom edge of a rect.
export function dustPuff(scene: Phaser.Scene, x: number, y: number, width: number): void {
  burst(
    scene,
    x,
    y,
    {
      x: { min: -width / 2, max: width / 2 },
      speedY: { min: -140, max: -40 },
      speedX: { min: -50, max: 50 },
      lifespan: 900,
      scale: { start: 1.6, end: 0.2 },
      alpha: { start: 0.55, end: 0 },
      tint: [PALETTE.dust, 0xb8a58c, 0xe8dcc4],
    },
    Math.round(Math.min(26, 10 + width / 40)),
  );
}

// Gains: a few icons arc from the pile to their counter; onArrive runs once the first lands.
export function flyIcons(scene: Phaser.Scene, key: string, from: { x: number; y: number }, to: { x: number; y: number }, count: number, onArrive?: () => void): void {
  if (!scene.textures.exists(key)) return;
  let arrived = false;
  for (let i = 0; i < count; i++) {
    const icon = scene.add.image(from.x + (i - (count - 1) / 2) * 22, from.y, key).setDepth(650);
    icon.setScale(56 / Math.max(icon.width, icon.height));
    const mid = { x: (from.x + to.x) / 2 + (i - 1) * 40, y: Math.min(from.y, to.y) - 80 };
    const curve = new Phaser.Curves.QuadraticBezier(new Phaser.Math.Vector2(icon.x, icon.y), new Phaser.Math.Vector2(mid.x, mid.y), new Phaser.Math.Vector2(to.x, to.y));
    const progress = { t: 0 };
    scene.tweens.add({
      targets: progress,
      t: 1,
      delay: i * 90,
      duration: 650,
      ease: 'Sine.easeIn',
      onUpdate: () => {
        const p = curve.getPoint(progress.t);
        icon.setPosition(p.x, p.y).setScale((56 - 24 * progress.t) / Math.max(icon.width, icon.height));
      },
      onComplete: () => {
        icon.destroy();
        if (!arrived) {
          arrived = true;
          onArrive?.();
        }
      },
    });
  }
}

// A soft pulsing glow (a lit lamp, a radio dial), additive so it only brightens.
export function addGlow(scene: Phaser.Scene, x: number, y: number, radius: number, color: number): Phaser.GameObjects.Image {
  ensureFxTextures(scene);
  const glow = scene.add.image(x, y, GLOW).setTint(color).setBlendMode(Phaser.BlendModes.ADD).setAlpha(0.18);
  glow.setScale((radius * 2) / 128);
  scene.tweens.add({ targets: glow, alpha: 0.34, duration: 1800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
  return glow;
}

// Dust motes slowly drifting in the light over the room; few and faint so they never distract.
export function ambientDust(scene: Phaser.Scene, area: { x: number; y: number; w: number; h: number }): Phaser.GameObjects.Particles.ParticleEmitter {
  ensureFxTextures(scene);
  return scene.add.particles(0, 0, DOT, {
    x: { min: area.x, max: area.x + area.w },
    y: { min: area.y, max: area.y + area.h * 0.8 },
    speedX: { min: -8, max: 8 },
    speedY: { min: -12, max: 6 },
    lifespan: { min: 4000, max: 7000 },
    scale: { min: 0.2, max: 0.45 },
    alpha: { start: 0.5, end: 0 },
    tint: [0xfff3d6, 0xffd27a],
    blendMode: 'ADD',
    frequency: 350,
    maxAliveParticles: 18,
  });
}
