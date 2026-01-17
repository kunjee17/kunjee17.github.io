// Admin queries for Pages

import { desc, eq } from "drizzle-orm";
import { db } from "../../db/client";
import { faqs, pages } from "../../schema/tables";
import { generateSlug, stringifyJson } from "../utils";

/**
 * Check if page slug exists
 */
export async function checkPageSlugExists(
	slug: string,
	excludeId?: string,
): Promise<boolean> {
	const query = db.select().from(pages).where(eq(pages.slug, slug)).limit(1);
	const results = await query;
	if (excludeId) {
		return results.some((page) => page.id !== excludeId);
	}
	return results.length > 0;
}

/**
 * Get all pages
 */
export async function getAllPages() {
	return await db.select().from(pages).orderBy(desc(pages.createdAt));
}

/**
 * Get page by ID
 */
export async function getPage(id: string) {
	const results = await db
		.select()
		.from(pages)
		.where(eq(pages.id, id))
		.limit(1);
	return results[0] || null;
}

/**
 * Create page
 */
export async function createPage(data: {
	title: string;
	slug?: string;
	linkTitle?: string;
	description?: string;
	summary?: string;
	content: string;
	createdAt?: Date;
	publishedAt?: Date;
	expiryDate?: Date;
	draft?: boolean;
	keywords?: string[];
	aliases?: string[];
	url?: string;
	type?: string;
	layout?: string;
	weight?: number;
}) {
	const id = crypto.randomUUID();
	const slug = data.slug || generateSlug(data.title);
	const now = new Date();
	await db.insert(pages).values({
		id,
		slug,
		title: data.title,
		linkTitle: data.linkTitle || null,
		description: data.description || null,
		summary: data.summary || null,
		content: data.content,
		frontMatter: stringifyJson({}),
		createdAt: data.createdAt || now,
		updatedAt: now,
		publishedAt: data.publishedAt || null,
		expiryDate: data.expiryDate || null,
		draft: data.draft ?? false,
		keywords: stringifyJson(data.keywords),
		aliases: stringifyJson(data.aliases),
		url: data.url || null,
		type: data.type || null,
		layout: data.layout || null,
		weight: data.weight || null,
	});
	return id;
}

/**
 * Update page
 */
export async function updatePage(
	id: string,
	data: {
		title?: string;
		slug?: string;
		linkTitle?: string;
		description?: string;
		summary?: string;
		content?: string;
		publishedAt?: Date;
		expiryDate?: Date;
		draft?: boolean;
		keywords?: string[];
		aliases?: string[];
		url?: string;
		type?: string;
		layout?: string;
		weight?: number;
	},
) {
	const updateData: Record<string, unknown> = {
		updatedAt: new Date(),
	};
	if (data.title !== undefined) updateData.title = data.title;
	if (data.slug !== undefined) updateData.slug = data.slug;
	if (data.linkTitle !== undefined) updateData.linkTitle = data.linkTitle;
	if (data.description !== undefined)
		updateData.description = data.description || null;
	if (data.summary !== undefined) updateData.summary = data.summary || null;
	if (data.content !== undefined) updateData.content = data.content;
	if (data.publishedAt !== undefined)
		updateData.publishedAt = data.publishedAt || null;
	if (data.expiryDate !== undefined)
		updateData.expiryDate = data.expiryDate || null;
	if (data.draft !== undefined) updateData.draft = data.draft;
	if (data.keywords !== undefined)
		updateData.keywords = stringifyJson(data.keywords);
	if (data.aliases !== undefined)
		updateData.aliases = stringifyJson(data.aliases);
	if (data.url !== undefined) updateData.url = data.url || null;
	if (data.type !== undefined) updateData.type = data.type || null;
	if (data.layout !== undefined) updateData.layout = data.layout || null;
	if (data.weight !== undefined) updateData.weight = data.weight || null;
	await db.update(pages).set(updateData).where(eq(pages.id, id));
}

/**
 * Delete page
 */
export async function deletePage(id: string) {
	await db.delete(faqs).where(eq(faqs.pageId, id));
	await db.delete(pages).where(eq(pages.id, id));
}
