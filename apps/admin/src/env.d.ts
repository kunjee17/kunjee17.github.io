/// <reference types="astro/client" />

// Astro DB automatically generates types from db/config.ts
// No manual type declarations needed - see https://docs.astro.build/en/guides/integrations-guide/db/

interface ImportMetaEnv {
	readonly SUPER_ADMIN_PASSWORD: string;
	readonly ASTRO_DB_REMOTE_URL: string;
	readonly ASTRO_DB_APP_TOKEN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
