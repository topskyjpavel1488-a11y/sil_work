// Post-build checks from spec 10.1: index.html at root, safe file names, no Yandex S3 URLs, size report.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname, sep } from 'node:path';

const DIST = 'dist';
const LIMIT_MB = 100;
const TARGET_MB = 30;
const SAFE_NAME = /^[A-Za-z0-9._-]+$/;
const S3_URL = /https?:\/\/[^\s"'`]*(storage\.yandexcloud\.net|s3\.yandex)/i;
// No links to outside resources (spec 2.1). Allowed: XML namespaces and the text of Phaser's
// console banner, which is switched off and never requested.
const ANY_URL = /https?:\/\/([a-z0-9.-]+)/gi;
const ALLOWED_HOSTS = new Set(['www.w3.org', 'phaser.io']);

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const errors: string[] = [];
if (!existsSync(join(DIST, 'index.html'))) errors.push('dist/index.html is missing');

const files = walk(DIST);
let total = 0;
for (const file of files) {
  const rel = relative(DIST, file);
  total += statSync(file).size;
  for (const part of rel.split(sep)) {
    if (!SAFE_NAME.test(part)) errors.push(`unsafe file name: ${rel}`);
  }
  if (['.html', '.js', '.css', '.json'].includes(extname(file))) {
    const text = readFileSync(file, 'utf8');
    if (S3_URL.test(text)) errors.push(`absolute Yandex S3 URL in ${rel}`);
    for (const [, host] of text.matchAll(ANY_URL)) {
      if (host && !ALLOWED_HOSTS.has(host.toLowerCase())) errors.push(`external URL to ${host} in ${rel}`);
    }
  }
}

const mb = total / 1024 / 1024;
console.log(`dist: ${files.length} files, ${mb.toFixed(2)} MB (target ≤ ${TARGET_MB} MB, limit ${LIMIT_MB} MB)`);
for (const file of files) console.log(`  ${relative(DIST, file)}  ${(statSync(file).size / 1024).toFixed(1)} KB`);
if (mb > LIMIT_MB) errors.push(`build is ${mb.toFixed(2)} MB, over the ${LIMIT_MB} MB limit`);
if (mb > TARGET_MB) console.warn(`warning: build exceeds the ${TARGET_MB} MB internal target`);

if (errors.length) {
  for (const e of errors) console.error(`ERROR: ${e}`);
  process.exit(1);
}
console.log('dist checks passed');
