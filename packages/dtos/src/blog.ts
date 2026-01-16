// Blog post type definitions
// Hugo-compatible front matter structure for migration compatibility

export interface BlogPostFrontMatter {
	title: string;
	date: string; // Maps to createdAt
	lastmod?: string; // Maps to updatedAt
	modified?: string; // Alias for lastmod
	publishDate?: string; // Maps to publishedAt
	pubdate?: string; // Alias for publishDate
	published?: string; // Alias for publishDate
	expiryDate?: string;
	description?: string;
	summary?: string;
	linkTitle?: string;
	tags?: string[];
	categories?: string[];
	keywords?: string[];
	aliases?: string[];
	draft?: boolean;
	featured?: boolean;
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

// Tag type (normalized)
export interface Tag {
	id: string;
	slug: string;
	name: string;
	description?: string;
	createdAt: Date;
}

// Category type (normalized)
export interface Category {
	id: string;
	slug: string;
	name: string;
	description?: string;
	createdAt: Date;
}

// Author type (single author for E-E-A-T - simplified for static generation)
export interface Author {
	id: string;
	slug: string;
	name: string;
	bio?: string;
	credentials?: string;
	profilePicture?: string;
	email?: string;
	website?: string;
	socialLinks?: Record<string, string>; // e.g., { twitter: "...", linkedin: "..." }
	createdAt: Date;
	updatedAt: Date;
}

// FAQ type (for FAQ schema and voice search)
export interface FAQ {
	id: string;
	blogPostId?: string;
	pageId?: string;
	question: string;
	answer: string;
	order?: number;
	createdAt: Date;
	updatedAt: Date;
}

// Media type (enhanced with SEO fields)
export interface Media {
	id: string;
	filename: string;
	url: string;
	storageProvider: string; // 'netlify-blob' or 'tigris'
	mimeType?: string;
	size?: number; // Size in bytes
	// SEO fields for images
	altText?: string; // Alt text for accessibility and SEO
	title?: string; // Image title attribute
	caption?: string; // Image caption
	width?: number; // Image width in pixels
	height?: number; // Image height in pixels
	uploadedAt: Date;
}

// Blog post reference (internal linking for SEO)
export interface BlogPostReference {
	id: string;
	fromPostId: string; // Source post ID
	toPostId: string; // Referenced post ID
	anchorText?: string; // Custom anchor text (if not provided, use post title)
	linkType?: "related" | "reference" | "prerequisite" | "follow-up" | "series"; // Type of relationship
	weight?: number; // Order/priority (lower = higher priority)
	createdAt: Date;
	// Populated when loading
	referencedPost?: BlogPost; // The actual referenced post (loaded via join)
}

export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	linkTitle?: string;
	description?: string;
	summary?: string;
	content: string;
	frontMatter: BlogPostFrontMatter; // Full front matter for flexibility
	// Dates
	createdAt: Date; // Maps to Hugo 'date'
	updatedAt: Date; // Maps to Hugo 'lastmod' / 'modified'
	publishedAt?: Date; // Maps to Hugo 'publishDate' / 'pubdate' / 'published'
	expiryDate?: Date;
	// Status
	draft: boolean;
	featured: boolean;
	// Taxonomies (normalized - loaded via joins)
	tags?: Tag[]; // Loaded from BlogPostTags junction table
	categories?: Category[]; // Loaded from BlogPostCategories junction table
	// SEO (keywords remain as array for meta tags)
	keywords?: string[];
	// SEO metadata (2026 best practices)
	canonicalUrl?: string; // Canonical URL to prevent duplicate content
	metaRobots?: string; // Robots meta tag (e.g., 'noindex, nofollow', 'index, follow')
	ogImage?: string; // Open Graph image URL for social sharing
	ogType?: string; // Open Graph type (e.g., 'article', 'website')
	twitterCard?: string; // Twitter card type (e.g., 'summary_large_image')
	schemaType?: string; // Schema.org type (e.g., 'Article', 'BlogPosting', 'FAQPage')
	schemaJson?: Record<string, unknown>; // Custom JSON-LD structured data
	sitemapPriority?: number; // Sitemap priority (0.0 to 1.0)
	sitemapChangefreq?: string; // Sitemap changefreq (e.g., 'daily', 'weekly', 'monthly')
	// Content metrics (for SEO and UX - computed at build time for static generation)
	wordCount?: number; // Word count for content quality metrics
	readingTime?: number; // Estimated reading time in minutes
	// Author (single author - loaded via foreign key for static generation)
	authorId?: string; // Single author reference
	author?: Author; // Author data (loaded via join at build time)
	// FAQs (for FAQ schema and voice search - static data)
	faqs?: FAQ[]; // FAQs associated with this post
	// Internal linking (for SEO and content relationships)
	references?: BlogPostReference[]; // Posts this post links to (outgoing links)
	referencedBy?: BlogPostReference[]; // Posts that link to this post (incoming links)
	// URL management
	aliases?: string[];
	url?: string;
	// Template selection
	type?: string;
	layout?: string;
	// Sorting
	weight?: number;
}
