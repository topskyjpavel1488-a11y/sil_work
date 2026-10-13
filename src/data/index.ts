// Assembles typed content from the JSON data files.
import type { Content } from '../core/content';
import findsJson from './finds.json';
import itemsJson from './items.json';
import objectsJson from './objects.json';
import roomsJson from './rooms.json';
import storyJson from './story.json';
import tutorialJson from './tutorial.json';
import zonesJson from './zones.json';

export const content = {
  rooms: roomsJson.rooms,
  resources: itemsJson.resources,
  chains: itemsJson.chains,
  objects: objectsJson,
  zones: zonesJson.zones,
  debrisKinds: zonesJson.debrisKinds,
  finds: findsJson.finds,
  tutorial: tutorialJson.steps,
  story: storyJson.cards,
} as Content;
