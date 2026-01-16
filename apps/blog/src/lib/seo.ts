// SEO Utilities
// Functions for generating structured data and SEO metadata

/**
 * Generate BlogPosting schema for a blog post
 */
export function generateBlogPostingSchema(
	post: {
		title: string;
		description?: string;
		content: string;
		publishedAt?: Date;
		updatedAt?: Date;
		ogImage?: string;
		keywords?: string[];
	},
	author: {
		name: string;
		website?: string;
		profilePicture?: string;
	},
	url: string,
) {
	const siteUrl = "https://kunjan.in";

	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description || "",
		image: post.ogImage
			? post.ogImage.startsWith("http")
				? post.ogImage
				: `${siteUrl}${post.ogImage}`
			: `${siteUrl}/og-default.png`,
		datePublished: post.publishedAt?.toISOString(),
		dateModified: post.updatedAt?.toISOString(),
		author: {
			"@type": "Person",
			name: author.name,
			url: author.website || siteUrl,
			image: author.profilePicture,
		},
		publisher: {
			"@type": "Person",
			name: author.name,
			url: siteUrl,
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": url,
		},
		keywords: post.keywords?.join(", ") || "",
	};
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(
	faqs: {
		question: string;
		answer: string;
	}[],
) {
	if (!faqs || faqs.length === 0) {
		return null;
	}

	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer,
			},
		})),
	};
}

/**
 * Generate Person schema for author
 */
export function generatePersonSchema(author: {
	name: string;
	bio?: string;
	website?: string;
	email?: string;
	profilePicture?: string;
	socialLinks?: Record<string, string>;
}) {
	const siteUrl = "https://kunjan.in";

	const sameAs: string[] = [];
	if (author.socialLinks) {
		Object.values(author.socialLinks).forEach((link) => {
			if (link) sameAs.push(link);
		});
	}

	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: author.name,
		description: author.bio || "",
		url: author.website || siteUrl,
		email: author.email,
		image: author.profilePicture,
		jobTitle: "Software Architect & Consultant",
		sameAs,
	};
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Fuzzy Cloud",
		url: "https://fuzzycloud.in",
		founder: {
			"@type": "Person",
			name: "Kunjan Dalal",
			url: "https://kunjan.in",
		},
	};
}

/**
 * Get Open Graph image URL with fallback
 */
export function getOgImageUrl(ogImage?: string, firstImage?: string): string {
	const siteUrl = "https://kunjan.in";

	if (ogImage) {
		return ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`;
	}

	if (firstImage) {
		return firstImage.startsWith("http")
			? firstImage
			: `${siteUrl}${firstImage}`;
	}

	return `${siteUrl}/og-default.png`;
}

/**
 * Generate meta description from content
 */
export function generateMetaDescription(
	content: string,
	maxLength: number = 160,
): string {
	// Remove markdown formatting
	const cleaned = content
		.replace(/[#*`_~[\]()]/g, "")
		.replace(/\n+/g, " ")
		.trim();

	if (cleaned.length <= maxLength) {
		return cleaned;
	}

	// Truncate at word boundary
	const truncated = cleaned.slice(0, maxLength);
	const lastSpace = truncated.lastIndexOf(" ");

	return lastSpace > 0
		? `${truncated.slice(0, lastSpace)}...`
		: `${truncated}...`;
}

/**
 * Extract keywords from content
 */
export function extractKeywords(content: string, count: number = 10): string[] {
	// Simple keyword extraction (can be improved with NLP libraries)
	const words = content
		.toLowerCase()
		.replace(/[^\w\s]/g, "")
		.split(/\s+/);

	// Filter common words
	const stopWords = new Set([
		"the",
		"a",
		"an",
		"and",
		"or",
		"but",
		"in",
		"on",
		"at",
		"to",
		"for",
		"of",
		"with",
		"is",
		"are",
		"was",
		"were",
		"be",
		"been",
		"being",
		"have",
		"has",
		"had",
		"do",
		"does",
		"did",
		"will",
		"would",
		"could",
		"should",
		"may",
		"might",
		"can",
	]);

	const filtered = words.filter(
		(word) => word.length > 3 && !stopWords.has(word),
	);

	// Count frequency
	const frequency = new Map<string, number>();
	filtered.forEach((word) => {
		frequency.set(word, (frequency.get(word) || 0) + 1);
	});

	// Sort by frequency and return top keywords
	return Array.from(frequency.entries())
		.sort((a, b) => b[1] - a[1])
		.slice(0, count)
		.map((entry) => entry[0]);
}
