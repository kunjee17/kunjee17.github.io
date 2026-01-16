/// <reference types="astro/client" />

// AstroDB type declarations - these are virtual modules provided by Astro at build time
declare module "astro:db" {
	export function defineDb(config: {
		tables: Record<string, any>;
	}): any;

	export function defineTable(config: {
		columns: Record<string, any>;
	}): any;

	export const column: {
		text: (options?: {
			primaryKey?: boolean;
			unique?: boolean;
			optional?: boolean;
			references?: () => any;
		}) => any;
		date: (options?: {
			optional?: boolean;
		}) => any;
		boolean: (options?: {
			default?: boolean;
		}) => any;
		number: (options?: {
			optional?: boolean;
		}) => any;
		json: (options?: {
			optional?: boolean;
		}) => any;
	};
}

interface ImportMetaEnv {
	readonly SUPER_ADMIN_PASSWORD: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
