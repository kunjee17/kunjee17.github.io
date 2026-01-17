// Admin queries for Categories

import { desc, eq, sql } from "drizzle-orm";
import { db } from "../../db/client";
import { categories, writingCategories, writings } from "../../schema/tables";
import { generateSlug } from "../utils";

/**
 * Check if category name exists
 */
export async function checkCategoryNameExists(
	name: string,
	excludeId?: string,
): Promise<boolean> {
	const query = db
		.select()
		.from(categories)
		.where(eq(categories.name, name))
		.limit(1);
	const results = await query;
	if (excludeId) {
		return results.some((cat) => cat.id !== excludeId);
	}
	return results.length > 0;
}

/**
 * Check if category slug exists
 */
export async function checkCategorySlugExists(
	slug: string,
	excludeId?: string,
): Promise<boolean> {
	const query = db
		.select()
		.from(categories)
		.where(eq(categories.slug, slug))
		.limit(1);
	const results = await query;
	if (excludeId) {
		return results.some((cat) => cat.id !== excludeId);
	}
	return results.length > 0;
}

/**
 * Get all categories
 */
export async function getAllCategories() {
	return await db.select().from(categories).orderBy(categories.name);
}

/**
 * Get category by ID
 */
export async function getCategory(id: string) {
	const results = await db
		.select()
		.from(categories)
		.where(eq(categories.id, id))
		.limit(1);
	return results[0] || null;
}

/**
 * Get categories for a writing
 */
export async function getCategoriesForWriting(writingId: string) {
	const results = await db
		.select({
			id: categories.id,
			slug: categories.slug,
			name: categories.name,
			description: categories.description,
			createdAt: categories.createdAt,
		})
		.from(writingCategories)
		.innerJoin(categories, eq(writingCategories.categoryId, categories.id))
		.where(eq(writingCategories.writingId, writingId));
	return results;
}

/**
 * Create category
 */
export async function createCategory(data: {
	name: string;
	slug?: string;
	description?: string;
}) {
	const id = crypto.randomUUID();
	const slug = data.slug || generateSlug(data.name);
	await db.insert(categories).values({
		id,
		slug,
		name: data.name,
		description: data.description || null,
		createdAt: new Date(),
	});
	return id;
}

/**
 * Update category
 */
export async function updateCategory(
	id: string,
	data: { name?: string; slug?: string; description?: string },
) {
	const updateData: Record<string, unknown> = {};
	if (data.name !== undefined) updateData.name = data.name;
	if (data.slug !== undefined) updateData.slug = data.slug;
	if (data.description !== undefined)
		updateData.description = data.description || null;
	await db.update(categories).set(updateData).where(eq(categories.id, id));
}

/**
 * Delete category
 */
export async function deleteCategory(id: string) {
	await db
		.delete(writingCategories)
		.where(eq(writingCategories.categoryId, id));
	await db.delete(categories).where(eq(categories.id, id));
}

/**
 * Get category writing count
 */
export async function getCategoryWritingCount(categoryId: string) {
	const result = await db
		.select({ count: sql<number>`count(*)` })
		.from(writingCategories)
		.where(eq(writingCategories.categoryId, categoryId));
	return Number(result[0]?.count) || 0;
}

/**
 * Get categories with writing counts
 */
export async function getCategoriesWithWritingCounts() {
	const results = await db
		.select({
			id: categories.id,
			slug: categories.slug,
			name: categories.name,
			description: categories.description,
			createdAt: categories.createdAt,
			writingCount: sql<number>`count(${writingCategories.categoryId})`,
		})
		.from(categories)
		.leftJoin(
			writingCategories,
			eq(categories.id, writingCategories.categoryId),
		)
		.groupBy(categories.id)
		.orderBy(categories.name);

	return results.map((category) => ({
		...category,
		writingCount: Number(category.writingCount) || 0,
	}));
}

/**
 * Get writings by category
 */
export async function getWritingsByCategory(categoryId: string) {
	return await db
		.select({
			id: writings.id,
			slug: writings.slug,
			title: writings.title,
			createdAt: writings.createdAt,
		})
		.from(writingCategories)
		.innerJoin(writings, eq(writingCategories.writingId, writings.id))
		.where(eq(writingCategories.categoryId, categoryId))
		.orderBy(desc(writings.createdAt));
}

/**
 * Get writings by author
 */
export async function getWritingsByAuthor(authorId: string) {
	return await db
		.select({
			id: writings.id,
			slug: writings.slug,
			title: writings.title,
			createdAt: writings.createdAt,
		})
		.from(writings)
		.where(eq(writings.authorId, authorId))
		.orderBy(desc(writings.createdAt));
}
