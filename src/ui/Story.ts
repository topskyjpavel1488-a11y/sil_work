// The opening story (spec 4.6, v0.8): the story cards one after another with Next and Skip.
// Shown once in a new game and again on request from the settings.
import type Phaser from 'phaser';
import type { Content } from '../core/content';
import { showFindCard } from './FindCard';

// lastButtonKey: "Start" before the first game, "Close" when replayed from the settings.
export function playStory(scene: Phaser.Scene, content: Content, lastButtonKey: string, onDone: () => void): void {
  const show = (i: number) => {
    const card = content.story[i];
    if (!card) return onDone();
    const last = i === content.story.length - 1;
    showFindCard(
      scene,
      { ...card, buttonKey: last ? lastButtonKey : 'ui.next', secondary: last ? undefined : { labelKey: 'tutorial.skip', onTap: onDone } },
      () => show(i + 1),
    );
  };
  show(0);
}
