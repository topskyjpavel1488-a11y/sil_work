// Lower-bound playtime: how fast a player who knows the game and taps without reading can finish.
// Yandex Games rule 2.9 wants the main content to take more than 10 minutes, and reviewers
// play fast. Seconds per action include the game's own animations and transitions.
import type { Content } from '../src/core/content';
import type { BotResult } from './bot';

export const SPEEDRUN_SECONDS = {
  load: 3,
  tutorialStep: 0.8, // tapping Skip
  debris: 0.6, // tap; the next tap can follow while the item fades
  merge: 1.2, // drag one item onto another
  move: 1.0, // drag to a free cell
  repair: 2.2, // open the window, press Repair, repair flash
  find: 1.8, // card appears after the repair, then Close
  zoneVisit: 2.6, // tap the zone, fade in, cleared panel, back to the workshop
  tableVisit: 2.0, // open the table and come back
  finale: 2.0,
} as const;

export function speedrunMinutes(content: Content, bot: BotResult): { minutes: number; parts: Record<string, number> } {
  const t = SPEEDRUN_SECONDS;
  // A trip to the table before every repair that asks for items.
  const tableVisits = content.objects.reduce((n, o) => n + o.steps.filter((s) => (s.cost.items ?? []).length > 0).length, 0);
  const parts = {
    load: t.load,
    tutorial: content.tutorial.length * t.tutorialStep,
    debris: bot.counts.debris * t.debris,
    merges: bot.counts.merges * t.merge,
    moves: bot.counts.moves * t.move,
    repairs: bot.counts.repairs * t.repair,
    finds: content.finds.length * t.find,
    zones: content.zones.length * t.zoneVisit,
    table: tableVisits * t.tableVisit,
    finale: content.rooms.length * t.finale,
    intros: content.rooms.filter((r) => r.intro).length * t.find,
  };
  const seconds = Object.values(parts).reduce((a, b) => a + b, 0);
  return { minutes: seconds / 60, parts };
}
