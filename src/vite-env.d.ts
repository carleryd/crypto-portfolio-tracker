/// <reference types="vite/client" />

// Declaration merging with a handful of existing Vite environment variables.
interface ImportMetaEnv {
  readonly VITE_SENTRY_TOKEN: string;
}
