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

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: mode === 'release' ? [yandexSdk()] : [],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 2000,
  },
  server: { host: true },
  preview: { host: true },
}));
