import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig, type Plugin } from 'vite';

// The release build loads the Yandex Games SDK by the relative path the platform serves
// for games uploaded through the console (SDK docs, "Подключение и использование").
// The test build has no SDK and no ads (spec 8.1).
function yandexSdk(): Plugin {
  return {
    name: 'yandex-sdk',
    transformIndexHtml: (html) => html.replace('<!-- yandex-sdk -->', '<script src="/sdk.js"></script>'),
  };
}

// Dev server only: POST /__shot?name=… with a PNG body saves a store screenshot to assets/store/screenshots/
// (taken in the ?shot mode, see src/dev.ts). Never part of a build.
function screenshotSaver(): Plugin {
  return {
    name: 'screenshot-saver',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__shot', (req, res) => {
        const name = new URL(req.url ?? '', 'http://x').searchParams.get('name')?.replace(/[^a-z0-9_-]/gi, '') || 'shot';
        const chunks: Buffer[] = [];
        req.on('data', (c: Buffer) => chunks.push(c));
        req.on('end', () => {
          const dir = join(import.meta.dirname, 'assets/store/screenshots');
          mkdirSync(dir, { recursive: true });
          writeFileSync(join(dir, `${name}.png`), Buffer.concat(chunks));
          res.end('ok');
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: mode === 'release' ? [yandexSdk()] : [screenshotSaver()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 2000,
  },
  server: { host: true },
  preview: { host: true },
}));
