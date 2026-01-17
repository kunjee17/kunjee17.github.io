// Blog queries for Tags

import { and, eq } from "drizzle-orm";
import { db } from "../../db/client";
import { tags, writings, writingTags } from "../../schema/tables";

/**
 * Get all tags with writing counts
 */
export async function getAllTags() {
	const allTags = await db.select().from(tags).orderBy(tags.name);

	const tagsWithCounts = await Promise.all(
		allTags.map(async (tag) => {
			const writingResults = await db
				.select()
				.from(writingTags)
				.innerJoin(writings, eq(writingTags.writingId, writings.id))
				.where(and(eq(writingTags.tagId, tag.id), eq(writings.draft, false)));

			return {
				...tag,
				count: writingResults.length,
			};
		}),
	);

	return tagsWithCounts;
}
