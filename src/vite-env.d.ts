/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUILD?: 'test' | 'release';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
