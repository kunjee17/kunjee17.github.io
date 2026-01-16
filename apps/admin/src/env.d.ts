/// <reference types="astro/client" />

// AstroDB type declarations - these are virtual modules provided by Astro at build time
declare module "astro:db" {
	type TableDefinition = {
		columns: Record<string, unknown>;
	};

	export function defineDb<T extends Record<string, TableDefinition>>(config: {
		tables: T;
	}): { tables: T };

	export function defineTable<T extends Record<string, unknown>>(config: {
		columns: T;
	}): TableDefinition & { columns: T };

	export const column: {
		text: (options?: {
			primaryKey?: boolean;
			unique?: boolean;
			optional?: boolean;
			references?: () => unknown;
		}) => unknown;
		date: (options?: { optional?: boolean }) => unknown;
		boolean: (options?: { default?: boolean }) => unknown;
		number: (options?: { optional?: boolean }) => unknown;
		json: (options?: { optional?: boolean }) => unknown;
	};
}

interface ImportMetaEnv {
	readonly SUPER_ADMIN_PASSWORD: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
