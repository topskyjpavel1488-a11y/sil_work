// Holds the current state, applies core actions and notifies scenes (spec 3.3).
import type { Content } from './core/content';
import { repair } from './core/repair';
import type { ActionResult, GameEvent, GameState } from './core/state';
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
    const events = this.apply(repair(this.current, this.content, objectId));
    // A repair is saved immediately (spec 7).
    if (events.some((e) => e.type === 'repaired')) this.saver.saveNow();
    return events;
  }

  // Applies a result and schedules a debounced save.
  commit(result: ActionResult): GameEvent[] {
    const events = this.apply(result);
    this.saver.requestSave();
    return events;
  }

  private apply(result: ActionResult): GameEvent[] {
    this.current = result.state;
    for (const fn of this.listeners) fn(result.events, this.current);
    return result.events;
  }
}
