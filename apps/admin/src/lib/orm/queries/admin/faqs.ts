// Admin queries for FAQs

import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { faqs } from "../../schema/tables";

/**
 * Get all FAQs
 */
export async function getAllFAQs() {
	return await db.select().from(faqs).orderBy(faqs.order, faqs.createdAt);
}

/**
 * Get FAQ by ID
 */
export async function getFAQ(id: string) {
	const results = await db.select().from(faqs).where(eq(faqs.id, id)).limit(1);
	return results[0] || null;
}

/**
 * Get FAQs for a writing
 */
export async function getFAQsForWriting(writingId: string) {
	return await db
		.select()
		.from(faqs)
		.where(eq(faqs.writingId, writingId))
		.orderBy(faqs.order, faqs.createdAt);
}

/**
 * Get FAQs for a page
 */
export async function getFAQsForPage(pageId: string) {
	return await db
		.select()
		.from(faqs)
		.where(eq(faqs.pageId, pageId))
		.orderBy(faqs.order, faqs.createdAt);
}

/**
 * Create FAQ
 */
export async function createFAQ(data: {
	writingId?: string;
	pageId?: string;
	question: string;
	answer: string;
	order?: number;
}) {
	const id = crypto.randomUUID();
	await db.insert(faqs).values({
		id,
		writingId: data.writingId || null,
		pageId: data.pageId || null,
		question: data.question,
		answer: data.answer,
		order: data.order || null,
		createdAt: new Date(),
		updatedAt: new Date(),
	});
	return id;
}

/**
 * Update FAQ
 */
export async function updateFAQ(
	id: string,
	data: {
		writingId?: string;
		pageId?: string;
		question?: string;
		answer?: string;
		order?: number;
	},
) {
	const updateData: Record<string, unknown> = {
		updatedAt: new Date(),
	};
	if (data.writingId !== undefined)
		updateData.writingId = data.writingId || null;
	if (data.pageId !== undefined) updateData.pageId = data.pageId || null;
	if (data.question !== undefined) updateData.question = data.question;
	if (data.answer !== undefined) updateData.answer = data.answer;
	if (data.order !== undefined) updateData.order = data.order || null;
	await db.update(faqs).set(updateData).where(eq(faqs.id, id));
}

/**
 * Delete FAQ
 */
export async function deleteFAQ(id: string) {
	await db.delete(faqs).where(eq(faqs.id, id));
}
