// Utility functions for queries

/**
 * Helper to generate slug from title
 */
export function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

/**
 * Helper to calculate word count
 */
export function calculateWordCount(content: string): number {
	return content
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0).length;
}

/**
 * Helper to calculate reading time (average 200 words per minute)
 */
export function calculateReadingTime(wordCount: number): number {
	return Math.ceil(wordCount / 200);
}

/**
 * Validation helpers
 */
export function validateSlugFormat(slug: string): boolean {
	// Slug should only contain lowercase letters, numbers, and hyphens
	// Should not start or end with hyphen
	return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Parse JSON string safely
 */
export function parseJson<T = unknown>(
	jsonString: string | null | undefined,
): T | null {
	if (!jsonString) return null;
	try {
		return JSON.parse(jsonString) as T;
	} catch {
		return null;
	}
}

/**
 * Stringify JSON safely
 */
export function stringifyJson(data: unknown): string | null {
	if (data === null || data === undefined) return null;
	try {
		return JSON.stringify(data);
	} catch {
		return null;
	}
}

/**
 * Format date for datetime-local inputs
 */
export const formatDateTimeLocal = (date: Date | null | undefined): string => {
	if (!date) return "";
	const d = new Date(date);
	d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
	return d.toISOString().slice(0, 16);
};
