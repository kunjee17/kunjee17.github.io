// Shared AstroDB configuration
// Used by both blog and admin apps

import { defineDb, defineTable, column } from "astro:db";

// Tags table (Hugo taxonomy - normalized for querying and taxonomy pages)
export const Tags = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		slug: column.text({ unique: true }), // URL-friendly slug for taxonomy pages (e.g., /tags/architecture)
		name: column.text({ unique: true }), // Display name (e.g., "Architecture")
		description: column.text({ optional: true }), // Optional description for tag pages
		createdAt: column.date(),
	},
});

// Categories table (Hugo taxonomy - normalized for querying and taxonomy pages)
export const Categories = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		slug: column.text({ unique: true }), // URL-friendly slug for taxonomy pages (e.g., /categories/tech)
		name: column.text({ unique: true }), // Display name (e.g., "Tech Leadership")
		description: column.text({ optional: true }), // Optional description for category pages
		createdAt: column.date(),
	},
});

// Author table (single author for E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness)
// Simplified for static generation - single author blog
export const Author = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		slug: column.text({ unique: true }), // URL-friendly slug (e.g., /author/kunjan)
		name: column.text(), // Display name
		bio: column.text({ optional: true }), // Short biography
		credentials: column.text({ optional: true }), // Author credentials/expertise
		profilePicture: column.text({ optional: true }), // URL to profile picture
		email: column.text({ optional: true }), // Contact email
		website: column.text({ optional: true }), // Personal website
		socialLinks: column.json({ optional: true }), // Social media links (Twitter, LinkedIn, etc.)
		createdAt: column.date(),
		updatedAt: column.date(),
	},
});

// Blog posts table
export const BlogPosts = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		slug: column.text({ unique: true }),
		title: column.text(),
		linkTitle: column.text({ optional: true }), // Hugo: shorter version of title for links
		description: column.text({ optional: true }), // Hugo: SEO meta description
		summary: column.text({ optional: true }), // Hugo: content summary/teaser (different from description)
		content: column.text(),
		frontMatter: column.json(), // Hugo-compatible front matter stored as JSON (for flexibility and custom fields)
		// Dates (Hugo-compatible)
		createdAt: column.date(), // Maps to Hugo 'date'
		updatedAt: column.date(), // Maps to Hugo 'lastmod' / 'modified'
		publishedAt: column.date({ optional: true }), // Maps to Hugo 'publishDate' / 'pubdate' / 'published'
		expiryDate: column.date({ optional: true }), // Hugo: page expiration date
		// Status flags
		draft: column.boolean({ default: false }), // Hugo: draft flag
		featured: column.boolean({ default: false }), // Custom: featured posts
		// SEO (keywords remain as JSON since they're primarily for meta tags, not navigation)
		keywords: column.json({ optional: true }), // Hugo: keywords for SEO (array of strings)
		// SEO metadata (2026 best practices)
		canonicalUrl: column.text({ optional: true }), // Canonical URL to prevent duplicate content
		metaRobots: column.text({ optional: true }), // Robots meta tag (e.g., 'noindex, nofollow', 'index, follow')
		ogImage: column.text({ optional: true }), // Open Graph image URL for social sharing
		ogType: column.text({ optional: true }), // Open Graph type (e.g., 'article', 'website')
		twitterCard: column.text({ optional: true }), // Twitter card type (e.g., 'summary_large_image')
		schemaType: column.text({ optional: true }), // Schema.org type (e.g., 'Article', 'BlogPosting', 'FAQPage')
		schemaJson: column.json({ optional: true }), // Custom JSON-LD structured data
		sitemapPriority: column.number({ optional: true }), // Sitemap priority (0.0 to 1.0)
		sitemapChangefreq: column.text({ optional: true }), // Sitemap changefreq (e.g., 'daily', 'weekly', 'monthly')
		// Content metrics (for SEO and UX - computed at build time for static generation)
		wordCount: column.number({ optional: true }), // Word count for content quality metrics
		readingTime: column.number({ optional: true }), // Estimated reading time in minutes
		// Author (single author - foreign key for static generation)
		authorId: column.text({
			references: () => Author.columns.id,
			optional: true,
		}), // Single author reference
		// URL management (Hugo-compatible)
		aliases: column.json({ optional: true }), // Hugo: redirect aliases (array of strings)
		url: column.text({ optional: true }), // Hugo: custom URL override
		// Template and type selection (Hugo-compatible)
		type: column.text({ optional: true }), // Hugo: content type for template selection
		layout: column.text({ optional: true }), // Hugo: specific template name override
		// Sorting and ordering (Hugo-compatible)
		weight: column.number({ optional: true }), // Hugo: weight for sorting (lower = higher priority)
	},
});

// Junction table: BlogPosts <-> Tags (many-to-many)
export const BlogPostTags = defineTable({
	columns: {
		blogPostId: column.text({ references: () => BlogPosts.columns.id }),
		tagId: column.text({ references: () => Tags.columns.id }),
	},
});

// Junction table: BlogPosts <-> Categories (many-to-many)
export const BlogPostCategories = defineTable({
	columns: {
		blogPostId: column.text({ references: () => BlogPosts.columns.id }),
		categoryId: column.text({ references: () => Categories.columns.id }),
	},
});

// Internal linking table: BlogPosts -> BlogPosts (for SEO and content relationships)
// Supports explicit internal links between posts for better SEO and user navigation
export const BlogPostReferences = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		fromPostId: column.text({ references: () => BlogPosts.columns.id }), // Source post
		toPostId: column.text({ references: () => BlogPosts.columns.id }), // Referenced post
		anchorText: column.text({ optional: true }), // Custom anchor text for the link (if not provided, use post title)
		linkType: column.text({ optional: true }), // Type: 'related', 'reference', 'prerequisite', 'follow-up', 'series'
		weight: column.number({ optional: true }), // Order/priority (lower = higher priority, shown first)
		createdAt: column.date(),
	},
});

// Pages table
export const Pages = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		slug: column.text({ unique: true }),
		title: column.text(),
		linkTitle: column.text({ optional: true }), // Hugo: shorter version of title for links
		description: column.text({ optional: true }), // Hugo: SEO meta description
		summary: column.text({ optional: true }), // Hugo: content summary/teaser (different from description)
		content: column.text(),
		frontMatter: column.json(), // Hugo-compatible front matter stored as JSON (for flexibility and custom fields)
		// Dates (Hugo-compatible)
		createdAt: column.date(), // Maps to Hugo 'date'
		updatedAt: column.date(), // Maps to Hugo 'lastmod' / 'modified'
		publishedAt: column.date({ optional: true }), // Maps to Hugo 'publishDate' / 'pubdate' / 'published'
		expiryDate: column.date({ optional: true }), // Hugo: page expiration date
		// Status flags
		draft: column.boolean({ default: false }), // Hugo: draft flag
		// URL management (Hugo-compatible)
		aliases: column.json({ optional: true }), // Hugo: redirect aliases (array of strings)
		url: column.text({ optional: true }), // Hugo: custom URL override
		// Template and type selection (Hugo-compatible)
		type: column.text({ optional: true }), // Hugo: content type for template selection
		layout: column.text({ optional: true }), // Hugo: specific template name override
		// SEO
		keywords: column.json({ optional: true }), // Hugo: keywords for SEO (array of strings)
		// Sorting and ordering (Hugo-compatible)
		weight: column.number({ optional: true }), // Hugo: weight for sorting (lower = higher priority)
	},
});

// Media/assets metadata table
export const Media = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		filename: column.text(),
		url: column.text(),
		storageProvider: column.text(), // 'netlify-blob' or 'tigris'
		mimeType: column.text({ optional: true }),
		size: column.number({ optional: true }), // Size in bytes
		// SEO fields for images
		altText: column.text({ optional: true }), // Alt text for accessibility and SEO
		title: column.text({ optional: true }), // Image title attribute
		caption: column.text({ optional: true }), // Image caption
		width: column.number({ optional: true }), // Image width in pixels
		height: column.number({ optional: true }), // Image height in pixels
		uploadedAt: column.date(),
	},
});

// FAQs table (for FAQ schema and voice search optimization)
export const FAQs = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		blogPostId: column.text({
			references: () => BlogPosts.columns.id,
			optional: true,
		}), // Optional: link to blog post
		pageId: column.text({ references: () => Pages.columns.id, optional: true }), // Optional: link to page
		question: column.text(), // FAQ question
		answer: column.text(), // FAQ answer
		order: column.number({ optional: true }), // Display order
		createdAt: column.date(),
		updatedAt: column.date(),
	},
});

// Rebuild flags table (for scheduled rebuilds)
export const RebuildFlags = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		pending: column.boolean({ default: false }),
		triggeredAt: column.date({ optional: true }),
		completedAt: column.date({ optional: true }),
	},
});

export default defineDb({
	tables: {
		Tags,
		Categories,
		Author,
		BlogPosts,
		BlogPostTags,
		BlogPostCategories,
		BlogPostReferences,
		Pages,
		Media,
		FAQs,
		RebuildFlags,
	},
});
