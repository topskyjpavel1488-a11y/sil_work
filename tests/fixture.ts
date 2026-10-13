// Small fixed content for core tests, so they do not depend on the game's balance numbers.
import type { Content } from '../src/core/content';

const level = (chain: string, n: number) => ({ nameKey: `item.${chain}.${n}`, image: `item_${chain}_${n}` });
const card = (key: string) => ({ titleKey: `${key}.title`, textKey: `${key}.text`, image: key });

export const fixture: Content = {
  rooms: [
    { id: 'workshop', nameKey: 'room.workshop', image: 'room_bg', layout: 'workshop', final: card('final'), finalNoteKey: 'note' },
    { id: 'paint', nameKey: 'room.paint', image: 'room_paint_bg', layout: 'paint', unlockAfter: 'workshop', final: card('final_paint'), finalNoteKey: 'note' },
  ],
  resources: [
    { id: 'wood', nameKey: 'resource.wood', image: 'res_wood' },
    { id: 'metal', nameKey: 'resource.metal', image: 'res_metal' },
    { id: 'parts', nameKey: 'resource.parts', image: 'res_parts' },
  ],
  chains: [
    { id: 'fasteners', levels: [1, 2, 3, 4].map((n) => level('fasteners', n)) },
    { id: 'paints', levels: [1, 2, 3, 4].map((n) => level('paints', n)) },
  ],
  objects: [
    {
      id: 'workbench',
      room: 'workshop',
      nameKey: 'object.workbench',
      stateImages: ['w0', 'w1', 'w2', 'w3'],
      steps: [
        { cost: { resources: { wood: 4 } } },
        { cost: { resources: { wood: 3 }, items: [{ chain: 'fasteners', level: 2, count: 1 }] }, find: 'f_photo' },
        { cost: { resources: { parts: 3 }, items: [{ chain: 'fasteners', level: 3, count: 1 }] } },
      ],
    },
    {
      id: 'fastener_box',
      room: 'workshop',
      nameKey: 'object.fastener_box',
      requires: { object: 'workbench', step: 1 },
      stateImages: ['b0', 'b1'],
      steps: [{ cost: { resources: { metal: 3 }, items: [{ chain: 'fasteners', level: 2, count: 1 }] }, find: 'f_screws' }],
    },
    {
      id: 'cabinet',
      room: 'workshop',
      nameKey: 'object.cabinet',
      requires: { object: 'workbench', step: 2 },
      stateImages: ['c0', 'c1', 'c2'],
      steps: [
        { cost: { resources: { wood: 3, metal: 2 } } },
        { cost: { resources: { metal: 3 }, items: [{ chain: 'fasteners', level: 2, count: 2 }] } },
      ],
    },
    {
      id: 'easel',
      room: 'paint',
      nameKey: 'object.easel',
      stateImages: ['e0', 'e1'],
      steps: [{ cost: { resources: { wood: 1 }, items: [{ chain: 'paints', level: 2, count: 1 }] } }],
    },
  ],
  zones: [
    {
      id: 'door',
      room: 'workshop',
      nameKey: 'zone.door',
      image: 'zone_door',
      sceneImage: 'scene_door',
      debris: [
        { id: 'door_1', kind: 'plank', drop: { resources: { wood: 2 } } },
        { id: 'door_2', kind: 'box', drop: { items: [{ chain: 'fasteners', level: 1, count: 2 }] } },
        { id: 'door_3', kind: 'jar', drop: { resources: { parts: 1, metal: 1 } } },
      ],
    },
    {
      id: 'under_workbench',
      room: 'workshop',
      nameKey: 'zone.under_workbench',
      image: 'zone_under_workbench',
      sceneImage: 'scene_under_workbench',
      unlock: { object: 'workbench', step: 1 },
      debris: [{ id: 'under_1', kind: 'plank', drop: { resources: { wood: 1 } } }],
    },
    {
      id: 'buckets',
      room: 'paint',
      nameKey: 'zone.buckets',
      image: 'zone_buckets',
      sceneImage: 'scene_buckets',
      debris: [{ id: 'buckets_1', kind: 'bucket', drop: { items: [{ chain: 'paints', level: 1, count: 2 }] } }],
    },
  ],
  debrisKinds: {
    plank: { nameKey: 'debris.plank', image: 'debris_plank', sound: 'sfx' },
    box: { nameKey: 'debris.box', image: 'debris_box', sound: 'sfx' },
    jar: { nameKey: 'debris.jar', image: 'debris_jar', sound: 'sfx' },
    bucket: { nameKey: 'debris.bucket', image: 'debris_bucket', sound: 'sfx' },
  },
  finds: [
    { id: 'f_photo', room: 'workshop', ...card('find_f_photo') },
    { id: 'f_screws', room: 'workshop', ...card('find_f_screws') },
  ],
  tutorial: [],
  story: [],
};
