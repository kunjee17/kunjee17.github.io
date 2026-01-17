// Admin queries for Tags

import { desc, eq, sql } from "drizzle-orm";
import { db } from "../../db/client";
import { tags, writings, writingTags } from "../../schema/tables";
import { generateSlug } from "../utils";

/**
 * Check if tag name exists
 */
export async function checkTagNameExists(
	name: string,
	excludeId?: string,
): Promise<boolean> {
	const query = db.select().from(tags).where(eq(tags.name, name)).limit(1);
	const results = await query;
	if (excludeId) {
		return results.some((tag) => tag.id !== excludeId);
	}
	return results.length > 0;
}

/**
 * Check if tag slug exists
 */
export async function checkTagSlugExists(
	slug: string,
	excludeId?: string,
): Promise<boolean> {
	const query = db.select().from(tags).where(eq(tags.slug, slug)).limit(1);
	const results = await query;
	if (excludeId) {
		return results.some((tag) => tag.id !== excludeId);
	}
	return results.length > 0;
}

/**
 * Get all tags
 */
export async function getAllTags() {
	return await db.select().from(tags).orderBy(tags.name);
}

/**
 * Get tag by ID
 */
export async function getTag(id: string) {
	const results = await db.select().from(tags).where(eq(tags.id, id)).limit(1);
	return results[0] || null;
}

/**
 * Get tags for a writing
 */
export async function getTagsForWriting(writingId: string) {
	const results = await db
		.select({
			id: tags.id,
			slug: tags.slug,
			name: tags.name,
			description: tags.description,
			createdAt: tags.createdAt,
		})
		.from(writingTags)
		.innerJoin(tags, eq(writingTags.tagId, tags.id))
		.where(eq(writingTags.writingId, writingId));
	return results;
}

/**
 * Create tag
 */
export async function createTag(data: {
	name: string;
	slug?: string;
	description?: string;
}) {
	const id = crypto.randomUUID();
	const slug = data.slug || generateSlug(data.name);
	await db.insert(tags).values({
		id,
		slug,
		name: data.name,
		description: data.description || null,
		createdAt: new Date(),
	});
	return id;
}

/**
 * Update tag
 */
export async function updateTag(
	id: string,
	data: { name?: string; slug?: string; description?: string },
) {
	const updateData: Record<string, unknown> = {};
	if (data.name !== undefined) updateData.name = data.name;
	if (data.slug !== undefined) updateData.slug = data.slug;
	if (data.description !== undefined)
		updateData.description = data.description || null;
	await db.update(tags).set(updateData).where(eq(tags.id, id));
}

/**
 * Delete tag
 */
export async function deleteTag(id: string) {
	await db.delete(writingTags).where(eq(writingTags.tagId, id));
	await db.delete(tags).where(eq(tags.id, id));
}

/**
 * Get tag post count
 */
export async function getTagWritingCount(tagId: string) {
	const result = await db
		.select({ count: sql<number>`count(*)` })
		.from(writingTags)
		.where(eq(writingTags.tagId, tagId));
	return Number(result[0]?.count) || 0;
}

/**
 * Get tags with writing counts
 */
export async function getTagsWithWritingCounts() {
	const results = await db
		.select({
			id: tags.id,
			slug: tags.slug,
			name: tags.name,
			description: tags.description,
			createdAt: tags.createdAt,
			writingCount: sql<number>`count(${writingTags.tagId})`,
		})
		.from(tags)
		.leftJoin(writingTags, eq(tags.id, writingTags.tagId))
		.groupBy(tags.id)
		.orderBy(tags.name);

	return results.map((tag) => ({
		...tag,
		writingCount: Number(tag.writingCount) || 0,
	}));
}

/**
 * Get writings by tag
 */
export async function getWritingsByTag(tagId: string) {
	return await db
		.select({
			id: writings.id,
			slug: writings.slug,
			title: writings.title,
			createdAt: writings.createdAt,
		})
		.from(writingTags)
		.innerJoin(writings, eq(writingTags.writingId, writings.id))
		.where(eq(writingTags.tagId, tagId))
		.orderBy(desc(writings.createdAt));
}
