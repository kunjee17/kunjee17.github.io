#!/usr/bin/env node
/**
 * Copy database file from admin to blog app
 * Cross-platform script using Node.js
 */
import { copyFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get project root (one level up from scripts/)
const projectRoot = resolve(__dirname, "..");
const adminDbPath = join(projectRoot, "apps", "admin", "kunjan-blog.db");
const blogDbPath = join(projectRoot, "apps", "blog", "kunjan-blog.db");
const adminConfigPath = join(projectRoot, "apps", "admin", "db", "config.ts");
const blogConfigPath = join(projectRoot, "apps", "blog", "db", "config.ts");

// Check if source file exists
if (!existsSync(adminDbPath)) {
	console.error(`❌ Database file not found: ${adminDbPath}`);
	console.error("   Please run 'pnpm db:push' in apps/admin first.");
	process.exit(1);
}

try {
	// Copy the file
	copyFileSync(adminDbPath, blogDbPath);
	console.log("✅ Database copied successfully!");
	console.log(`   From: ${adminDbPath}`);
	console.log(`   To:   ${blogDbPath}`);
	copyFileSync(adminConfigPath, blogConfigPath);
	console.log("✅ Config copied successfully!");
	console.log(`   From: ${adminConfigPath}`);
	console.log(`   To:   ${blogConfigPath}`);
} catch (error) {
	console.error("❌ Error copying database file:", error.message);
	process.exit(1);
}
