// Player-facing names for resources, items and requirements.
import type { Content } from '../core/content';
import type { Source } from '../core/hints';
import type { Requirement } from '../core/repair';
import type { Resource } from '../core/state';
import { t } from '../i18n';

export const resourceName = (content: Content, r: Resource) => t(content.resources.find((x) => x.id === r)?.nameKey ?? r);

export function itemName(content: Content, chain: string, level: number): string {
  const key = content.chains.find((c) => c.id === chain)?.levels[level - 1]?.nameKey;
  return key ? t(key) : `${chain} ${level}`;
}

export function requirementName(content: Content, req: Requirement): string {
  return req.kind === 'resource' ? resourceName(content, req.resource) : itemName(content, req.chain, req.level);
}

export const requirementImage = (content: Content, req: Requirement) =>
  req.kind === 'resource'
    ? (content.resources.find((r) => r.id === req.resource)?.image ?? '')
    : (content.chains.find((c) => c.id === req.chain)?.levels[req.level - 1]?.image ?? '');

// "→ Pile by the door" / "→ combine on the table" under a missing requirement (spec 6.2, v0.8).
export function sourceLabel(source: Source): string {
  if (source.kind === 'zone') return t('ui.hint.zone', { zone: t(source.zone.nameKey) });
  return t(source.kind === 'merge' ? 'ui.hint.merge' : 'ui.hint.none');
}

// How much of a requirement the player can pay now (items may come from splitting higher ones).
export const available = (req: Requirement) => (req.kind === 'item' ? req.covered : req.have);
