// Player-facing strings by key (spec 6.4). Russian is the fallback.
import en from './en.json';
import ru from './ru.json';

type Lang = 'ru' | 'en';
const tables: Record<Lang, Record<string, string>> = { ru, en };
let lang: Lang = 'ru';

export function setLanguage(next: Lang): void {
  lang = next;
}

export function t(key: string, params: Record<string, string | number> = {}): string {
  const text = tables[lang][key] ?? tables.ru[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (_, name: string) => String(params[name] ?? `{${name}}`));
}
