// Page type definitions
// Hugo-compatible front matter structure for migration compatibility

export interface PageFrontMatter {
	title: string;
	date?: string; // Maps to createdAt
	lastmod?: string; // Maps to updatedAt
	modified?: string; // Alias for lastmod
	publishDate?: string; // Maps to publishedAt
	pubdate?: string; // Alias for publishDate
	published?: string; // Alias for publishDate
	expiryDate?: string;
	description?: string;
	summary?: string;
	linkTitle?: string;
	keywords?: string[];
	aliases?: string[];
	draft?: boolean;
	url?: string;
	type?: string;
	layout?: string;
	weight?: number;
	// Hugo-compatible fields (less common, stored in frontMatter JSON)
	build?: Record<string, unknown>;
	cascade?: Record<string, unknown>;
	headless?: boolean;
	isCJKLanguage?: boolean;
	markup?: string;
	menus?: string | string[] | Record<string, unknown>;
	outputs?: string[];
	params?: Record<string, unknown>;
	resources?: Record<string, unknown>[];
	sitemap?: Record<string, unknown>;
	sites?: Record<string, unknown>;
	// Allow any other custom fields
	[key: string]: unknown;
}

export interface Page {
	id: string;
	slug: string;
	title: string;
	linkTitle?: string;
	description?: string;
	summary?: string;
	content: string;
	frontMatter: PageFrontMatter; // Full front matter for flexibility
	// Dates
	createdAt: Date; // Maps to Hugo 'date'
	updatedAt: Date; // Maps to Hugo 'lastmod' / 'modified'
	publishedAt?: Date; // Maps to Hugo 'publishDate' / 'pubdate' / 'published'
	expiryDate?: Date;
	// Status
	draft: boolean;
	// URL management
	aliases?: string[];
	url?: string;
	// Template selection
	type?: string;
	layout?: string;
	// SEO
	keywords?: string[];
	// Sorting
	weight?: number;
}
