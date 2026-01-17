// Migration script for Drizzle
// Run migrations using: pnpm db:migrate

import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "./client.js";

async function runMigrations() {
	try {
		console.log("Running migrations...");
		await migrate(db, { migrationsFolder: "./drizzle" });
		console.log("Migrations completed successfully!");
		process.exit(0);
	} catch (error) {
		console.error("Migration failed:", error);
		process.exit(1);
	}
}

runMigrations();
