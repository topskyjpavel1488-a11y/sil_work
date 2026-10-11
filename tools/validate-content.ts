// npm run validate — checks content invariants (spec 5.5) and exits non-zero on any violation.
import { readFileSync } from 'node:fs';
import { content } from '../src/data/index';
import { checkContent, type Manifest, type Strings } from './content-check';

const readJson = <T>(path: string): T => JSON.parse(readFileSync(path, 'utf8')) as T;

const errors = checkContent(
  content,
  readJson<Strings>('src/i18n/ru.json'),
  readJson<Strings>('src/i18n/en.json'),
  readJson<Manifest>('assets/manifest.json'),
);

if (errors.length) {
  console.error(`Content check failed (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('Content check passed.');
