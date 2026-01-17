// Admin dashboard queries

import { eq, sql } from "drizzle-orm";
import { db } from "../../db/client";
import {
	categories,
	faqs,
	media,
	pages,
	tags,
	writings,
} from "../../schema/tables";

/**
 * Get dashboard statistics
 */
export async function getDashboardStats() {
	const [
		writingsResult,
		pagesResult,
		tagsResult,
		categoriesResult,
		mediaResult,
		faqsResult,
		draftsResult,
	] = await Promise.all([
		db.select({ count: sql<number>`count(*)` }).from(writings),
		db.select({ count: sql<number>`count(*)` }).from(pages),
		db.select({ count: sql<number>`count(*)` }).from(tags),
		db.select({ count: sql<number>`count(*)` }).from(categories),
		db.select({ count: sql<number>`count(*)` }).from(media),
		db.select({ count: sql<number>`count(*)` }).from(faqs),
		db
			.select({ count: sql<number>`count(*)` })
			.from(writings)
			.where(eq(writings.draft, true)),
	]);

	return {
		writings: Number(writingsResult[0]?.count) || 0,
		pages: Number(pagesResult[0]?.count) || 0,
		tags: Number(tagsResult[0]?.count) || 0,
		categories: Number(categoriesResult[0]?.count) || 0,
		media: Number(mediaResult[0]?.count) || 0,
		faqs: Number(faqsResult[0]?.count) || 0,
		drafts: Number(draftsResult[0]?.count) || 0,
	};
}
