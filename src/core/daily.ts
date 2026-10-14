// Coming back to the game (spec v0.8, retention): a small daily gift and a "welcome back" reminder.
// Pure functions; the scene decides when to show the card.
import { config } from '../config';
import type { Content } from './content';
import { currentGoal } from './progress';
import { checkRepair } from './repair';
import { cloneState, RESOURCES, type ActionResult, type GameState, type Resource } from './state';

export type Gift = Partial<Record<Resource, number>>;

// The local calendar day, so the gift resets at the player's midnight.
export function dayKey(now: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

// What today's gift holds: mostly the resource the current goal still lacks, plus one of the next kind.
// Nothing once every object is restored: there is nothing left to spend it on.
export function giftFor(state: GameState, content: Content): Gift {
  const goal = currentGoal(state, content);
  if (!goal) return {};
  const lacking = checkRepair(state, content, goal.object.id).requirements.flatMap((r) =>
    r.kind === 'resource' && r.have < r.need ? [{ resource: r.resource, missing: r.need - r.have }] : [],
  );
  const main: Resource = lacking[0]?.resource ?? 'wood';
  const mainCount = Math.max(1, Math.min(lacking[0]?.missing ?? config.dailyGift.main, config.dailyGift.main));
  const other = RESOURCES[(RESOURCES.indexOf(main) + 1) % RESOURCES.length];
  const gift: Gift = { [main]: mainCount };
  if (other) gift[other] = config.dailyGift.other;
  return gift;
}

// Is a gift waiting today? The very first day only starts the count, so a new player is not greeted with one.
export const giftDue = (state: GameState, day: string) => !!state.giftDay && state.giftDay !== day && state.tutorial.done;

// Marks today as handled and adds the gift when one is due. No events: the card is shown before the claim.
export function claimGift(state: GameState, content: Content, day: string): ActionResult & { gift: Gift } {
  if (state.giftDay === day) return { state, events: [], gift: {} };
  const next = cloneState(state);
  const gift = giftDue(state, day) ? giftFor(state, content) : {};
  for (const [r, n] of Object.entries(gift) as [Resource, number][]) next.resources[r] += n;
  next.giftDay = day;
  return { state: next, events: [{ type: 'giftClaimed', gift }], gift };
}

// The player was away long enough to need a reminder of what they were doing.
export const welcomeDue = (lastSeen: number, now: number) => lastSeen > 0 && now - lastSeen >= config.welcomeBackHours * 3600_000;
