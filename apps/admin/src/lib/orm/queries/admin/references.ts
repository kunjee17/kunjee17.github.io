// Admin queries for Writing References

import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { writingReferences } from "../../schema/tables";

/**
 * Get references for a writing
 */
export async function getReferencesForWriting(writingId: string) {
	return await db
		.select()
		.from(writingReferences)
		.where(eq(writingReferences.fromWritingId, writingId))
		.orderBy(writingReferences.weight, writingReferences.createdAt);
}

/**
 * Create reference
 */
export async function createReference(data: {
	fromWritingId: string;
	toWritingId: string;
	anchorText?: string;
	linkType?: string;
	weight?: number;
}) {
	const id = crypto.randomUUID();
	await db.insert(writingReferences).values({
		id,
		fromWritingId: data.fromWritingId,
		toWritingId: data.toWritingId,
		anchorText: data.anchorText || null,
		linkType: data.linkType || null,
		weight: data.weight || null,
		createdAt: new Date(),
	});
	return id;
}

/**
 * Delete reference
 */
export async function deleteReference(id: string) {
	await db.delete(writingReferences).where(eq(writingReferences.id, id));
}
