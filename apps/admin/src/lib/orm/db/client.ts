// Database client with environment detection
// Uses local SQLite in dev, remote Turso/libSQL in prod

import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../schema/tables.js";

// Load environment variables
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const databaseUrl = process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL;
const databaseAuthToken = process.env.TURSO_AUTH_TOKEN;

let client: ReturnType<typeof createClient>;

if (isProduction && databaseUrl) {
	// Production: Use remote Turso/libSQL database
	if (!databaseAuthToken) {
		throw new Error(
			"TURSO_AUTH_TOKEN is required when using remote database in production",
		);
	}
	client = createClient({
		url: databaseUrl,
		authToken: databaseAuthToken,
	});
} else {
	// Development: Use local SQLite file
	const localDbPath = "./kunjan-blog.db";
	client = createClient({
		url: `file:${localDbPath}`,
	});
}

// Create and export Drizzle database instance
export const db = drizzle({ client, schema });
