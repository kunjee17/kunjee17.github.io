// Blog queries for Categories

import { and, eq } from "drizzle-orm";
import { db } from "../../db/client";
import { categories, writingCategories, writings } from "../../schema/tables";

/**
 * Get all categories with writing counts
 */
export async function getAllCategories() {
	const allCategories = await db
		.select()
		.from(categories)
		.orderBy(categories.name);

	const categoriesWithCounts = await Promise.all(
		allCategories.map(async (category) => {
			const writingResults = await db
				.select()
				.from(writingCategories)
				.innerJoin(writings, eq(writingCategories.writingId, writings.id))
				.where(
					and(
						eq(writingCategories.categoryId, category.id),
						eq(writings.draft, false),
					),
				);

			return {
				...category,
				count: writingResults.length,
			};
		}),
	);

	return categoriesWithCounts;
}
