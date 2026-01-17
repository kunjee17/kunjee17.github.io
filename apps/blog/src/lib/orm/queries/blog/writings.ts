// Blog queries for Writings (published posts)

import { and, desc, eq } from "drizzle-orm";
import { db } from "../../db/client";
import {
	author,
	categories,
	faqs,
	tags,
	writingCategories,
	writingReferences,
	writings,
	writingTags,
} from "../../schema/tables";

/**
 * Get all published writings (not drafts)
 */
export async function getPublishedWritings() {
	return await db
		.select()
		.from(writings)
		.where(eq(writings.draft, false))
		.orderBy(desc(writings.publishedAt));
}

/**
 * Get a single writing by slug with all related data
 */
export async function getWritingBySlug(slug: string) {
	const results = await db
		.select()
		.from(writings)
		.where(eq(writings.slug, slug))
		.limit(1);

	if (results.length === 0) {
		return null;
	}

	const writing = results[0];

	// Get author
	let authorData = null;
	if (writing?.authorId) {
		const authors = await db
			.select()
			.from(author)
			.where(eq(author.id, writing.authorId))
			.limit(1);
		authorData = authors[0] || null;
	}

	// Get tags
	const tagResults = await db
		.select({
			id: tags.id,
			slug: tags.slug,
			name: tags.name,
			description: tags.description,
			createdAt: tags.createdAt,
		})
		.from(writingTags)
		.innerJoin(tags, eq(writingTags.tagId, tags.id))
		.where(eq(writingTags.writingId, writing?.id ?? ""));

	// Get categories
	const categoryResults = await db
		.select({
			id: categories.id,
			slug: categories.slug,
			name: categories.name,
			description: categories.description,
			createdAt: categories.createdAt,
		})
		.from(writingCategories)
		.innerJoin(categories, eq(writingCategories.categoryId, categories.id))
		.where(eq(writingCategories.writingId, writing?.id ?? ""));

	// Get FAQs
	const faqResults = await db
		.select()
		.from(faqs)
		.where(eq(faqs.writingId, writing?.id ?? ""))
		.orderBy(faqs.order);

	// Get related writings
	const relatedResults = await db
		.select()
		.from(writingReferences)
		.innerJoin(writings, eq(writingReferences.toWritingId, writings.id))
		.where(
			and(
				eq(writingReferences.fromWritingId, writing?.id ?? ""),
				eq(writings.draft, false),
			),
		)
		.orderBy(writingReferences.weight);

	const relatedWritings = relatedResults.map((r) => ({
		...r.writings,
		linkType: r.writingReferences.linkType,
		anchorText: r.writingReferences.anchorText,
	}));

	return {
		writing,
		author: authorData,
		tags: tagResults,
		categories: categoryResults,
		faqs: faqResults,
		relatedWritings,
	};
}

/**
 * Get featured writings for homepage
 */
export async function getFeaturedWritings() {
	return await db
		.select()
		.from(writings)
		.where(and(eq(writings.draft, false), eq(writings.featured, true)))
		.orderBy(desc(writings.publishedAt))
		.limit(5);
}

/**
 * Get writings by category slug
 */
export async function getWritingsByCategory(categorySlug: string) {
	const categoryResults = await db
		.select()
		.from(categories)
		.where(eq(categories.slug, categorySlug))
		.limit(1);

	if (categoryResults.length === 0) {
		return { category: null, writings: [] };
	}

	const category = categoryResults[0];

	const writingResults = await db
		.select()
		.from(writingCategories)
		.innerJoin(writings, eq(writingCategories.writingId, writings.id))
		.where(
			and(
				eq(writingCategories.categoryId, category?.id ?? ""),
				eq(writings.draft, false),
			),
		)
		.orderBy(desc(writings.publishedAt));

	return {
		category,
		writings: writingResults.map((wr) => wr.writings),
	};
}

/**
 * Get writings by tag slug
 */
export async function getWritingsByTag(tagSlug: string) {
	const tagResults = await db
		.select()
		.from(tags)
		.where(eq(tags.slug, tagSlug))
		.limit(1);

	if (tagResults.length === 0) {
		return { tag: null, writings: [] };
	}

	const tag = tagResults[0];

	const writingResults = await db
		.select()
		.from(writingTags)
		.innerJoin(writings, eq(writingTags.writingId, writings.id))
		.where(and(eq(writingTags.tagId, tag?.id ?? ""), eq(writings.draft, false)))
		.orderBy(desc(writings.publishedAt));

	return {
		tag,
		writings: writingResults.map((wr) => wr.writings),
	};
}

/**
 * Get related writings for a given writing ID
 */
export async function getRelatedWritings(writingId: string) {
	const relatedResults = await db
		.select()
		.from(writingReferences)
		.innerJoin(writings, eq(writingReferences.toWritingId, writings.id))
		.where(
			and(
				eq(writingReferences.fromWritingId, writingId),
				eq(writings.draft, false),
			),
		)
		.orderBy(writingReferences.weight);

	return relatedResults.map((r) => ({
		...r.writings,
		linkType: r.writingReferences.linkType,
		anchorText: r.writingReferences.anchorText,
	}));
}

/**
 * Get all writings for sitemap generation
 */
export async function getAllWritingsForSitemap() {
	return await db
		.select({
			slug: writings.slug,
			updatedAt: writings.updatedAt,
			publishedAt: writings.publishedAt,
			sitemapPriority: writings.sitemapPriority,
			sitemapChangefreq: writings.sitemapChangefreq,
		})
		.from(writings)
		.where(eq(writings.draft, false))
		.orderBy(desc(writings.publishedAt));
}
