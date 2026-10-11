import { describe, expect, it } from 'vitest';
import type { Content } from '../src/core/content';
import { content } from '../src/data/index';
import manifest from '../assets/manifest.json';
import en from '../src/i18n/en.json';
import ru from '../src/i18n/ru.json';
import { runBot } from '../tools/bot';
import { checkContent, type Manifest } from '../tools/content-check';

const check = (c: Content) => checkContent(c, ru, en, manifest as Manifest);

describe('content', () => {
  it('passes every invariant', () => {
    expect(check(content)).toEqual([]);
  });

  it('can be played to the end by the bot', () => {
    const sim = runBot(content);
    expect(sim.finished).toBe(true);
    expect(sim.state.finds).toHaveLength(content.finds.length);
  });

  it('reports a shortage of supply', () => {
    const broken = structuredClone(content);
    broken.zones = broken.zones.map((z) => ({ ...z, debris: z.debris.map((d) => ({ ...d, drop: { resources: { wood: 1 } } })) }));
    expect(check(broken).some((e) => e.startsWith('balance:'))).toBe(true);
  });

  it('reports broken references', () => {
    const broken = structuredClone(content);
    broken.objects[1]!.requires = { object: 'nope', step: 1 };
    broken.zones[1]!.debris[0]!.kind = 'piano';
    const errors = check(broken);
    expect(errors).toContain('object fastener_box requires: unknown object "nope"');
    expect(errors.some((e) => e.includes('unknown kind "piano"'))).toBe(true);
  });
});
