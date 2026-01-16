// Database Query Utilities
// Helper functions for querying AstroDB

import {
	Author,
	and,
	BlogPostCategories,
	BlogPostReferences,
	BlogPosts,
	BlogPostTags,
	Categories,
	db,
	desc,
	eq,
	FAQs,
	Tags,
} from "astro:db";

/**
 * Get all published posts (not drafts, published date <= now)
 */
export async function getPublishedPosts() {
	const _now = new Date();
	return await db
		.select()
		.from(BlogPosts)
		.where(and(eq(BlogPosts.draft, false)))
		.orderBy(desc(BlogPosts.publishedAt));
}

/**
 * Get a single post by slug with all related data
 */
export async function getPostBySlug(slug: string) {
	const posts = await db
		.select()
		.from(BlogPosts)
		.where(eq(BlogPosts.slug, slug))
		.limit(1);

	if (posts.length === 0) {
		return null;
	}

	const post = posts[0];

	// Get author
	let author = null;
	if (post.authorId) {
		const authors = await db
			.select()
			.from(Author)
			.where(eq(Author.id, post.authorId))
			.limit(1);
		author = authors[0] || null;
	}

	// Get tags
	const postTags = await db
		.select()
		.from(BlogPostTags)
		.innerJoin(Tags, eq(BlogPostTags.tagId, Tags.id))
		.where(eq(BlogPostTags.blogPostId, post.id));

	const tags = postTags.map((pt) => pt.Tags);

	// Get categories
	const postCategories = await db
		.select()
		.from(BlogPostCategories)
		.innerJoin(Categories, eq(BlogPostCategories.categoryId, Categories.id))
		.where(eq(BlogPostCategories.blogPostId, post.id));

	const categories = postCategories.map((pc) => pc.Categories);

	// Get FAQs
	const faqs = await db
		.select()
		.from(FAQs)
		.where(eq(FAQs.blogPostId, post.id))
		.orderBy(FAQs.order);

	// Get related posts
	const relatedPostsData = await db
		.select()
		.from(BlogPostReferences)
		.innerJoin(BlogPosts, eq(BlogPostReferences.toPostId, BlogPosts.id))
		.where(eq(BlogPostReferences.fromPostId, post.id))
		.orderBy(BlogPostReferences.weight);

	const relatedPosts = relatedPostsData.map((rp) => ({
		...rp.BlogPosts,
		linkType: rp.BlogPostReferences.linkType,
		anchorText: rp.BlogPostReferences.anchorText,
	}));

	return {
		post,
		author,
		tags,
		categories,
		faqs,
		relatedPosts,
	};
}

/**
 * Get featured posts for homepage
 */
export async function getFeaturedPosts() {
	return await db
		.select()
		.from(BlogPosts)
		.where(and(eq(BlogPosts.draft, false), eq(BlogPosts.featured, true)))
		.orderBy(desc(BlogPosts.publishedAt))
		.limit(5);
}

/**
 * Get posts by category slug
 */
export async function getPostsByCategory(categorySlug: string) {
	const categories = await db
		.select()
		.from(Categories)
		.where(eq(Categories.slug, categorySlug))
		.limit(1);

	if (categories.length === 0) {
		return { category: null, posts: [] };
	}

	const category = categories[0];

	const postData = await db
		.select()
		.from(BlogPostCategories)
		.innerJoin(BlogPosts, eq(BlogPostCategories.blogPostId, BlogPosts.id))
		.where(
			and(
				eq(BlogPostCategories.categoryId, category.id),
				eq(BlogPosts.draft, false),
			),
		)
		.orderBy(desc(BlogPosts.publishedAt));

	const posts = postData.map((pd) => pd.BlogPosts);

	return { category, posts };
}

/**
 * Get posts by tag slug
 */
export async function getPostsByTag(tagSlug: string) {
	const tags = await db
		.select()
		.from(Tags)
		.where(eq(Tags.slug, tagSlug))
		.limit(1);

	if (tags.length === 0) {
		return { tag: null, posts: [] };
	}

	const tag = tags[0];

	const postData = await db
		.select()
		.from(BlogPostTags)
		.innerJoin(BlogPosts, eq(BlogPostTags.blogPostId, BlogPosts.id))
		.where(and(eq(BlogPostTags.tagId, tag.id), eq(BlogPosts.draft, false)))
		.orderBy(desc(BlogPosts.publishedAt));

	const posts = postData.map((pd) => pd.BlogPosts);

	return { tag, posts };
}

/**
 * Get author profile
 */
export async function getAuthor() {
	const authors = await db.select().from(Author).limit(1);
	return authors[0] || null;
}

/**
 * Get all categories with post counts
 */
export async function getAllCategories() {
	const allCategories = await db
		.select()
		.from(Categories)
		.orderBy(Categories.name);

	const categoriesWithCounts = await Promise.all(
		allCategories.map(async (category) => {
			const postData = await db
				.select()
				.from(BlogPostCategories)
				.innerJoin(BlogPosts, eq(BlogPostCategories.blogPostId, BlogPosts.id))
				.where(
					and(
						eq(BlogPostCategories.categoryId, category.id),
						eq(BlogPosts.draft, false),
					),
				);

			return {
				...category,
				count: postData.length,
			};
		}),
	);

	return categoriesWithCounts;
}

/**
 * Get all tags with post counts
 */
export async function getAllTags() {
	const allTags = await db.select().from(Tags).orderBy(Tags.name);

	const tagsWithCounts = await Promise.all(
		allTags.map(async (tag) => {
			const postData = await db
				.select()
				.from(BlogPostTags)
				.innerJoin(BlogPosts, eq(BlogPostTags.blogPostId, BlogPosts.id))
				.where(and(eq(BlogPostTags.tagId, tag.id), eq(BlogPosts.draft, false)));

			return {
				...tag,
				count: postData.length,
			};
		}),
	);

	return tagsWithCounts;
}

/**
 * Get related posts for a given post ID
 */
export async function getRelatedPosts(postId: string) {
	const relatedPostsData = await db
		.select()
		.from(BlogPostReferences)
		.innerJoin(BlogPosts, eq(BlogPostReferences.toPostId, BlogPosts.id))
		.where(
			and(
				eq(BlogPostReferences.fromPostId, postId),
				eq(BlogPosts.draft, false),
			),
		)
		.orderBy(BlogPostReferences.weight);

	return relatedPostsData.map((rp) => ({
		...rp.BlogPosts,
		linkType: rp.BlogPostReferences.linkType,
		anchorText: rp.BlogPostReferences.anchorText,
	}));
}

/**
 * Get all posts for sitemap generation
 */
export async function getAllPostsForSitemap() {
	return await db
		.select({
			slug: BlogPosts.slug,
			updatedAt: BlogPosts.updatedAt,
			publishedAt: BlogPosts.publishedAt,
			sitemapPriority: BlogPosts.sitemapPriority,
			sitemapChangefreq: BlogPosts.sitemapChangefreq,
		})
		.from(BlogPosts)
		.where(eq(BlogPosts.draft, false))
		.orderBy(desc(BlogPosts.publishedAt));
}
