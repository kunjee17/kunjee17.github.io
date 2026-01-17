// Admin queries for Author

import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { author } from "../../schema/tables";
import { stringifyJson } from "../utils";

/**
 * Check if author slug exists
 */
export async function checkAuthorSlugExists(
	slug: string,
	excludeId?: string,
): Promise<boolean> {
	const query = db.select().from(author).where(eq(author.slug, slug)).limit(1);
	const results = await query;
	if (excludeId) {
		return results.some((a) => a.id !== excludeId);
	}
	return results.length > 0;
}

/**
 * Get author by ID
 */
export async function getAuthor(id: string) {
	const results = await db
		.select()
		.from(author)
		.where(eq(author.id, id))
		.limit(1);
	return results[0] || null;
}

/**
 * Get first author
 */
export async function getFirstAuthor() {
	const results = await db.select().from(author).limit(1);
	return results[0] || null;
}

/**
 * Create author
 */
export async function createAuthor(data: {
	slug: string;
	name: string;
	bio?: string;
	credentials?: string;
	profilePicture?: string;
	email?: string;
	website?: string;
	socialLinks?: Record<string, string>;
}) {
	const id = crypto.randomUUID();
	const now = new Date();
	await db.insert(author).values({
		id,
		slug: data.slug,
		name: data.name,
		bio: data.bio || null,
		credentials: data.credentials || null,
		profilePicture: data.profilePicture || null,
		email: data.email || null,
		website: data.website || null,
		socialLinks: stringifyJson(data.socialLinks),
		createdAt: now,
		updatedAt: now,
	});
	return id;
}

/**
 * Update author
 */
export async function updateAuthor(
	id: string,
	data: {
		slug?: string;
		name?: string;
		bio?: string;
		credentials?: string;
		profilePicture?: string;
		email?: string;
		website?: string;
		socialLinks?: Record<string, string>;
	},
) {
	const updateData: Record<string, unknown> = {
		updatedAt: new Date(),
	};
	if (data.slug !== undefined) updateData.slug = data.slug;
	if (data.name !== undefined) updateData.name = data.name;
	if (data.bio !== undefined) updateData.bio = data.bio || null;
	if (data.credentials !== undefined)
		updateData.credentials = data.credentials || null;
	if (data.profilePicture !== undefined)
		updateData.profilePicture = data.profilePicture || null;
	if (data.email !== undefined) updateData.email = data.email || null;
	if (data.website !== undefined) updateData.website = data.website || null;
	if (data.socialLinks !== undefined)
		updateData.socialLinks = stringifyJson(data.socialLinks);
	await db.update(author).set(updateData).where(eq(author.id, id));
}
