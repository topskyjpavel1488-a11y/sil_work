// Holds the current state, applies core actions and notifies scenes (spec 3.3).
import type { Content } from './core/content';
import { moveItem } from './core/merge';
import { repair } from './core/repair';
import { takeDebris } from './core/scavenge';
import { createInitialState, type ActionResult, type CellRef, type GameEvent, type GameState } from './core/state';
import { applyTutorialSignal, skipTutorialStep } from './core/tutorial';
import type { SaveManager } from './save';

type Listener = (events: GameEvent[], state: GameState) => void;

export class Store {
  private listeners = new Set<Listener>();

  constructor(
    readonly content: Content,
    private current: GameState,
    private readonly saver: SaveManager,
  ) {
    saver.attach(() => this.current);
  }

  get state(): GameState {
    return this.current;
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  repair(objectId: string): GameEvent[] {
    const events = this.apply(repair(this.current, this.content, objectId), `repaired:${objectId}`);
    // A repair is saved immediately (spec 7).
    if (events.some((e) => e.type === 'repaired')) this.saver.saveNow();
    return events;
  }

  moveItem(from: CellRef, to: CellRef): GameEvent[] {
    const result = moveItem(this.current, this.content, from, to);
    const merged = result.events.some((e) => e.type === 'itemsMerged');
    return this.commit(result, merged ? 'merged' : null);
  }

  takeDebris(zoneId: string, debrisId: string): GameEvent[] {
    return this.commit(takeDebris(this.current, this.content, zoneId, debrisId));
  }

  // Scenes report what the player did that the tutorial waits for (entering a zone, opening the table).
  tutorialSignal(signal: string): void {
    this.commit({ state: this.current, events: [] }, signal);
  }

  skipTutorialStep(): void {
    const next = skipTutorialStep(this.current, this.content.tutorial);
    this.commit({ state: next, events: [{ type: 'tutorial' }] });
  }

  setSettings(settings: Partial<GameState['settings']>): void {
    const next = structuredClone(this.current);
    next.settings = { ...next.settings, ...settings };
    this.commit({ state: next, events: [{ type: 'settings' }] });
  }

  resetProgress(): void {
    const next = createInitialState(this.content);
    next.settings = { ...this.current.settings };
    this.apply({ state: next, events: [{ type: 'reset' }] });
    this.saver.saveNow();
  }

  // Applies a result and schedules a debounced save.
  commit(result: ActionResult, tutorialSignal: string | null = null): GameEvent[] {
    const before = this.current;
    const events = this.apply(result, tutorialSignal);
    if (this.current !== before) this.saver.requestSave();
    return events;
  }

  private apply(result: ActionResult, tutorialSignal: string | null = null): GameEvent[] {
    const next = applyTutorialSignal(result.state, this.content, this.content.tutorial, tutorialSignal);
    const events = next.tutorial.step !== result.state.tutorial.step || next.tutorial.done !== result.state.tutorial.done
      ? [...result.events, { type: 'tutorial' } as const]
      : result.events;
    if (next === this.current && events.length === 0) return events;
    this.current = next;
    for (const fn of this.listeners) fn(events, this.current);
    return events;
  }
}
