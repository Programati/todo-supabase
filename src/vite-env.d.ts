// Esto le dice a TypeScript qué variables existen.
// Si escribes mal el nombre en el futuro, te avisará al compilar y no fallará en silencio en el navegador.

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
