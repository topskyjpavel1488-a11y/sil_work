// Content invariants for `npm run validate` (spec 5.5). Demand and supply are computed from data.
import { config, DESIGN_HEIGHT, DESIGN_WIDTH, UI_IMAGES, UI_SOUNDS } from '../src/config';
import type { Bundle, Condition, Content } from '../src/core/content';
import { RESOURCES, type Resource } from '../src/core/state';
import { goalSequence, runBot } from './bot';

export interface Manifest {
  images: Record<string, { file: string | null; placeholder?: { color: string } }>;
  sounds: Record<string, { file: string | null; synth?: { freq: number; ms: number; wave?: string } }>;
}

export type Strings = Record<string, string>;

// Value of a bundle in units: resources count one each, an item of level N counts 2^(N-1) level-1 items.
export interface Units {
  resources: Record<Resource, number>;
  level1: number;
}

const emptyUnits = (): Units => ({ resources: { wood: 0, metal: 0, parts: 0 }, level1: 0 });

function addBundle(units: Units, bundle: Bundle): void {
  for (const r of RESOURCES) units.resources[r] += bundle.resources?.[r] ?? 0;
  for (const item of bundle.items ?? []) units.level1 += item.count * 2 ** (item.level - 1);
}

export function bundleUnits(bundle: Bundle): number {
  const u = emptyUnits();
  addBundle(u, bundle);
  return RESOURCES.reduce((s, r) => s + u.resources[r], 0) + u.level1;
}

export function totalDemand(content: Content): Units {
  const u = emptyUnits();
  for (const o of content.objects) for (const s of o.steps) addBundle(u, s.cost);
  return u;
}

export function totalSupply(content: Content): Units {
  const u = emptyUnits();
  for (const z of content.zones) for (const d of z.debris) addBundle(u, d.drop);
  return u;
}

export function collectAssetKeys(content: Content): { images: string[]; sounds: string[] } {
  const images = new Set<string>();
  const sounds = new Set<string>();
  content.resources.forEach((r) => images.add(r.image));
  content.chains.forEach((c) => c.levels.forEach((l) => images.add(l.image)));
  content.objects.forEach((o) => o.stateImages.forEach((k) => images.add(k)));
  content.zones.forEach((z) => images.add(z.image));
  Object.values(content.debrisKinds).forEach((k) => {
    images.add(k.image);
    sounds.add(k.sound);
  });
  content.finds.forEach((f) => {
    images.add(f.image);
    if (f.sound) sounds.add(f.sound);
  });
  images.add(content.final.image);
  Object.values(UI_SOUNDS).forEach((k) => sounds.add(k));
  Object.values(UI_IMAGES).forEach((k) => images.add(k));
  return { images: [...images], sounds: [...sounds] };
}

function collectTextKeys(content: Content): string[] {
  return [
    ...content.resources.map((r) => r.nameKey),
    ...content.chains.flatMap((c) => c.levels.map((l) => l.nameKey)),
    ...content.objects.map((o) => o.nameKey),
    ...content.zones.map((z) => z.nameKey),
    ...Object.values(content.debrisKinds).map((k) => k.nameKey),
    ...content.finds.flatMap((f) => [f.titleKey, f.textKey]),
    content.final.titleKey,
    content.final.textKey,
    ...content.tutorial.map((s) => s.textKey),
  ];
}

const fmt = (u: Units) => `W${u.resources.wood} M${u.resources.metal} P${u.resources.parts} L1×${u.level1}`;

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
  checkSection(
    'workshop',
    ['room', 'ui.resources', 'ui.settings', 'ui.goal', 'ui.nav', 'ui.tutorial'],
    [...content.objects.map((o) => `object.${o.id}`), ...content.zones.map((z) => `zone.${z.id}`)],
  );
  checkSection('scavenge', ['ui.resources', 'ui.title', 'area', 'ui.back', 'ui.tutorial'], []);
  checkSection('journal', ['ui.title', 'ui.back'], content.finds.map((_, i) => `slot.${i}`));
  checkSection('table', ['ui.resources', 'ui.boxLabel', 'ui.back', 'ui.tutorial'], [
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
  const objectIds = new Set(content.objects.map((o) => o.id));
  const findIds = new Set(content.finds.map((f) => f.id));
  const chainLevels = new Map(content.chains.map((c) => [c.id, c.levels.length]));

  // References.
  const checkCondition = (where: string, cond?: Condition) => {
    if (!cond) return;
    const target = content.objects.find((o) => o.id === cond.object);
    if (!target) err(`${where}: unknown object "${cond.object}"`);
    else if (cond.step < 1 || cond.step > target.steps.length) err(`${where}: step ${cond.step} is out of range for "${cond.object}"`);
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
    checkCondition(`object ${o.id} requires`, o.requires);
    if (o.stateImages.length !== o.steps.length + 1) err(`object ${o.id}: needs ${o.steps.length + 1} state images, has ${o.stateImages.length}`);
    o.steps.forEach((s, i) => {
      checkBundle(`object ${o.id} step ${i + 1}`, s.cost);
      if (s.find && !findIds.has(s.find)) err(`object ${o.id} step ${i + 1}: unknown find "${s.find}"`);
    });
  }
  const findUses = content.objects.flatMap((o) => o.steps.map((s) => s.find).filter(Boolean));
  for (const f of content.finds) {
    const uses = findUses.filter((id) => id === f.id).length;
    if (uses !== 1) err(`find ${f.id}: attached to ${uses} repair steps, expected exactly 1`);
  }
  if (objectIds.size !== content.objects.length) err('objects: duplicate ids');

  // Zones.
  const { zoneCount, zoneDebris, debrisDropUnits, firstZone } = config;
  if (content.zones.length < zoneCount.min || content.zones.length > zoneCount.max) {
    err(`zones: ${content.zones.length}, expected ${zoneCount.min}–${zoneCount.max}`);
  }
  const debrisIds = new Set<string>();
  for (const z of content.zones) {
    checkCondition(`zone ${z.id} unlock`, z.unlock);
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
  const first = content.zones[0];
  if (first) {
    if (first.unlock) err(`zone ${first.id}: the first zone must be open from the start`);
    const u = emptyUnits();
    first.debris.forEach((d) => addBundle(u, d.drop));
    if (u.resources.wood < firstZone.minWood || u.level1 < firstZone.minLevel1Items) {
      err(`zone ${first.id}: tutorial needs at least ${firstZone.minWood} wood and ${firstZone.minLevel1Items} level 1 items, has ${fmt(u)}`);
    }
  }
  const firstStep = content.objects[0]?.steps[0];
  if (firstStep && (firstStep.cost.items?.length || Object.keys(firstStep.cost.resources ?? {}).some((r) => r !== 'wood'))) {
    err(`object ${content.objects[0]?.id} step 1: tutorial expects a wood-only cost`);
  }

  // Totals with margin.
  const demand = totalDemand(content);
  const supply = totalSupply(content);
  const m = config.balanceMargin;
  for (const r of RESOURCES) {
    if (supply.resources[r] < demand.resources[r] * m) err(`balance: ${r} supply ${supply.resources[r]} < ${m} × demand ${demand.resources[r]}`);
  }
  if (supply.level1 < demand.level1 * m) err(`balance: level 1 item supply ${supply.level1} < ${m} × demand ${demand.level1}`);

  // Cumulative supply of open zones vs cumulative demand at every repair step, in goal order.
  const cumDemand = emptyUnits();
  for (const g of goalSequence(content)) {
    addBundle(cumDemand, g.cost);
    const open = emptyUnits();
    g.openZones.forEach((zoneId) => content.zones.find((z) => z.id === zoneId)?.debris.forEach((d) => addBundle(open, d.drop)));
    const short = RESOURCES.filter((r) => open.resources[r] < cumDemand.resources[r] * m);
    if (open.level1 < cumDemand.level1 * m) short.push('level1' as Resource);
    if (short.length) err(`balance at ${g.objectId} step ${g.step}: open zones give ${fmt(open)}, need ${m} × ${fmt(cumDemand)} (short: ${short.join(', ')})`);
  }

  // Texts.
  for (const key of collectTextKeys(content)) {
    if (!ru[key]) err(`text "${key}" is missing in ru.json`);
    if (!en[key]) err(`text "${key}" is missing in en.json`);
  }
  for (const key of Object.keys(ru)) if (!(key in en)) err(`text "${key}" is in ru.json but not in en.json`);
  for (const key of Object.keys(en)) if (!(key in ru)) err(`text "${key}" is in en.json but not in ru.json`);
  for (const f of [...content.finds, content.final]) {
    for (const [lang, strings] of [['ru', ru], ['en', en]] as const) {
      const text = strings[f.textKey] ?? '';
      if (text.length > config.findTextMaxChars) err(`text "${f.textKey}" (${lang}) is ${text.length} chars, max ${config.findTextMaxChars}`);
    }
  }

  // Assets.
  const { images, sounds } = collectAssetKeys(content);
  for (const key of images) if (!manifest.images[key]) err(`image "${key}" is missing in assets/manifest.json`);
  for (const key of sounds) if (!manifest.sounds[key]) err(`sound "${key}" is missing in assets/manifest.json`);

  checkLayout(content, layout, err);

  // Tutorial: targets exist, the first zone and object match the tutorial's expectations.
  for (const step of content.tutorial) {
    const { type, id } = step.target;
    if ((type === 'zone' || type === 'debris') && !content.zones.some((z) => z.id === id)) err(`tutorial ${step.id}: unknown zone "${id}"`);
    if (type === 'object' && !objectIds.has(id)) err(`tutorial ${step.id}: unknown object "${id}"`);
    if (type === 'mergePair' && !content.chains.some((c) => c.id === id)) err(`tutorial ${step.id}: unknown chain "${id}"`);
  }

  // No dead ends: the bot must finish within the table limits.
  if (errors.length === 0) {
    const sim = runBot(content);
    if (!sim.finished) err(`simulation: stuck at ${sim.stuckAt ?? 'unknown point'}`);
    if (sim.maxBoard > config.simMaxBoardCells) err(`simulation: board reached ${sim.maxBoard} cells, max ${config.simMaxBoardCells}`);
    if (sim.maxBox > config.simMaxBoxCells) err(`simulation: box reached ${sim.maxBox} cells, max ${config.simMaxBoxCells}`);
  }
  return errors;
}
