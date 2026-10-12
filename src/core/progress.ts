// Availability, goals and completion derived from state + content (spec 4.2, 4.4, 4.7, v0.7 rooms).
import { findRoom, objectsIn, type Condition, type Content, type ObjectDef, type RoomDef, type ZoneDef } from './content';
import { stepOf, type GameState } from './state';

export const meets = (state: GameState, cond?: Condition) => !cond || stepOf(state, cond.object) >= cond.step;

export const isObjectRestored = (state: GameState, obj: ObjectDef) => stepOf(state, obj.id) >= obj.steps.length;

export const isRoomRestored = (state: GameState, content: Content, roomId: string) =>
  objectsIn(content, roomId).every((o) => isObjectRestored(state, o));

// A room opens once every object of the room named in `unlockAfter` is restored.
export function isRoomUnlocked(state: GameState, content: Content, room: RoomDef | undefined): boolean {
  if (!room) return false;
  return !room.unlockAfter || isRoomRestored(state, content, room.unlockAfter);
}

const roomOpen = (state: GameState, content: Content, roomId: string) => isRoomUnlocked(state, content, findRoom(content, roomId));

export const isObjectAvailable = (state: GameState, content: Content, obj: ObjectDef) =>
  roomOpen(state, content, obj.room) && meets(state, obj.requires);

export const isZoneUnlocked = (state: GameState, content: Content, zone: ZoneDef) =>
  roomOpen(state, content, zone.room) && meets(state, zone.unlock);

export function isZoneCleared(state: GameState, zone: ZoneDef): boolean {
  const taken = state.zones[zone.id]?.taken ?? [];
  return zone.debris.every((d) => taken.includes(d.id));
}

export interface Goal {
  object: ObjectDef;
  stepIndex: number;
}

// The goal banner shows the first available unfinished step in objects.json order (spec 4.4).
export function currentGoal(state: GameState, content: Content): Goal | null {
  for (const object of content.objects) {
    if (isObjectAvailable(state, content, object) && !isObjectRestored(state, object)) {
      return { object, stepIndex: stepOf(state, object.id) };
    }
  }
  return null;
}

export const isFinished = (state: GameState, content: Content) => content.objects.every((o) => isObjectRestored(state, o));
