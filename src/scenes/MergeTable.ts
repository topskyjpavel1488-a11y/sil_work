// Merge table: 4x5 board plus a 6-cell box; move items by dragging or by tapping item then cell (spec 4.3, 6.2).
import Phaser from 'phaser';
import { audio } from '../audio';
import { DESIGN_HEIGHT, DESIGN_WIDTH, FEEDBACK, PALETTE, UI_SOUNDS } from '../config';
import { maxLevel } from '../core/content';
import type { CellArea, CellRef, GameEvent, GameState } from '../core/state';
import { currentTutorialStep } from '../core/tutorial';
import { t } from '../i18n';
import { rect, type Rect } from '../layout';
import type { Ads } from '../ads';
import { canGrantWasher } from '../core/rewards';
import type { Store } from '../store';
import { Button } from '../ui/Button';
import { addItemView } from '../ui/ItemView';
import { ResourceBar } from '../ui/ResourceBar';
import { TutorialOverlay } from '../ui/TutorialOverlay';
import { COLORS, textStyle } from '../ui/style';
import { fadeIn, goTo } from '../ui/transition';
import { onTap } from '../ui/tap';

const SECTION = 'table';
const DRAG_THRESHOLD = 12;

const key = (c: CellRef) => `${c.area}.${c.index}`;
const same = (a: CellRef | null, b: CellRef | null) => !!a && !!b && a.area === b.area && a.index === b.index;

export class MergeTableScene extends Phaser.Scene {
  private cells: { ref: CellRef; r: Rect }[] = [];
  private items = new Map<string, Phaser.GameObjects.Container>();
  private highlight!: Phaser.GameObjects.Graphics;
  private resources!: ResourceBar;
  private selected: CellRef | null = null;
  private reward: Button | null = null;
  private tutorial!: TutorialOverlay;

  constructor(
    private readonly store: Store,
    private readonly ads: Ads,
  ) {
    super('MergeTable');
  }

  create(): void {
    this.cells = [];
    this.items.clear();
    this.selected = null;
    fadeIn(this);
    this.input.dragDistanceThreshold = DRAG_THRESHOLD;
    this.add.rectangle(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT, PALETTE.cream).setOrigin(0);

    this.resources = new ResourceBar(this, this.store.content, rect(SECTION, 'ui.resources'));
    this.resources.update(this.store.state);

    const state = this.store.state;
    const addCells = (area: CellArea, count: number, fill: number) => {
      for (let index = 0; index < count; index++) {
        const ref = { area, index };
        const r = rect(SECTION, `cell.${area}.${index}`);
        const bg = this.add.graphics();
        bg.fillStyle(fill, 1);
        bg.fillRoundedRect(r.x, r.y, r.w, r.h, 16);
        // Empty cells take taps as the target of a tap-tap move.
        const zone = this.add.zone(r.x, r.y, r.w, r.h).setOrigin(0).setInteractive();
        onTap(zone, () => this.onCellTap(ref));
        this.cells.push({ ref, r });
      }
    };
    addCells('board', state.board.length, 0xe6ddcc);
    const label = rect(SECTION, 'ui.boxLabel');
    this.add.text(label.x, label.y + label.h / 2, t('ui.table.box'), textStyle(32, COLORS.text)).setOrigin(0, 0.5);
    addCells('box', state.box.length, 0xd6cbb8);

    this.highlight = this.add.graphics().setDepth(5);
    // R2 sits next to a narrower Back button in the release build (spec 8.4).
    this.reward = null;
    const back = rect(SECTION, this.ads.enabled ? 'ui.backWithReward' : 'ui.back');
    new Button(this, { ...back, label: t('ui.back'), fill: PALETTE.wood, onTap: () => !this.ads.busy && goTo(this, 'Workshop') });
    if (this.ads.enabled) {
      const reward: Button = new Button(this, {
        ...rect(SECTION, 'ui.reward'),
        label: t('ui.reward.washer'),
        fill: PALETTE.copper,
        fontSize: 32,
        onTap: () => {
          reward.setEnabled(false);
          void this.ads.rewarded('washer').then(() => this.updateReward(this.store.state));
        },
      });
      this.reward = reward;
      this.updateReward(state);
    }

    this.tutorial = new TutorialOverlay(this, this.store, rect(SECTION, 'ui.tutorial'));
    this.renderItems(state);
    this.store.tutorialSignal('enterTable');
    this.updateTutorial(this.store.state);
    const unsubscribe = this.store.subscribe((events, s) => this.onChange(events, s));
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, unsubscribe);
  }

  private renderItems(state: GameState): void {
    for (const item of this.items.values()) item.destroy();
    this.items.clear();
    for (const { ref, r } of this.cells) {
      const item = state[ref.area][ref.index];
      if (!item) continue;
      const view = addItemView(this, this.store.content, item.chain, item.level, r).setDepth(10);
      view.setInteractive({ useHandCursor: true, draggable: true });
      this.input.setDraggable(view);
      let dragging = false;
      view.on('dragstart', () => {
        dragging = true;
        this.select(null);
        view.setDepth(20).setScale(1.1);
      });
      view.on('drag', (_p: Phaser.Input.Pointer, x: number, y: number) => view.setPosition(x, y));
      view.on('dragend', (p: Phaser.Input.Pointer) => {
        const target = this.cellAt(p.worldX, p.worldY);
        if (target && !same(target, ref)) {
          this.move(ref, target);
        } else {
          this.tweens.add({ targets: view, x: r.x + r.w / 2, y: r.y + r.h / 2, scale: 1, duration: FEEDBACK.tapMs });
          view.setDepth(10);
        }
      });
      onTap(view, () => {
        // A drag also ends with pointerup; only a plain tap selects.
        if (dragging) {
          dragging = false;
          return;
        }
        this.onCellTap(ref);
      });
      this.items.set(key(ref), view);
    }
    this.drawHighlight();
  }

  private onCellTap(ref: CellRef): void {
    const hasItem = !!this.store.state[ref.area][ref.index];
    if (!this.selected) {
      if (hasItem) {
        audio.play(UI_SOUNDS.tap);
        this.select(ref);
      }
      return;
    }
    if (same(this.selected, ref)) {
      this.select(null);
      return;
    }
    const from = this.selected;
    this.select(null);
    this.move(from, ref);
  }

  private move(from: CellRef, to: CellRef): void {
    const events = this.store.moveItem(from, to);
    if (!events.some((e) => e.type === 'itemsMerged')) audio.play(UI_SOUNDS.tap);
  }

  private select(ref: CellRef | null): void {
    this.selected = ref;
    this.drawHighlight();
    for (const [k, view] of this.items) {
      const on = !!ref && k === key(ref);
      this.tweens.add({ targets: view, scale: on ? 1.08 : 1, duration: FEEDBACK.tapMs });
    }
  }

  private drawHighlight(): void {
    this.highlight.clear();
    const cell = this.cells.find((c) => same(c.ref, this.selected));
    if (!cell) return;
    this.highlight.lineStyle(8, PALETTE.copper, 1);
    this.highlight.strokeRoundedRect(cell.r.x - 4, cell.r.y - 4, cell.r.w + 8, cell.r.h + 8, 20);
  }

  private cellAt(x: number, y: number): CellRef | null {
    return this.cells.find(({ r }) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h)?.ref ?? null;
  }

  // Shows two matching items to merge, or the way back once the next step is the repair.
  private updateTutorial(state: GameState): void {
    const step = currentTutorialStep(state, this.store.content.tutorial);
    const targets: Rect[] = [];
    if (step?.target.type === 'mergePair') {
      const pair = this.findPair(state);
      if (pair) targets.push(...pair.map((ref) => this.cells.find((c) => same(c.ref, ref))?.r).filter((r): r is Rect => !!r));
    }
    if (step?.target.type === 'object') targets.push(rect(SECTION, 'ui.back'));
    this.tutorial.show(targets.length ? step : null, targets);
  }

  private findPair(state: GameState): [CellRef, CellRef] | null {
    const seen = new Map<string, CellRef>();
    for (const { ref } of this.cells) {
      const item = state[ref.area][ref.index];
      if (!item || item.level >= maxLevel(this.store.content, item.chain)) continue;
      const k = `${item.chain}:${item.level}`;
      const first = seen.get(k);
      if (first) return first.area === 'board' ? [ref, first] : [first, ref];
      seen.set(k, ref);
    }
    return null;
  }

  // Offered only while a washer has somewhere to go.
  private updateReward(state: GameState): void {
    if (!this.reward) return;
    this.reward.setVisible(canGrantWasher(state)).setEnabled(!this.ads.busy);
  }

  private onChange(events: GameEvent[], state: GameState): void {
    this.resources.update(state);
    this.updateReward(state);
    this.renderItems(state);
    this.updateTutorial(state);
    for (const e of events) {
      if (e.type === 'itemsMerged') {
        audio.play(UI_SOUNDS.merge);
        const view = this.items.get(key(e.to));
        if (view) {
          this.tweens.add({ targets: view, scale: 1.2, duration: FEEDBACK.mergeBounceMs / 2, yoyo: true, ease: 'Sine.easeOut' });
        }
      }
    }
  }
}
