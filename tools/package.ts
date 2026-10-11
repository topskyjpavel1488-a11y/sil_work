// npm run package — zips dist/ (release build) for upload to the Yandex Games console:
// index.html at the archive root, file names as built (spec 1.21, 12.3).
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { deflateRawSync } from 'node:zlib';

const DIST = 'dist';
const OUT = 'tikhaya-masterskaya.zip';

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf: Buffer): number {
  let c = 0xffffffff;
  for (const byte of buf) c = (CRC_TABLE[(c ^ byte) & 0xff] as number) ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/index.html is missing: run the release build first');
  process.exit(1);
}
if (!readFileSync(join(DIST, 'index.html'), 'utf8').includes('/sdk.js')) {
  console.error('dist/ is not a release build (no Yandex Games SDK): run npm run package, not the test build');
  process.exit(1);
}

// Minimal ZIP writer (deflate, no extras): local headers, data, central directory, end record.
const locals: Buffer[] = [];
const centrals: Buffer[] = [];
let offset = 0;
const files = walk(DIST).sort();
for (const file of files) {
  const name = Buffer.from(relative(DIST, file).split(sep).join('/'), 'utf8');
  const data = readFileSync(file);
  const packed = deflateRawSync(data, { level: 9 });
  const crc = crc32(data);

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4); // version needed
  local.writeUInt16LE(0x0800, 6); // UTF-8 names
  local.writeUInt16LE(8, 8); // deflate
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(packed.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(name.length, 26);
  locals.push(local, name, packed);

  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50, 0);
  central.writeUInt16LE(20, 4); // version made by
  central.writeUInt16LE(20, 6);
  central.writeUInt16LE(0x0800, 8);
  central.writeUInt16LE(8, 10);
  central.writeUInt32LE(crc, 16);
  central.writeUInt32LE(packed.length, 20);
  central.writeUInt32LE(data.length, 24);
  central.writeUInt16LE(name.length, 28);
  central.writeUInt32LE(offset, 42);
  centrals.push(central, name);

  offset += local.length + name.length + packed.length;
}
const centralSize = centrals.reduce((s, b) => s + b.length, 0);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(files.length, 8);
end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(centralSize, 12);
end.writeUInt32LE(offset, 16);

const zip = Buffer.concat([...locals, ...centrals, end]);
writeFileSync(OUT, zip);
const unpacked = files.reduce((s, f) => s + statSync(f).size, 0);
console.log(`${OUT}: ${files.length} files, ${(zip.length / 1024 / 1024).toFixed(2)} MB packed, ${(unpacked / 1024 / 1024).toFixed(2)} MB unpacked`);
for (const f of files) console.log(`  ${relative(DIST, f).split(sep).join('/')}`);
