// Admin queries for Writings (posts)

import { desc, eq } from "drizzle-orm";
import { db } from "../../db/client";
import {
	author,
	faqs,
	writingCategories,
	writingReferences,
	writings,
	writingTags,
} from "../../schema/tables";
import {
	calculateReadingTime,
	calculateWordCount,
	generateSlug,
	stringifyJson,
} from "../utils";

/**
 * Check if writing slug exists
 */
export async function checkWritingSlugExists(
	slug: string,
	excludeId?: string,
): Promise<boolean> {
	const query = db
		.select()
		.from(writings)
		.where(eq(writings.slug, slug))
		.limit(1);
	const results = await query;
	if (excludeId) {
		return results.some((writing) => writing.id !== excludeId);
	}
	return results.length > 0;
}

/**
 * Get all writings
 */
export async function getAllWritings() {
	return await db.select().from(writings).orderBy(desc(writings.createdAt));
}

/**
 * Get writing by ID
 */
export async function getWriting(id: string) {
	const results = await db
		.select()
		.from(writings)
		.where(eq(writings.id, id))
		.limit(1);
	return results[0] || null;
}

/**
 * Get writing with relations
 */
export async function getWritingWithRelations(id: string) {
	const writing = await getWriting(id);
	if (!writing) return null;

	const [
		tagResults,
		categoryResults,
		authorData,
		faqResults,
		referenceResults,
	] = await Promise.all([
		db
			.select({
				id: writingTags.tagId,
			})
			.from(writingTags)
			.where(eq(writingTags.writingId, id)),
		db
			.select({
				id: writingCategories.categoryId,
			})
			.from(writingCategories)
			.where(eq(writingCategories.writingId, id)),
		writing.authorId
			? db
					.select()
					.from(author)
					.where(eq(author.id, writing.authorId))
					.limit(1)
					.then((r) => r[0] || null)
			: null,
		db.select().from(faqs).where(eq(faqs.writingId, id)),
		db
			.select()
			.from(writingReferences)
			.where(eq(writingReferences.fromWritingId, id)),
	]);

	return {
		...writing,
		tagIds: tagResults.map((t) => t.id),
		categoryIds: categoryResults.map((c) => c.id),
		author: authorData,
		faqs: faqResults,
		references: referenceResults,
	};
}

/**
 * Create writing
 */
export async function createWriting(data: {
	title: string;
	slug?: string;
	linkTitle?: string;
	description?: string;
	summary?: string;
	content: string;
	authorId?: string;
	createdAt?: Date;
	publishedAt?: Date;
	expiryDate?: Date;
	draft?: boolean;
	featured?: boolean;
	keywords?: string[];
	canonicalUrl?: string;
	metaRobots?: string;
	ogImage?: string;
	ogType?: string;
	twitterCard?: string;
	schemaType?: string;
	schemaJson?: Record<string, unknown>;
	sitemapPriority?: number;
	sitemapChangefreq?: string;
	aliases?: string[];
	url?: string;
	type?: string;
	layout?: string;
	weight?: number;
	tagIds?: string[];
	categoryIds?: string[];
}) {
	const id = crypto.randomUUID();
	const slug = data.slug || generateSlug(data.title);
	const wordCount = calculateWordCount(data.content);
	const readingTime = calculateReadingTime(wordCount);
	const now = new Date();

	const writingData = {
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
		featured: data.featured ?? false,
		keywords: stringifyJson(data.keywords),
		canonicalUrl: data.canonicalUrl || null,
		metaRobots: data.metaRobots || null,
		ogImage: data.ogImage || null,
		ogType: data.ogType || null,
		twitterCard: data.twitterCard || null,
		schemaType: data.schemaType || null,
		schemaJson: stringifyJson(data.schemaJson),
		sitemapPriority: data.sitemapPriority || null,
		sitemapChangefreq: data.sitemapChangefreq || null,
		wordCount,
		readingTime,
		authorId: data.authorId || null,
		aliases: stringifyJson(data.aliases),
		url: data.url || null,
		type: data.type || null,
		layout: data.layout || null,
		weight: data.weight || null,
	};

	await db.insert(writings).values(writingData);

	// Handle tags
	if (data.tagIds && data.tagIds.length > 0) {
		await Promise.all(
			data.tagIds.map((tagId) =>
				db.insert(writingTags).values({
					writingId: id,
					tagId,
				}),
			),
		);
	}

	// Handle categories
	if (data.categoryIds && data.categoryIds.length > 0) {
		await Promise.all(
			data.categoryIds.map((categoryId) =>
				db.insert(writingCategories).values({
					writingId: id,
					categoryId,
				}),
			),
		);
	}

	return id;
}

/**
 * Update writing
 */
export async function updateWriting(
	id: string,
	data: {
		title?: string;
		slug?: string;
		linkTitle?: string;
		description?: string;
		summary?: string;
		content?: string;
		authorId?: string;
		publishedAt?: Date;
		expiryDate?: Date;
		draft?: boolean;
		featured?: boolean;
		keywords?: string[];
		canonicalUrl?: string;
		metaRobots?: string;
		ogImage?: string;
		ogType?: string;
		twitterCard?: string;
		schemaType?: string;
		schemaJson?: Record<string, unknown>;
		sitemapPriority?: number;
		sitemapChangefreq?: string;
		aliases?: string[];
		url?: string;
		type?: string;
		layout?: string;
		weight?: number;
		tagIds?: string[];
		categoryIds?: string[];
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
	if (data.content !== undefined) {
		updateData.content = data.content;
		updateData.wordCount = calculateWordCount(data.content);
		updateData.readingTime = calculateReadingTime(
			updateData.wordCount as number,
		);
	}
	if (data.authorId !== undefined) updateData.authorId = data.authorId || null;
	if (data.publishedAt !== undefined)
		updateData.publishedAt = data.publishedAt || null;
	if (data.expiryDate !== undefined)
		updateData.expiryDate = data.expiryDate || null;
	if (data.draft !== undefined) updateData.draft = data.draft;
	if (data.featured !== undefined) updateData.featured = data.featured;
	if (data.keywords !== undefined)
		updateData.keywords = stringifyJson(data.keywords);
	if (data.canonicalUrl !== undefined)
		updateData.canonicalUrl = data.canonicalUrl || null;
	if (data.metaRobots !== undefined)
		updateData.metaRobots = data.metaRobots || null;
	if (data.ogImage !== undefined) updateData.ogImage = data.ogImage || null;
	if (data.ogType !== undefined) updateData.ogType = data.ogType || null;
	if (data.twitterCard !== undefined)
		updateData.twitterCard = data.twitterCard || null;
	if (data.schemaType !== undefined)
		updateData.schemaType = data.schemaType || null;
	if (data.schemaJson !== undefined)
		updateData.schemaJson = stringifyJson(data.schemaJson);
	if (data.sitemapPriority !== undefined)
		updateData.sitemapPriority = data.sitemapPriority || null;
	if (data.sitemapChangefreq !== undefined)
		updateData.sitemapChangefreq = data.sitemapChangefreq || null;
	if (data.aliases !== undefined)
		updateData.aliases = stringifyJson(data.aliases);
	if (data.url !== undefined) updateData.url = data.url || null;
	if (data.type !== undefined) updateData.type = data.type || null;
	if (data.layout !== undefined) updateData.layout = data.layout || null;
	if (data.weight !== undefined) updateData.weight = data.weight || null;

	await db.update(writings).set(updateData).where(eq(writings.id, id));

	// Handle tags
	if (data.tagIds !== undefined) {
		// Delete existing tags
		await db.delete(writingTags).where(eq(writingTags.writingId, id));
		// Insert new tags
		if (data.tagIds.length > 0) {
			await Promise.all(
				data.tagIds.map((tagId) =>
					db.insert(writingTags).values({
						writingId: id,
						tagId,
					}),
				),
			);
		}
	}

	// Handle categories
	if (data.categoryIds !== undefined) {
		// Delete existing categories
		await db
			.delete(writingCategories)
			.where(eq(writingCategories.writingId, id));
		// Insert new categories
		if (data.categoryIds.length > 0) {
			await Promise.all(
				data.categoryIds.map((categoryId) =>
					db.insert(writingCategories).values({
						writingId: id,
						categoryId,
					}),
				),
			);
		}
	}
}

/**
 * Delete writing
 */
export async function deleteWriting(id: string) {
	// Delete relationships first
	await db.delete(writingTags).where(eq(writingTags.writingId, id));
	await db.delete(writingCategories).where(eq(writingCategories.writingId, id));
	await db
		.delete(writingReferences)
		.where(eq(writingReferences.fromWritingId, id));
	await db
		.delete(writingReferences)
		.where(eq(writingReferences.toWritingId, id));
	await db.delete(faqs).where(eq(faqs.writingId, id));
	// Delete writing
	await db.delete(writings).where(eq(writings.id, id));
}
