import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load environment variables
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const databaseUrl = process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL;
const databaseAuthToken = process.env.TURSO_AUTH_TOKEN;

export default defineConfig({
	schema: "./src/schema/tables.ts",
	out: "./drizzle",
	dialect: "turso",
	dbCredentials: {
		url: isProduction && databaseUrl ? databaseUrl : "./kunjan-blog.db",
		authToken:
			isProduction && databaseAuthToken ? databaseAuthToken : undefined,
	},
});
