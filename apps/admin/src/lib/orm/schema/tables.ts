// Drizzle ORM schema definitions
// Converted from AstroDB schema

import {
	integer,
	primaryKey,
	real,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

// Tags table (Hugo taxonomy - normalized for querying and taxonomy pages)
export const tags = sqliteTable("tags", {
	id: text("id").primaryKey(),
	slug: text("slug").notNull().unique(), // URL-friendly slug for taxonomy pages
	name: text("name").notNull().unique(), // Display name
	description: text("description"), // Optional description for tag pages
	createdAt: integer("createdAt", { mode: "timestamp" }).notNull(), // Stored as Unix timestamp
});

// Categories table (Hugo taxonomy - normalized for querying and taxonomy pages)
export const categories = sqliteTable("categories", {
	id: text("id").primaryKey(),
	slug: text("slug").notNull().unique(), // URL-friendly slug for taxonomy pages
	name: text("name").notNull().unique(), // Display name
	description: text("description"), // Optional description for category pages
	createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});

// Author table (single author for E-E-A-T)
export const author = sqliteTable("author", {
	id: text("id").primaryKey(),
	slug: text("slug").notNull().unique(), // URL-friendly slug
	name: text("name").notNull(), // Display name
	bio: text("bio"), // Short biography
	credentials: text("credentials"), // Author credentials/expertise
	profilePicture: text("profilePicture"), // URL to profile picture
	email: text("email"), // Contact email
	website: text("website"), // Personal website
	socialLinks: text("socialLinks"), // Social media links stored as JSON string
	createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

// Writings table (standardized name - used in both admin and blog)
export const writings = sqliteTable("writings", {
	id: text("id").primaryKey(),
	slug: text("slug").notNull().unique(),
	title: text("title").notNull(),
	linkTitle: text("linkTitle"), // Hugo: shorter version of title for links
	description: text("description"), // Hugo: SEO meta description
	summary: text("summary"), // Hugo: content summary/teaser
	content: text("content").notNull(),
	frontMatter: text("frontMatter"), // Hugo-compatible front matter stored as JSON string
	// Dates (Hugo-compatible) - stored as Unix timestamps
	createdAt: integer("createdAt", { mode: "timestamp" }).notNull(), // Maps to Hugo 'date'
	updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(), // Maps to Hugo 'lastmod' / 'modified'
	publishedAt: integer("publishedAt", { mode: "timestamp" }), // Maps to Hugo 'publishDate'
	expiryDate: integer("expiryDate", { mode: "timestamp" }), // Hugo: page expiration date
	// Status flags
	draft: integer("draft", { mode: "boolean" }).notNull().default(false), // Hugo: draft flag
	featured: integer("featured", { mode: "boolean" }).notNull().default(false), // Custom: featured posts
	// SEO (keywords stored as JSON string)
	keywords: text("keywords"), // Hugo: keywords for SEO (array of strings as JSON)
	// SEO metadata (2026 best practices)
	canonicalUrl: text("canonicalUrl"), // Canonical URL to prevent duplicate content
	metaRobots: text("metaRobots"), // Robots meta tag
	ogImage: text("ogImage"), // Open Graph image URL for social sharing
	ogType: text("ogType"), // Open Graph type
	twitterCard: text("twitterCard"), // Twitter card type
	schemaType: text("schemaType"), // Schema.org type
	schemaJson: text("schemaJson"), // Custom JSON-LD structured data as JSON string
	sitemapPriority: real("sitemapPriority"), // Sitemap priority (0.0 to 1.0)
	sitemapChangefreq: text("sitemapChangefreq"), // Sitemap changefreq
	// Content metrics (for SEO and UX - computed at build time for static generation)
	wordCount: integer("wordCount"), // Word count for content quality metrics
	readingTime: integer("readingTime"), // Estimated reading time in minutes
	// Author (single author - foreign key)
	authorId: text("authorId").references(() => author.id), // Single author reference
	// URL management (Hugo-compatible)
	aliases: text("aliases"), // Hugo: redirect aliases stored as JSON string
	url: text("url"), // Hugo: custom URL override
	// Template and type selection (Hugo-compatible)
	type: text("type"), // Hugo: content type for template selection
	layout: text("layout"), // Hugo: specific template name override
	// Sorting and ordering (Hugo-compatible)
	weight: integer("weight"), // Hugo: weight for sorting (lower = higher priority)
});

// Junction table: Writings <-> Tags (many-to-many)
export const writingTags = sqliteTable(
	"writingTags",
	{
		writingId: text("writingId")
			.notNull()
			.references(() => writings.id),
		tagId: text("tagId")
			.notNull()
			.references(() => tags.id),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.writingId, table.tagId] }),
	}),
);

// Junction table: Writings <-> Categories (many-to-many)
export const writingCategories = sqliteTable(
	"writingCategories",
	{
		writingId: text("writingId")
			.notNull()
			.references(() => writings.id),
		categoryId: text("categoryId")
			.notNull()
			.references(() => categories.id),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.writingId, table.categoryId] }),
	}),
);

// Internal linking table: Writings -> Writings (for SEO and content relationships)
export const writingReferences = sqliteTable("writingReferences", {
	id: text("id").primaryKey(),
	fromWritingId: text("fromWritingId")
		.notNull()
		.references(() => writings.id), // Source writing
	toWritingId: text("toWritingId")
		.notNull()
		.references(() => writings.id), // Referenced writing
	anchorText: text("anchorText"), // Custom anchor text for the link
	linkType: text("linkType"), // Type: 'related', 'reference', 'prerequisite', 'follow-up', 'series'
	weight: integer("weight"), // Order/priority (lower = higher priority, shown first)
	createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});

// Pages table
export const pages = sqliteTable("pages", {
	id: text("id").primaryKey(),
	slug: text("slug").notNull().unique(),
	title: text("title").notNull(),
	linkTitle: text("linkTitle"), // Hugo: shorter version of title for links
	description: text("description"), // Hugo: SEO meta description
	summary: text("summary"), // Hugo: content summary/teaser
	content: text("content").notNull(),
	frontMatter: text("frontMatter"), // Hugo-compatible front matter stored as JSON string
	// Dates (Hugo-compatible)
	createdAt: integer("createdAt", { mode: "timestamp" }).notNull(), // Maps to Hugo 'date'
	updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(), // Maps to Hugo 'lastmod' / 'modified'
	publishedAt: integer("publishedAt", { mode: "timestamp" }), // Maps to Hugo 'publishDate'
	expiryDate: integer("expiryDate", { mode: "timestamp" }), // Hugo: page expiration date
	// Status flags
	draft: integer("draft", { mode: "boolean" }).notNull().default(false), // Hugo: draft flag
	// URL management (Hugo-compatible)
	aliases: text("aliases"), // Hugo: redirect aliases stored as JSON string
	url: text("url"), // Hugo: custom URL override
	// Template and type selection (Hugo-compatible)
	type: text("type"), // Hugo: content type for template selection
	layout: text("layout"), // Hugo: specific template name override
	// SEO
	keywords: text("keywords"), // Hugo: keywords for SEO stored as JSON string
	// Sorting and ordering (Hugo-compatible)
	weight: integer("weight"), // Hugo: weight for sorting (lower = higher priority)
});

// Media/assets metadata table
export const media = sqliteTable("media", {
	id: text("id").primaryKey(),
	filename: text("filename").notNull(),
	url: text("url").notNull(),
	storageProvider: text("storageProvider").notNull(), // 'netlify-blob' or 'tigris'
	mimeType: text("mimeType"),
	size: integer("size"), // Size in bytes
	// SEO fields for images
	altText: text("altText"), // Alt text for accessibility and SEO
	title: text("title"), // Image title attribute
	caption: text("caption"), // Image caption
	width: integer("width"), // Image width in pixels
	height: integer("height"), // Image height in pixels
	uploadedAt: integer("uploadedAt", { mode: "timestamp" }).notNull(),
});

// FAQs table (for FAQ schema and voice search optimization)
export const faqs = sqliteTable("faqs", {
	id: text("id").primaryKey(),
	writingId: text("writingId").references(() => writings.id), // Optional: link to writing
	pageId: text("pageId").references(() => pages.id), // Optional: link to page
	question: text("question").notNull(), // FAQ question
	answer: text("answer").notNull(), // FAQ answer
	order: integer("order"), // Display order
	createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

// Rebuild flags table (for scheduled rebuilds)
export const rebuildFlags = sqliteTable("rebuildFlags", {
	id: text("id").primaryKey(),
	pending: integer("pending", { mode: "boolean" }).notNull().default(false),
	triggeredAt: integer("triggeredAt", { mode: "timestamp" }),
	completedAt: integer("completedAt", { mode: "timestamp" }),
});
