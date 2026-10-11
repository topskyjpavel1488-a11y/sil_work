// `npm run layout` — dev-only layout editor (spec 6.5). Serves this folder and lets the page
// read and write src/data/layout.json. Never part of the release build.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';

const LAYOUT = fileURLToPath(new URL('../../src/data/layout.json', import.meta.url));

const isRect = (r: unknown) =>
  typeof r === 'object' && r !== null && ['x', 'y', 'w', 'h'].every((k) => Number.isFinite((r as Record<string, unknown>)[k]));

function isLayout(data: unknown): boolean {
  if (typeof data !== 'object' || data === null) return false;
  return Object.values(data).every((section) => typeof section === 'object' && section !== null && Object.values(section).every(isRect));
}

function layoutApi(): Plugin {
  return {
    name: 'layout-api',
    configureServer(server) {
      server.middlewares.use('/api/layout', (req, res) => {
        if (req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.end(readFileSync(LAYOUT, 'utf8'));
          return;
        }
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => (body += chunk));
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              if (!isLayout(data)) throw new Error('bad layout shape');
              writeFileSync(LAYOUT, formatLayout(data));
              res.end('ok');
            } catch (e) {
              res.statusCode = 400;
              res.end(String(e));
            }
          });
          return;
        }
        res.statusCode = 405;
        res.end();
      });
    },
  };
}

// One rect per line keeps diffs of layout.json readable.
function formatLayout(data: Record<string, Record<string, { x: number; y: number; w: number; h: number }>>): string {
  const sections = Object.entries(data).map(([name, rects]) => {
    const lines = Object.entries(rects).map(
      ([key, r]) => `    ${JSON.stringify(key)}: { "x": ${r.x}, "y": ${r.y}, "w": ${r.w}, "h": ${r.h} }`,
    );
    return `  ${JSON.stringify(name)}: {\n${lines.join(',\n')}\n  }`;
  });
  return `{\n${sections.join(',\n')}\n}\n`;
}

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [layoutApi()],
  server: { port: 5174, open: true },
});
