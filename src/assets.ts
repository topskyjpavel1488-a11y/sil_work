// Graphics by manifest key (spec 3.5). A key with a file shows the image, otherwise a placeholder,
// so dropping a real file into assets/files/ and naming it in the manifest needs no code change.
import Phaser from 'phaser';
import manifestJson from '../assets/manifest.json';
import { PALETTE } from './config';
import type { Rect } from './layout';

interface ImageEntry {
  file: string | null;
  placeholder?: { color: string };
}

interface SoundEntry {
  file: string | null;
  synth?: { freq: number; ms: number; wave?: string };
}

export const manifest = manifestJson as { images: Record<string, ImageEntry>; sounds: Record<string, SoundEntry> };

const fileUrls = import.meta.glob('../assets/files/**/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

export const assetUrl = (file: string) => fileUrls[`../assets/files/${file}`];

export function preloadImages(scene: Phaser.Scene): void {
  for (const [key, entry] of Object.entries(manifest.images)) {
    const url = entry.file ? assetUrl(entry.file) : undefined;
    if (url) scene.load.image(key, url);
  }
}

export function parseColor(color: string | undefined): number {
  if (!color) return PALETTE.dust;
  if (color.startsWith('#')) return parseInt(color.slice(1), 16);
  return PALETTE[color as keyof typeof PALETTE] ?? PALETTE.dust;
}

export const placeholderColor = (key: string) => parseColor(manifest.images[key]?.placeholder?.color);

// Draws the asset centred in a container of the rect's size; the container is what scenes animate.
export function addAsset(scene: Phaser.Scene, key: string, r: Rect): Phaser.GameObjects.Container {
  const box = scene.add.container(r.x + r.w / 2, r.y + r.h / 2);
  box.setSize(r.w, r.h);
  setAsset(scene, box, key);
  return box;
}

export function setAsset(scene: Phaser.Scene, box: Phaser.GameObjects.Container, key: string): void {
  box.removeAll(true);
  const { width: w, height: h } = box;
  if (scene.textures.exists(key)) {
    // Fit inside the rect keeping proportions, so art of any aspect is never stretched.
    const image = scene.add.image(0, 0, key);
    image.setScale(Math.min(w / image.width, h / image.height));
    box.add(image);
    return;
  }
  const g = scene.add.graphics();
  g.fillStyle(placeholderColor(key), 1);
  g.fillRoundedRect(-w / 2, -h / 2, w, h, Math.min(20, w / 4, h / 4));
  g.lineStyle(3, PALETTE.metal, 0.25);
  g.strokeRoundedRect(-w / 2, -h / 2, w, h, Math.min(20, w / 4, h / 4));
  box.add(g);
}
