// Admin queries for Media

import { desc, eq } from "drizzle-orm";
import { db } from "../../db/client";
import { media } from "../../schema/tables";

/**
 * Get all media
 */
export async function getAllMedia() {
	return await db.select().from(media).orderBy(desc(media.uploadedAt));
}

/**
 * Get media by ID
 */
export async function getMedia(id: string) {
	const results = await db
		.select()
		.from(media)
		.where(eq(media.id, id))
		.limit(1);
	return results[0] || null;
}

/**
 * Create media
 */
export async function createMedia(data: {
	filename: string;
	url: string;
	storageProvider: string;
	mimeType?: string;
	size?: number;
	altText?: string;
	title?: string;
	caption?: string;
	width?: number;
	height?: number;
}) {
	const id = crypto.randomUUID();
	await db.insert(media).values({
		id,
		filename: data.filename,
		url: data.url,
		storageProvider: data.storageProvider,
		mimeType: data.mimeType || null,
		size: data.size || null,
		altText: data.altText || null,
		title: data.title || null,
		caption: data.caption || null,
		width: data.width || null,
		height: data.height || null,
		uploadedAt: new Date(),
	});
	return id;
}

/**
 * Update media
 */
export async function updateMedia(
	id: string,
	data: {
		filename?: string;
		url?: string;
		mimeType?: string;
		size?: number;
		altText?: string;
		title?: string;
		caption?: string;
		width?: number;
		height?: number;
	},
) {
	const updateData: Record<string, unknown> = {};
	if (data.filename !== undefined) updateData.filename = data.filename;
	if (data.url !== undefined) updateData.url = data.url;
	if (data.mimeType !== undefined) updateData.mimeType = data.mimeType || null;
	if (data.size !== undefined) updateData.size = data.size || null;
	if (data.altText !== undefined) updateData.altText = data.altText || null;
	if (data.title !== undefined) updateData.title = data.title || null;
	if (data.caption !== undefined) updateData.caption = data.caption || null;
	if (data.width !== undefined) updateData.width = data.width || null;
	if (data.height !== undefined) updateData.height = data.height || null;
	await db.update(media).set(updateData).where(eq(media.id, id));
}

/**
 * Delete media
 */
export async function deleteMedia(id: string) {
	await db.delete(media).where(eq(media.id, id));
}
