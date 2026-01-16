// Content Utilities
// Functions for processing and manipulating content

/**
 * Calculate reading time based on word count
 * Average reading speed: 200-250 words per minute
 */
export function calculateReadingTime(
	content: string,
	wordsPerMinute: number = 225,
): number {
	const wordCount = countWords(content);
	return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Count words in content
 */
export function countWords(content: string): number {
	// Remove code blocks
	const withoutCode = content.replace(/```[\s\S]*?```/g, "");

	// Count words
	const words = withoutCode
		.replace(/[^\w\s]/g, " ")
		.split(/\s+/)
		.filter((word) => word.length > 0);

	return words.length;
}

/**
 * Extract first image from markdown content
 */
export function extractFirstImage(content: string): string | null {
	// Match markdown image syntax: ![alt](url)
	const markdownImageRegex = /!\[.*?\]\((.*?)\)/;
	const match = content.match(markdownImageRegex);

	if (match?.[1]) {
		return match[1];
	}

	// Match HTML img tags: <img src="url" />
	const htmlImageRegex = /<img[^>]+src="([^">]+)"/;
	const htmlMatch = content.match(htmlImageRegex);

	if (htmlMatch?.[1]) {
		return htmlMatch[1];
	}

	return null;
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(content: string, length: number = 150): string {
	// Remove markdown formatting
	const cleaned = content
		.replace(/```[\s\S]*?```/g, "") // Remove code blocks
		.replace(/[#*`_~[\]()]/g, "") // Remove markdown symbols
		.replace(/\n+/g, " ") // Replace newlines with spaces
		.trim();

	if (cleaned.length <= length) {
		return cleaned;
	}

	// Truncate at word boundary
	const truncated = cleaned.slice(0, length);
	const lastSpace = truncated.lastIndexOf(" ");

	return lastSpace > 0
		? `${truncated.slice(0, lastSpace)}...`
		: `${truncated}...`;
}

/**
 * Group posts by category/theme
 */
export function groupPostsByTheme(
	posts: Array<{
		id: string;
		title: string;
		slug: string;
		categories?: Array<{ name: string; slug: string }>;
	}>,
) {
	const themes: Record<
		string,
		Array<{
			id: string;
			title: string;
			slug: string;
		}>
	> = {
		Architecture: [],
		"AI & RAG Systems": [],
		"Cost, Scale & Reliability": [],
		"LegalTech / Healthcare": [],
		"Tech Leadership": [],
		"Functional Programming": [],
		Other: [],
	};

	posts.forEach((post) => {
		let categorized = false;

		// Check categories
		if (post.categories) {
			post.categories.forEach((cat) => {
				const catName = cat.name.toLowerCase();

				if (catName.includes("architecture")) {
					themes.Architecture.push(post);
					categorized = true;
				} else if (
					catName.includes("ai") ||
					catName.includes("rag") ||
					catName.includes("machine learning")
				) {
					themes["AI & RAG Systems"].push(post);
					categorized = true;
				} else if (
					catName.includes("legal") ||
					catName.includes("healthcare")
				) {
					themes["LegalTech / Healthcare"].push(post);
					categorized = true;
				} else if (
					catName.includes("leadership") ||
					catName.includes("management")
				) {
					themes["Tech Leadership"].push(post);
					categorized = true;
				} else if (
					catName.includes("functional") ||
					catName.includes("fsharp") ||
					catName.includes("f#")
				) {
					themes["Functional Programming"].push(post);
					categorized = true;
				}
			});
		}

		// Check title for keywords if not categorized
		if (!categorized) {
			const title = post.title.toLowerCase();

			if (
				title.includes("architecture") ||
				title.includes("system") ||
				title.includes("design")
			) {
				themes.Architecture.push(post);
			} else if (
				title.includes("cost") ||
				title.includes("scale") ||
				title.includes("reliability") ||
				title.includes("performance")
			) {
				themes["Cost, Scale & Reliability"].push(post);
			} else if (
				title.includes("f#") ||
				title.includes("fsharp") ||
				title.includes("functional")
			) {
				themes["Functional Programming"].push(post);
			} else {
				themes.Other.push(post);
			}
		}
	});

	// Remove empty themes
	return Object.fromEntries(
		Object.entries(themes).filter(([_, posts]) => posts.length > 0),
	);
}

/**
 * Convert markdown to HTML (basic implementation)
 * For production, use a proper markdown library like marked or remark
 */
export function markdownToHtml(markdown: string): string {
	// This is a placeholder - in production, use a proper markdown library
	// For now, just return the markdown as-is
	return markdown;
}

/**
 * Slugify a string
 */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "") // Remove non-word chars except spaces and hyphens
		.replace(/[\s_-]+/g, "-") // Replace spaces, underscores, and multiple hyphens with single hyphen
		.replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}

/**
 * Format date for display
 */
export function formatDate(
	date: Date,
	format: "short" | "long" | "relative" = "long",
): string {
	if (format === "short") {
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	}

	if (format === "long") {
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}

	// Relative format
	const now = new Date();
	const diffInMs = now.getTime() - date.getTime();
	const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

	if (diffInDays === 0) return "Today";
	if (diffInDays === 1) return "Yesterday";
	if (diffInDays < 7) return `${diffInDays} days ago`;
	if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
	if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
	return `${Math.floor(diffInDays / 365)} years ago`;
}
