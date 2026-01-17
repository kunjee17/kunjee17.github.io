// Blog queries for Author

import { db } from "../../db/client";
import { author } from "../../schema/tables";
import { parseJson } from "../utils";

/**
 * Get author profile
 */
export async function getAuthor() {
	const results = await db.select().from(author).limit(1);
	const authorData = results[0] || null;
	if (authorData?.socialLinks) {
		// Parse JSON social links
		return {
			...authorData,
			socialLinks: parseJson<Record<string, string>>(authorData.socialLinks),
		};
	}
	return authorData;
}
