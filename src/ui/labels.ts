// Player-facing names for resources, items and requirements.
import type { Content } from '../core/content';
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
