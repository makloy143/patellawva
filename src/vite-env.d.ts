/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** When set at build time, users must submit this passphrase (session survives until tab close). */
  readonly VITE_SITE_PASSWORD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
