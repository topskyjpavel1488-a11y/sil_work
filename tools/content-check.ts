// Content invariants for `npm run validate` (spec 5.5). Demand and supply are computed from data.
import { config, DESIGN_HEIGHT, DESIGN_WIDTH, UI_IMAGES, UI_SOUNDS } from '../src/config';
import { findsIn, objectsIn, zonesIn, type Bundle, type Condition, type Content } from '../src/core/content';
import { CHAINS, RESOURCES, type ChainId, type Resource } from '../src/core/state';
import { goalSequence, runBot } from './bot';
import { speedrunMinutes } from './playtime';

export interface Manifest {
  images: Record<string, { file: string | null; placeholder?: { color: string } }>;
  sounds: Record<string, { file: string | null; synth?: { freq: number; ms: number; wave?: string } }>;
}

export type Strings = Record<string, string>;

// Value of a bundle in units: resources count one each; an item of level N counts 2^(N-1)
// level-1 items of its chain. Chains are counted apart: one never pays for another.
export interface Units {
  resources: Record<Resource, number>;
  level1: Record<ChainId, number>;
}

const emptyUnits = (): Units => ({
  resources: { wood: 0, metal: 0, parts: 0 },
  level1: Object.fromEntries(CHAINS.map((c) => [c, 0])) as Record<ChainId, number>,
});

function addBundle(units: Units, bundle: Bundle): void {
  for (const r of RESOURCES) units.resources[r] += bundle.resources?.[r] ?? 0;
  for (const item of bundle.items ?? []) units.level1[item.chain] = (units.level1[item.chain] ?? 0) + item.count * 2 ** (item.level - 1);
}

export function bundleUnits(bundle: Bundle): number {
  const u = emptyUnits();
  addBundle(u, bundle);
  return RESOURCES.reduce((s, r) => s + u.resources[r], 0) + CHAINS.reduce((s, c) => s + u.level1[c], 0);
}

export function totalDemand(content: Content, room?: string): Units {
  const u = emptyUnits();
  for (const o of content.objects) if (!room || o.room === room) for (const s of o.steps) addBundle(u, s.cost);
  return u;
}

export function totalSupply(content: Content, room?: string): Units {
  const u = emptyUnits();
  for (const z of content.zones) if (!room || z.room === room) for (const d of z.debris) addBundle(u, d.drop);
  return u;
}

export function collectAssetKeys(content: Content): { images: string[]; sounds: string[] } {
  const images = new Set<string>();
  const sounds = new Set<string>();
  content.rooms.forEach((r) => {
    images.add(r.image);
    images.add(r.final.image);
    if (r.intro) images.add(r.intro.image);
  });
  content.resources.forEach((r) => images.add(r.image));
  content.chains.forEach((c) => c.levels.forEach((l) => images.add(l.image)));
  content.objects.forEach((o) => o.stateImages.forEach((k) => images.add(k)));
  content.zones.forEach((z) => {
    images.add(z.image);
    images.add(z.sceneImage);
  });
  Object.values(content.debrisKinds).forEach((k) => {
    images.add(k.image);
    sounds.add(k.sound);
  });
  content.finds.forEach((f) => {
    images.add(f.image);
    if (f.sound) sounds.add(f.sound);
  });
  Object.values(UI_SOUNDS).forEach((k) => sounds.add(k));
  Object.values(UI_IMAGES).forEach((k) => images.add(k));
  return { images: [...images], sounds: [...sounds] };
}

const cards = (content: Content) => [...content.finds, ...content.rooms.flatMap((r) => (r.intro ? [r.final, r.intro] : [r.final]))];

function collectTextKeys(content: Content): string[] {
  return [
    ...content.rooms.flatMap((r) => [r.nameKey, r.finalNoteKey]),
    ...cards(content).flatMap((c) => [c.titleKey, c.textKey]),
    ...content.resources.map((r) => r.nameKey),
    ...content.chains.flatMap((c) => c.levels.map((l) => l.nameKey)),
    ...content.objects.map((o) => o.nameKey),
    ...content.zones.map((z) => z.nameKey),
    ...Object.values(content.debrisKinds).map((k) => k.nameKey),
    ...content.tutorial.map((s) => s.textKey),
  ];
}

const fmt = (u: Units) =>
  `W${u.resources.wood} M${u.resources.metal} P${u.resources.parts} ` + CHAINS.map((c) => `${c}×${u.level1[c]}`).join(' ');

export type LayoutData = Record<string, Record<string, { x: number; y: number; w: number; h: number }>>;

function checkLayout(content: Content, layout: LayoutData, err: (msg: string) => void): void {
  const checkSection = (section: string, names: string[], hotspots: string[]) => {
    const rects = layout[section] ?? {};
    for (const name of [...names, ...hotspots]) {
      const r = rects[name];
      if (!r) {
        err(`layout: "${section}" has no "${name}"`);
        continue;
      }
      if (r.x < 0 || r.y < 0 || r.x + r.w > DESIGN_WIDTH || r.y + r.h > DESIGN_HEIGHT) err(`layout: "${section}" → "${name}" is outside the 720×1280 field`);
      if (hotspots.includes(name) && (r.w < config.minTapSize || r.h < config.minTapSize)) {
        err(`layout: "${section}" → "${name}" is ${r.w}×${r.h}, tap targets must be at least ${config.minTapSize}×${config.minTapSize}`);
      }
    }
  };
  for (const room of content.rooms) {
    checkSection(
      room.layout,
      ['room', 'ui.resources', 'ui.settings', 'ui.goal', 'ui.nav', 'ui.tutorial'],
      [...objectsIn(content, room.id).map((o) => `object.${o.id}`), ...zonesIn(content, room.id).map((z) => `zone.${z.id}`)],
    );
  }
  checkSection('scavenge', ['ui.resources', 'ui.title', 'area', 'ui.back', 'ui.tutorial'], []);
  // The journal shows one room's finds at a time.
  const slots = Math.max(...content.rooms.map((r) => findsIn(content, r.id).length));
  checkSection('journal', ['ui.title', 'ui.back'], Array.from({ length: slots }, (_, i) => `slot.${i}`));
  checkSection('table', ['ui.resources', 'ui.boxLabel', 'ui.back', 'ui.tutorial', 'ui.backWithReward', 'ui.reward'], [
    ...Array.from({ length: config.boardCols * config.boardRows }, (_, i) => `cell.board.${i}`),
    ...Array.from({ length: config.boxSize }, (_, i) => `cell.box.${i}`),
  ]);
  for (const zone of content.zones) {
    checkSection(
      `scavenge.${zone.id}`,
      [],
      zone.debris.map((d) => `debris.${d.id}`),
    );
  }
}

export function checkContent(content: Content, ru: Strings, en: Strings, manifest: Manifest, layout: LayoutData): string[] {
  const errors: string[] = [];
  const err = (msg: string) => errors.push(msg);
  const roomIds = new Set(content.rooms.map((r) => r.id));
  const objectIds = new Set(content.objects.map((o) => o.id));
  const findIds = new Set(content.finds.map((f) => f.id));
  const chainLevels = new Map(content.chains.map((c) => [c.id, c.levels.length]));

  // Rooms.
  if (content.rooms.length === 0) err('rooms: at least one room is needed');
  if (content.rooms[0]?.unlockAfter) err(`room ${content.rooms[0].id}: the first room must be open from the start`);
  for (const r of content.rooms) {
    if (r.unlockAfter && !roomIds.has(r.unlockAfter)) err(`room ${r.id}: unlockAfter names unknown room "${r.unlockAfter}"`);
    if (objectsIn(content, r.id).length === 0) err(`room ${r.id}: has no objects`);
  }
  for (const o of content.objects) if (!roomIds.has(o.room)) err(`object ${o.id}: unknown room "${o.room}"`);
  for (const z of content.zones) if (!roomIds.has(z.room)) err(`zone ${z.id}: unknown room "${z.room}"`);
  for (const f of content.finds) if (!roomIds.has(f.room)) err(`find ${f.id}: unknown room "${f.room}"`);

  // References.
  const checkCondition = (where: string, room: string, cond?: Condition) => {
    if (!cond) return;
    const target = content.objects.find((o) => o.id === cond.object);
    if (!target) err(`${where}: unknown object "${cond.object}"`);
    else if (cond.step < 1 || cond.step > target.steps.length) err(`${where}: step ${cond.step} is out of range for "${cond.object}"`);
    else if (target.room !== room) err(`${where}: "${cond.object}" is in another room`);
  };
  const checkBundle = (where: string, bundle: Bundle) => {
    for (const r of Object.keys(bundle.resources ?? {})) if (!RESOURCES.includes(r as Resource)) err(`${where}: unknown resource "${r}"`);
    for (const item of bundle.items ?? []) {
      const max = chainLevels.get(item.chain);
      if (max === undefined) err(`${where}: unknown chain "${item.chain}"`);
      else if (item.level < 1 || item.level > max) err(`${where}: level ${item.level} is out of range`);
      if (item.count < 1) err(`${where}: item count must be at least 1`);
    }
  };
  for (const o of content.objects) {
    checkCondition(`object ${o.id} requires`, o.room, o.requires);
    if (o.stateImages.length !== o.steps.length + 1) err(`object ${o.id}: needs ${o.steps.length + 1} state images, has ${o.stateImages.length}`);
    o.steps.forEach((s, i) => {
      checkBundle(`object ${o.id} step ${i + 1}`, s.cost);
      if (s.find && !findIds.has(s.find)) err(`object ${o.id} step ${i + 1}: unknown find "${s.find}"`);
      const find = content.finds.find((f) => f.id === s.find);
      if (find && find.room !== o.room) err(`object ${o.id} step ${i + 1}: find "${find.id}" belongs to another room`);
    });
  }
  const findUses = content.objects.flatMap((o) => o.steps.map((s) => s.find).filter(Boolean));
  for (const f of content.finds) {
    const uses = findUses.filter((id) => id === f.id).length;
    if (uses !== 1) err(`find ${f.id}: attached to ${uses} repair steps, expected exactly 1`);
  }
  if (objectIds.size !== content.objects.length) err('objects: duplicate ids');

  // Zones, per room.
  const { zoneCount, zoneDebris, debrisDropUnits, firstZone } = config;
  for (const room of content.rooms) {
    const zones = zonesIn(content, room.id);
    if (zones.length < zoneCount.min || zones.length > zoneCount.max) err(`room ${room.id}: ${zones.length} zones, expected ${zoneCount.min}–${zoneCount.max}`);
  }
  const debrisIds = new Set<string>();
  for (const z of content.zones) {
    checkCondition(`zone ${z.id} unlock`, z.room, z.unlock);
    if (z.debris.length < zoneDebris.min || z.debris.length > zoneDebris.max) {
      err(`zone ${z.id}: ${z.debris.length} debris, expected ${zoneDebris.min}–${zoneDebris.max}`);
    }
    for (const d of z.debris) {
      if (debrisIds.has(d.id)) err(`debris ${d.id}: duplicate id`);
      debrisIds.add(d.id);
      if (!content.debrisKinds[d.kind]) err(`debris ${d.id}: unknown kind "${d.kind}"`);
      checkBundle(`debris ${d.id}`, d.drop);
      if ((d.drop.items ?? []).some((i) => i.level !== 1)) err(`debris ${d.id}: debris may drop only level 1 items`);
      const units = bundleUnits(d.drop);
      if (units < debrisDropUnits.min || units > debrisDropUnits.max) {
        err(`debris ${d.id}: drops ${units} units, expected ${debrisDropUnits.min}–${debrisDropUnits.max}`);
      }
    }
  }
  // The tutorial runs in the first room, with its first zone and first object.
  const firstRoom = content.rooms[0]?.id ?? '';
  const first = zonesIn(content, firstRoom)[0];
  if (first) {
    if (first.unlock) err(`zone ${first.id}: the first zone must be open from the start`);
    const u = emptyUnits();
    first.debris.forEach((d) => addBundle(u, d.drop));
    if (u.resources.wood < firstZone.minWood || u.level1.fasteners < firstZone.minLevel1Items) {
      err(`zone ${first.id}: tutorial needs at least ${firstZone.minWood} wood and ${firstZone.minLevel1Items} level 1 items, has ${fmt(u)}`);
    }
  }
  const firstObject = objectsIn(content, firstRoom)[0];
  const firstStep = firstObject?.steps[0];
  if (firstStep && (firstStep.cost.items?.length || Object.keys(firstStep.cost.resources ?? {}).some((r) => r !== 'wood'))) {
    err(`object ${firstObject?.id} step 1: tutorial expects a wood-only cost`);
  }

  // Totals with margin, room by room from the start: leftovers of earlier rooms count for later ones.
  const m = config.balanceMargin;
  const demand = emptyUnits();
  const supply = emptyUnits();
  for (const room of content.rooms) {
    for (const o of objectsIn(content, room.id)) for (const s of o.steps) addBundle(demand, s.cost);
    for (const z of zonesIn(content, room.id)) for (const d of z.debris) addBundle(supply, d.drop);
    for (const r of RESOURCES) {
      if (supply.resources[r] < demand.resources[r] * m) err(`balance (up to ${room.id}): ${r} supply ${supply.resources[r]} < ${m} × demand ${demand.resources[r]}`);
    }
    for (const c of CHAINS) {
      if (supply.level1[c] < demand.level1[c] * m) err(`balance (up to ${room.id}): ${c} level 1 supply ${supply.level1[c]} < ${m} × demand ${demand.level1[c]}`);
    }
  }

  // Cumulative supply of open zones vs cumulative demand at every repair step, in goal order.
  const cumDemand = emptyUnits();
  for (const g of goalSequence(content)) {
    addBundle(cumDemand, g.cost);
    const open = emptyUnits();
    g.openZones.forEach((zoneId) => content.zones.find((z) => z.id === zoneId)?.debris.forEach((d) => addBundle(open, d.drop)));
    const short: string[] = RESOURCES.filter((r) => open.resources[r] < cumDemand.resources[r] * m);
    for (const c of CHAINS) if (open.level1[c] < cumDemand.level1[c] * m) short.push(c);
    if (short.length) err(`balance at ${g.objectId} step ${g.step}: open zones give ${fmt(open)}, need ${m} × ${fmt(cumDemand)} (short: ${short.join(', ')})`);
  }

  // Texts.
  for (const key of collectTextKeys(content)) {
    if (!ru[key]) err(`text "${key}" is missing in ru.json`);
    if (!en[key]) err(`text "${key}" is missing in en.json`);
  }
  for (const key of Object.keys(ru)) if (!(key in en)) err(`text "${key}" is in ru.json but not in en.json`);
  for (const key of Object.keys(en)) if (!(key in ru)) err(`text "${key}" is in en.json but not in ru.json`);
  for (const c of cards(content)) {
    for (const [lang, strings] of [['ru', ru], ['en', en]] as const) {
      const text = strings[c.textKey] ?? '';
      if (text.length > config.findTextMaxChars) err(`text "${c.textKey}" (${lang}) is ${text.length} chars, max ${config.findTextMaxChars}`);
    }
  }

  // Assets.
  const { images, sounds } = collectAssetKeys(content);
  for (const key of images) if (!manifest.images[key]) err(`image "${key}" is missing in assets/manifest.json`);
  for (const key of sounds) if (!manifest.sounds[key]) err(`sound "${key}" is missing in assets/manifest.json`);

  checkLayout(content, layout, err);

  // Tutorial: targets exist in the first room.
  for (const step of content.tutorial) {
    const { type, id } = step.target;
    if ((type === 'zone' || type === 'debris') && !zonesIn(content, firstRoom).some((z) => z.id === id)) err(`tutorial ${step.id}: no zone "${id}" in the first room`);
    if (type === 'object' && !objectsIn(content, firstRoom).some((o) => o.id === id)) err(`tutorial ${step.id}: no object "${id}" in the first room`);
    if (type === 'mergePair' && !content.chains.some((c) => c.id === id)) err(`tutorial ${step.id}: unknown chain "${id}"`);
  }

  // No dead ends: the bot must finish within the table limits; so must a player who merges everything.
  // And the main content must take longer than Yandex Games rule 2.9 asks, even played fast.
  if (errors.length === 0) {
    const sim = runBot(content);
    if (!sim.finished) err(`simulation: stuck at ${sim.stuckAt ?? 'unknown point'}`);
    if (sim.maxBoard > config.simMaxBoardCells) err(`simulation: board reached ${sim.maxBoard} cells, max ${config.simMaxBoardCells}`);
    if (sim.maxBox > config.simMaxBoxCells) err(`simulation: box reached ${sim.maxBox} cells, max ${config.simMaxBoxCells}`);
    const greedy = runBot(content, 'greedy');
    if (!greedy.finished) err(`simulation (merge everything): stuck at ${greedy.stuckAt ?? 'unknown point'}`);
    const minutes = speedrunMinutes(content, sim).minutes;
    if (sim.finished && minutes < config.minPlaytimeMinutes) {
      err(`playtime: a fast playthrough takes about ${minutes.toFixed(1)} min, at least ${config.minPlaytimeMinutes} needed (Yandex Games rule 2.9)`);
    }
  }
  return errors;
}
