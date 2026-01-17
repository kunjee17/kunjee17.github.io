// Database helper functions for admin panel
import {
	Author,
	BlogPostCategories,
	BlogPostReferences,
	BlogPosts,
	BlogPostTags,
	Categories,
	db,
	FAQs,
	Media,
	Pages,
	Tags,
} from "astro:db";
import { v4 as uuidv4 } from "uuid";

// Helper to generate slug from title
export function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

// Helper to calculate word count
export function calculateWordCount(content: string): number {
	return content
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0).length;
}

// Helper to calculate reading time (average 200 words per minute)
export function calculateReadingTime(wordCount: number): number {
	return Math.ceil(wordCount / 200);
}

// Validation helpers
export function validateSlugFormat(slug: string): boolean {
	// Slug should only contain lowercase letters, numbers, and hyphens
	// Should not start or end with hyphen
	return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export async function checkTagNameExists(
	name: string,
	excludeId?: string,
): Promise<boolean> {
	const query = db.select().from(Tags).where(eq(Tags.name, name)).limit(1);
	const results = await query;
	if (excludeId) {
		return results.some((tag: { id: string }) => tag.id !== excludeId);
	}
	return results.length > 0;
}

export async function checkTagSlugExists(
	slug: string,
	excludeId?: string,
): Promise<boolean> {
	const query = db.select().from(Tags).where(eq(Tags.slug, slug)).limit(1);
	const results = await query;
	if (excludeId) {
		return results.some((tag: { id: string }) => tag.id !== excludeId);
	}
	return results.length > 0;
}

export async function checkCategoryNameExists(
	name: string,
	excludeId?: string,
): Promise<boolean> {
	const query = db
		.select()
		.from(Categories)
		.where(eq(Categories.name, name))
		.limit(1);
	const results = await query;
	if (excludeId) {
		return results.some((cat: { id: string }) => cat.id !== excludeId);
	}
	return results.length > 0;
}

export async function checkCategorySlugExists(
	slug: string,
	excludeId?: string,
): Promise<boolean> {
	const query = db
		.select()
		.from(Categories)
		.where(eq(Categories.slug, slug))
		.limit(1);
	const results = await query;
	if (excludeId) {
		return results.some((cat: { id: string }) => cat.id !== excludeId);
	}
	return results.length > 0;
}

export async function checkAuthorSlugExists(
	slug: string,
	excludeId?: string,
): Promise<boolean> {
	const query = db.select().from(Author).where(eq(Author.slug, slug)).limit(1);
	const results = await query;
	if (excludeId) {
		return results.some((author: { id: string }) => author.id !== excludeId);
	}
	return results.length > 0;
}

export async function checkPageSlugExists(
	slug: string,
	excludeId?: string,
): Promise<boolean> {
	const query = db.select().from(Pages).where(eq(Pages.slug, slug)).limit(1);
	const results = await query;
	if (excludeId) {
		return results.some((page: { id: string }) => page.id !== excludeId);
	}
	return results.length > 0;
}

export async function checkPostSlugExists(
	slug: string,
	excludeId?: string,
): Promise<boolean> {
	const query = db
		.select()
		.from(BlogPosts)
		.where(eq(BlogPosts.slug, slug))
		.limit(1);
	const results = await query;
	if (excludeId) {
		return results.some((post: { id: string }) => post.id !== excludeId);
	}
	return results.length > 0;
}

// Posts
export async function getAllPosts() {
	return await db.select().from(BlogPosts).orderBy(desc(BlogPosts.createdAt));
}

export async function getPost(id: string) {
	const posts = await db
		.select()
		.from(BlogPosts)
		.where(eq(BlogPosts.id, id))
		.limit(1);
	return posts[0] || null;
}

export async function getPostWithRelations(id: string) {
	const post = await getPost(id);
	if (!post) return null;

	const [tags, categories, author, faqs, references] = await Promise.all([
		getTagsForPost(id),
		getCategoriesForPost(id),
		post.authorId ? getAuthor(post.authorId) : null,
		getFAQsForPost(id),
		getReferencesForPost(id),
	]);

	return {
		...post,
		tags,
		categories,
		author,
		faqs,
		references,
	};
}

export async function createPost(data: {
	title: string;
	slug?: string;
	linkTitle?: string;
	description?: string;
	summary?: string;
	content: string;
	authorId?: string;
	createdAt?: Date;
	publishedAt?: Date;
	expiryDate?: Date;
	draft?: boolean;
	featured?: boolean;
	keywords?: string[];
	canonicalUrl?: string;
	metaRobots?: string;
	ogImage?: string;
	ogType?: string;
	twitterCard?: string;
	schemaType?: string;
	schemaJson?: Record<string, unknown>;
	sitemapPriority?: number;
	sitemapChangefreq?: string;
	aliases?: string[];
	url?: string;
	type?: string;
	layout?: string;
	weight?: number;
	tagIds?: string[];
	categoryIds?: string[];
}) {
	const id = uuidv4();
	const slug = data.slug || generateSlug(data.title);
	const wordCount = calculateWordCount(data.content);
	const readingTime = calculateReadingTime(wordCount);
	const now = new Date();

	const postData = {
		id,
		slug,
		title: data.title,
		linkTitle: data.linkTitle,
		description: data.description,
		summary: data.summary,
		content: data.content,
		frontMatter: {},
		createdAt: data.createdAt || now,
		updatedAt: now,
		publishedAt: data.publishedAt,
		expiryDate: data.expiryDate,
		draft: data.draft ?? false,
		featured: data.featured ?? false,
		keywords: data.keywords ? JSON.stringify(data.keywords) : null,
		canonicalUrl: data.canonicalUrl,
		metaRobots: data.metaRobots,
		ogImage: data.ogImage,
		ogType: data.ogType,
		twitterCard: data.twitterCard,
		schemaType: data.schemaType,
		schemaJson: data.schemaJson ? JSON.stringify(data.schemaJson) : null,
		sitemapPriority: data.sitemapPriority,
		sitemapChangefreq: data.sitemapChangefreq,
		wordCount,
		readingTime,
		authorId: data.authorId,
		aliases: data.aliases ? JSON.stringify(data.aliases) : null,
		url: data.url,
		type: data.type,
		layout: data.layout,
		weight: data.weight,
	};

	await db.insert(BlogPosts).values(postData);

	// Handle tags
	if (data.tagIds && data.tagIds.length > 0) {
		await Promise.all(
			data.tagIds.map((tagId) =>
				db.insert(BlogPostTags).values({
					blogPostId: id,
					tagId,
				}),
			),
		);
	}

	// Handle categories
	if (data.categoryIds && data.categoryIds.length > 0) {
		await Promise.all(
			data.categoryIds.map((categoryId) =>
				db.insert(BlogPostCategories).values({
					blogPostId: id,
					categoryId,
				}),
			),
		);
	}

	return id;
}

export async function updatePost(
	id: string,
	data: {
		title?: string;
		slug?: string;
		linkTitle?: string;
		description?: string;
		summary?: string;
		content?: string;
		authorId?: string;
		publishedAt?: Date;
		expiryDate?: Date;
		draft?: boolean;
		featured?: boolean;
		keywords?: string[];
		canonicalUrl?: string;
		metaRobots?: string;
		ogImage?: string;
		ogType?: string;
		twitterCard?: string;
		schemaType?: string;
		schemaJson?: Record<string, unknown>;
		sitemapPriority?: number;
		sitemapChangefreq?: string;
		aliases?: string[];
		url?: string;
		type?: string;
		layout?: string;
		weight?: number;
		tagIds?: string[];
		categoryIds?: string[];
	},
) {
	const updateData: Record<string, unknown> = {
		updatedAt: new Date(),
	};

	if (data.title !== undefined) updateData.title = data.title;
	if (data.slug !== undefined) updateData.slug = data.slug;
	if (data.linkTitle !== undefined) updateData.linkTitle = data.linkTitle;
	if (data.description !== undefined) updateData.description = data.description;
	if (data.summary !== undefined) updateData.summary = data.summary;
	if (data.content !== undefined) {
		updateData.content = data.content;
		updateData.wordCount = calculateWordCount(data.content);
		updateData.readingTime = calculateReadingTime(
			updateData.wordCount as number,
		);
	}
	if (data.authorId !== undefined) updateData.authorId = data.authorId;
	if (data.publishedAt !== undefined) updateData.publishedAt = data.publishedAt;
	if (data.expiryDate !== undefined) updateData.expiryDate = data.expiryDate;
	if (data.draft !== undefined) updateData.draft = data.draft;
	if (data.featured !== undefined) updateData.featured = data.featured;
	if (data.keywords !== undefined)
		updateData.keywords = data.keywords ? JSON.stringify(data.keywords) : null;
	if (data.canonicalUrl !== undefined)
		updateData.canonicalUrl = data.canonicalUrl;
	if (data.metaRobots !== undefined) updateData.metaRobots = data.metaRobots;
	if (data.ogImage !== undefined) updateData.ogImage = data.ogImage;
	if (data.ogType !== undefined) updateData.ogType = data.ogType;
	if (data.twitterCard !== undefined) updateData.twitterCard = data.twitterCard;
	if (data.schemaType !== undefined) updateData.schemaType = data.schemaType;
	if (data.schemaJson !== undefined)
		updateData.schemaJson = data.schemaJson
			? JSON.stringify(data.schemaJson)
			: null;
	if (data.sitemapPriority !== undefined)
		updateData.sitemapPriority = data.sitemapPriority;
	if (data.sitemapChangefreq !== undefined)
		updateData.sitemapChangefreq = data.sitemapChangefreq;
	if (data.aliases !== undefined)
		updateData.aliases = data.aliases ? JSON.stringify(data.aliases) : null;
	if (data.url !== undefined) updateData.url = data.url;
	if (data.type !== undefined) updateData.type = data.type;
	if (data.layout !== undefined) updateData.layout = data.layout;
	if (data.weight !== undefined) updateData.weight = data.weight;

	await db.update(BlogPosts).set(updateData).where(eq(BlogPosts.id, id));

	// Handle tags
	if (data.tagIds !== undefined) {
		// Delete existing tags
		await db.delete(BlogPostTags).where(eq(BlogPostTags.blogPostId, id));
		// Insert new tags
		if (data.tagIds.length > 0) {
			await Promise.all(
				data.tagIds.map((tagId) =>
					db.insert(BlogPostTags).values({
						blogPostId: id,
						tagId,
					}),
				),
			);
		}
	}

	// Handle categories
	if (data.categoryIds !== undefined) {
		// Delete existing categories
		await db
			.delete(BlogPostCategories)
			.where(eq(BlogPostCategories.blogPostId, id));
		// Insert new categories
		if (data.categoryIds.length > 0) {
			await Promise.all(
				data.categoryIds.map((categoryId) =>
					db.insert(BlogPostCategories).values({
						blogPostId: id,
						categoryId,
					}),
				),
			);
		}
	}
}

export async function deletePost(id: string) {
	// Delete relationships first
	await db.delete(BlogPostTags).where(eq(BlogPostTags.blogPostId, id));
	await db
		.delete(BlogPostCategories)
		.where(eq(BlogPostCategories.blogPostId, id));
	await db
		.delete(BlogPostReferences)
		.where(eq(BlogPostReferences.fromPostId, id));
	await db
		.delete(BlogPostReferences)
		.where(eq(BlogPostReferences.toPostId, id));
	await db.delete(FAQs).where(eq(FAQs.blogPostId, id));
	// Delete post
	await db.delete(BlogPosts).where(eq(BlogPosts.id, id));
}

// Tags
export async function getAllTags() {
	return await db.select().from(Tags).orderBy(Tags.name);
}

export async function getTag(id: string) {
	const tags = await db.select().from(Tags).where(eq(Tags.id, id)).limit(1);
	return tags[0] || null;
}

export async function getTagsForPost(postId: string) {
	const results = await db
		.select({
			id: Tags.id,
			slug: Tags.slug,
			name: Tags.name,
			description: Tags.description,
			createdAt: Tags.createdAt,
		})
		.from(BlogPostTags)
		.innerJoin(Tags, eq(BlogPostTags.tagId, Tags.id))
		.where(eq(BlogPostTags.blogPostId, postId));
	return results;
}

export async function createTag(data: {
	name: string;
	slug?: string;
	description?: string;
}) {
	const id = uuidv4();
	const slug = data.slug || generateSlug(data.name);
	await db.insert(Tags).values({
		id,
		slug,
		name: data.name,
		description: data.description,
		createdAt: new Date(),
	});
	return id;
}

export async function updateTag(
	id: string,
	data: { name?: string; slug?: string; description?: string },
) {
	const updateData: Record<string, unknown> = {};
	if (data.name !== undefined) updateData.name = data.name;
	if (data.slug !== undefined) updateData.slug = data.slug;
	if (data.description !== undefined) updateData.description = data.description;
	await db.update(Tags).set(updateData).where(eq(Tags.id, id));
}

export async function deleteTag(id: string) {
	await db.delete(BlogPostTags).where(eq(BlogPostTags.tagId, id));
	await db.delete(Tags).where(eq(Tags.id, id));
}

export async function getTagPostCount(tagId: string) {
	const result = await db
		.select({ count: sql<number>`count(*)` })
		.from(BlogPostTags)
		.where(eq(BlogPostTags.tagId, tagId));
	return result[0]?.count || 0;
}

export async function getTagsWithPostCounts() {
	const results = await db
		.select({
			id: Tags.id,
			slug: Tags.slug,
			name: Tags.name,
			description: Tags.description,
			createdAt: Tags.createdAt,
			postCount: sql<number>`count(${BlogPostTags.tagId})`,
		})
		.from(Tags)
		.leftJoin(BlogPostTags, eq(Tags.id, BlogPostTags.tagId))
		.groupBy(Tags.id)
		.orderBy(Tags.name);

	return results.map(
		(tag: {
			id: string;
			slug: string;
			name: string;
			description: string | null;
			createdAt: Date;
			postCount: number | null;
		}) => ({
			...tag,
			postCount: Number(tag.postCount) || 0,
		}),
	);
}

export async function getPostsByTag(tagId: string) {
	return await db
		.select({
			id: BlogPosts.id,
			slug: BlogPosts.slug,
			title: BlogPosts.title,
			createdAt: BlogPosts.createdAt,
		})
		.from(BlogPostTags)
		.innerJoin(BlogPosts, eq(BlogPostTags.blogPostId, BlogPosts.id))
		.where(eq(BlogPostTags.tagId, tagId))
		.orderBy(desc(BlogPosts.createdAt));
}

// Categories
export async function getAllCategories() {
	return await db.select().from(Categories).orderBy(Categories.name);
}

export async function getCategory(id: string) {
	const categories = await db
		.select()
		.from(Categories)
		.where(eq(Categories.id, id))
		.limit(1);
	return categories[0] || null;
}

export async function getCategoriesForPost(postId: string) {
	const results = await db
		.select({
			id: Categories.id,
			slug: Categories.slug,
			name: Categories.name,
			description: Categories.description,
			createdAt: Categories.createdAt,
		})
		.from(BlogPostCategories)
		.innerJoin(Categories, eq(BlogPostCategories.categoryId, Categories.id))
		.where(eq(BlogPostCategories.blogPostId, postId));
	return results;
}

export async function createCategory(data: {
	name: string;
	slug?: string;
	description?: string;
}) {
	const id = uuidv4();
	const slug = data.slug || generateSlug(data.name);
	await db.insert(Categories).values({
		id,
		slug,
		name: data.name,
		description: data.description,
		createdAt: new Date(),
	});
	return id;
}

export async function updateCategory(
	id: string,
	data: { name?: string; slug?: string; description?: string },
) {
	const updateData: Record<string, unknown> = {};
	if (data.name !== undefined) updateData.name = data.name;
	if (data.slug !== undefined) updateData.slug = data.slug;
	if (data.description !== undefined) updateData.description = data.description;
	await db.update(Categories).set(updateData).where(eq(Categories.id, id));
}

export async function deleteCategory(id: string) {
	await db
		.delete(BlogPostCategories)
		.where(eq(BlogPostCategories.categoryId, id));
	await db.delete(Categories).where(eq(Categories.id, id));
}

export async function getCategoryPostCount(categoryId: string) {
	const result = await db
		.select({ count: sql<number>`count(*)` })
		.from(BlogPostCategories)
		.where(eq(BlogPostCategories.categoryId, categoryId));
	return result[0]?.count || 0;
}

export async function getCategoriesWithPostCounts() {
	const results = await db
		.select({
			id: Categories.id,
			slug: Categories.slug,
			name: Categories.name,
			description: Categories.description,
			createdAt: Categories.createdAt,
			postCount: sql<number>`count(${BlogPostCategories.categoryId})`,
		})
		.from(Categories)
		.leftJoin(
			BlogPostCategories,
			eq(Categories.id, BlogPostCategories.categoryId),
		)
		.groupBy(Categories.id)
		.orderBy(Categories.name);

	return results.map(
		(category: {
			id: string;
			slug: string;
			name: string;
			description: string | null;
			createdAt: Date;
			postCount: number | null;
		}) => ({
			...category,
			postCount: Number(category.postCount) || 0,
		}),
	);
}

export async function getPostsByCategory(categoryId: string) {
	return await db
		.select({
			id: BlogPosts.id,
			slug: BlogPosts.slug,
			title: BlogPosts.title,
			createdAt: BlogPosts.createdAt,
		})
		.from(BlogPostCategories)
		.innerJoin(BlogPosts, eq(BlogPostCategories.blogPostId, BlogPosts.id))
		.where(eq(BlogPostCategories.categoryId, categoryId))
		.orderBy(desc(BlogPosts.createdAt));
}

export async function getPostsByAuthor(authorId: string) {
	return await db
		.select({
			id: BlogPosts.id,
			slug: BlogPosts.slug,
			title: BlogPosts.title,
			createdAt: BlogPosts.createdAt,
		})
		.from(BlogPosts)
		.where(eq(BlogPosts.authorId, authorId))
		.orderBy(desc(BlogPosts.createdAt));
}

// Author
export async function getAuthor(id: string) {
	const authors = await db
		.select()
		.from(Author)
		.where(eq(Author.id, id))
		.limit(1);
	return authors[0] || null;
}

export async function getFirstAuthor() {
	const authors = await db.select().from(Author).limit(1);
	return authors[0] || null;
}

export async function createAuthor(data: {
	slug: string;
	name: string;
	bio?: string;
	credentials?: string;
	profilePicture?: string;
	email?: string;
	website?: string;
	socialLinks?: Record<string, string>;
}) {
	const id = uuidv4();
	const now = new Date();
	await db.insert(Author).values({
		id,
		slug: data.slug,
		name: data.name,
		bio: data.bio,
		credentials: data.credentials,
		profilePicture: data.profilePicture,
		email: data.email,
		website: data.website,
		socialLinks: data.socialLinks ? JSON.stringify(data.socialLinks) : null,
		createdAt: now,
		updatedAt: now,
	});
	return id;
}

export async function updateAuthor(
	id: string,
	data: {
		slug?: string;
		name?: string;
		bio?: string;
		credentials?: string;
		profilePicture?: string;
		email?: string;
		website?: string;
		socialLinks?: Record<string, string>;
	},
) {
	const updateData: Record<string, unknown> = {
		updatedAt: new Date(),
	};
	if (data.slug !== undefined) updateData.slug = data.slug;
	if (data.name !== undefined) updateData.name = data.name;
	if (data.bio !== undefined) updateData.bio = data.bio;
	if (data.credentials !== undefined) updateData.credentials = data.credentials;
	if (data.profilePicture !== undefined)
		updateData.profilePicture = data.profilePicture;
	if (data.email !== undefined) updateData.email = data.email;
	if (data.website !== undefined) updateData.website = data.website;
	if (data.socialLinks !== undefined)
		updateData.socialLinks = data.socialLinks
			? JSON.stringify(data.socialLinks)
			: null;
	await db.update(Author).set(updateData).where(eq(Author.id, id));
}

// Pages
export async function getAllPages() {
	return await db.select().from(Pages).orderBy(desc(Pages.createdAt));
}

export async function getPage(id: string) {
	const pages = await db.select().from(Pages).where(eq(Pages.id, id)).limit(1);
	return pages[0] || null;
}

export async function createPage(data: {
	title: string;
	slug?: string;
	linkTitle?: string;
	description?: string;
	summary?: string;
	content: string;
	createdAt?: Date;
	publishedAt?: Date;
	expiryDate?: Date;
	draft?: boolean;
	keywords?: string[];
	aliases?: string[];
	url?: string;
	type?: string;
	layout?: string;
	weight?: number;
}) {
	const id = uuidv4();
	const slug = data.slug || generateSlug(data.title);
	const now = new Date();
	await db.insert(Pages).values({
		id,
		slug,
		title: data.title,
		linkTitle: data.linkTitle,
		description: data.description,
		summary: data.summary,
		content: data.content,
		frontMatter: {},
		createdAt: data.createdAt || now,
		updatedAt: now,
		publishedAt: data.publishedAt,
		expiryDate: data.expiryDate,
		draft: data.draft ?? false,
		keywords: data.keywords ? JSON.stringify(data.keywords) : null,
		aliases: data.aliases ? JSON.stringify(data.aliases) : null,
		url: data.url,
		type: data.type,
		layout: data.layout,
		weight: data.weight,
	});
	return id;
}

export async function updatePage(
	id: string,
	data: {
		title?: string;
		slug?: string;
		linkTitle?: string;
		description?: string;
		summary?: string;
		content?: string;
		publishedAt?: Date;
		expiryDate?: Date;
		draft?: boolean;
		keywords?: string[];
		aliases?: string[];
		url?: string;
		type?: string;
		layout?: string;
		weight?: number;
	},
) {
	const updateData: Record<string, unknown> = {
		updatedAt: new Date(),
	};
	if (data.title !== undefined) updateData.title = data.title;
	if (data.slug !== undefined) updateData.slug = data.slug;
	if (data.linkTitle !== undefined) updateData.linkTitle = data.linkTitle;
	if (data.description !== undefined) updateData.description = data.description;
	if (data.summary !== undefined) updateData.summary = data.summary;
	if (data.content !== undefined) updateData.content = data.content;
	if (data.publishedAt !== undefined) updateData.publishedAt = data.publishedAt;
	if (data.expiryDate !== undefined) updateData.expiryDate = data.expiryDate;
	if (data.draft !== undefined) updateData.draft = data.draft;
	if (data.keywords !== undefined)
		updateData.keywords = data.keywords ? JSON.stringify(data.keywords) : null;
	if (data.aliases !== undefined)
		updateData.aliases = data.aliases ? JSON.stringify(data.aliases) : null;
	if (data.url !== undefined) updateData.url = data.url;
	if (data.type !== undefined) updateData.type = data.type;
	if (data.layout !== undefined) updateData.layout = data.layout;
	if (data.weight !== undefined) updateData.weight = data.weight;
	await db.update(Pages).set(updateData).where(eq(Pages.id, id));
}

export async function deletePage(id: string) {
	await db.delete(FAQs).where(eq(FAQs.pageId, id));
	await db.delete(Pages).where(eq(Pages.id, id));
}

// Media
export async function getAllMedia() {
	return await db.select().from(Media).orderBy(desc(Media.uploadedAt));
}

export async function getMedia(id: string) {
	const media = await db.select().from(Media).where(eq(Media.id, id)).limit(1);
	return media[0] || null;
}

export async function createMedia(data: {
	filename: string;
	url: string;
	storageProvider: string;
	mimeType?: string;
	size?: number;
	altText?: string;
	title?: string;
	caption?: string;
	width?: number;
	height?: number;
}) {
	const id = uuidv4();
	await db.insert(Media).values({
		id,
		filename: data.filename,
		url: data.url,
		storageProvider: data.storageProvider,
		mimeType: data.mimeType,
		size: data.size,
		altText: data.altText,
		title: data.title,
		caption: data.caption,
		width: data.width,
		height: data.height,
		uploadedAt: new Date(),
	});
	return id;
}

export async function updateMedia(
	id: string,
	data: {
		filename?: string;
		url?: string;
		mimeType?: string;
		size?: number;
		altText?: string;
		title?: string;
		caption?: string;
		width?: number;
		height?: number;
	},
) {
	const updateData: Record<string, unknown> = {};
	if (data.filename !== undefined) updateData.filename = data.filename;
	if (data.url !== undefined) updateData.url = data.url;
	if (data.mimeType !== undefined) updateData.mimeType = data.mimeType;
	if (data.size !== undefined) updateData.size = data.size;
	if (data.altText !== undefined) updateData.altText = data.altText;
	if (data.title !== undefined) updateData.title = data.title;
	if (data.caption !== undefined) updateData.caption = data.caption;
	if (data.width !== undefined) updateData.width = data.width;
	if (data.height !== undefined) updateData.height = data.height;
	await db.update(Media).set(updateData).where(eq(Media.id, id));
}

export async function deleteMedia(id: string) {
	await db.delete(Media).where(eq(Media.id, id));
}

// FAQs
export async function getAllFAQs() {
	return await db.select().from(FAQs).orderBy(FAQs.order, FAQs.createdAt);
}

export async function getFAQ(id: string) {
	const faqs = await db.select().from(FAQs).where(eq(FAQs.id, id)).limit(1);
	return faqs[0] || null;
}

export async function getFAQsForPost(postId: string) {
	return await db
		.select()
		.from(FAQs)
		.where(eq(FAQs.blogPostId, postId))
		.orderBy(FAQs.order, FAQs.createdAt);
}

export async function getFAQsForPage(pageId: string) {
	return await db
		.select()
		.from(FAQs)
		.where(eq(FAQs.pageId, pageId))
		.orderBy(FAQs.order, FAQs.createdAt);
}

export async function createFAQ(data: {
	blogPostId?: string;
	pageId?: string;
	question: string;
	answer: string;
	order?: number;
}) {
	const id = uuidv4();
	await db.insert(FAQs).values({
		id,
		blogPostId: data.blogPostId || null,
		pageId: data.pageId || null,
		question: data.question,
		answer: data.answer,
		order: data.order,
		createdAt: new Date(),
		updatedAt: new Date(),
	});
	return id;
}

export async function updateFAQ(
	id: string,
	data: {
		blogPostId?: string;
		pageId?: string;
		question?: string;
		answer?: string;
		order?: number;
	},
) {
	const updateData: Record<string, unknown> = {
		updatedAt: new Date(),
	};
	if (data.blogPostId !== undefined) updateData.blogPostId = data.blogPostId;
	if (data.pageId !== undefined) updateData.pageId = data.pageId;
	if (data.question !== undefined) updateData.question = data.question;
	if (data.answer !== undefined) updateData.answer = data.answer;
	if (data.order !== undefined) updateData.order = data.order;
	await db.update(FAQs).set(updateData).where(eq(FAQs.id, id));
}

export async function deleteFAQ(id: string) {
	await db.delete(FAQs).where(eq(FAQs.id, id));
}

// References
export async function getReferencesForPost(postId: string) {
	return await db
		.select({
			id: BlogPostReferences.id,
			fromPostId: BlogPostReferences.fromPostId,
			toPostId: BlogPostReferences.toPostId,
			anchorText: BlogPostReferences.anchorText,
			linkType: BlogPostReferences.linkType,
			weight: BlogPostReferences.weight,
			createdAt: BlogPostReferences.createdAt,
		})
		.from(BlogPostReferences)
		.where(eq(BlogPostReferences.fromPostId, postId))
		.orderBy(BlogPostReferences.weight, BlogPostReferences.createdAt);
}

export async function createReference(data: {
	fromPostId: string;
	toPostId: string;
	anchorText?: string;
	linkType?: string;
	weight?: number;
}) {
	const id = uuidv4();
	await db.insert(BlogPostReferences).values({
		id,
		fromPostId: data.fromPostId,
		toPostId: data.toPostId,
		anchorText: data.anchorText,
		linkType: data.linkType,
		weight: data.weight,
		createdAt: new Date(),
	});
	return id;
}

export async function deleteReference(id: string) {
	await db.delete(BlogPostReferences).where(eq(BlogPostReferences.id, id));
}

// Dashboard stats
export async function getDashboardStats() {
	const [posts, pages, tags, categories, media, faqs, drafts] =
		await Promise.all([
			db.select({ count: sql<number>`count(*)` }).from(BlogPosts),
			db.select({ count: sql<number>`count(*)` }).from(Pages),
			db.select({ count: sql<number>`count(*)` }).from(Tags),
			db.select({ count: sql<number>`count(*)` }).from(Categories),
			db.select({ count: sql<number>`count(*)` }).from(Media),
			db.select({ count: sql<number>`count(*)` }).from(FAQs),
			db
				.select({ count: sql<number>`count(*)` })
				.from(BlogPosts)
				.where(eq(BlogPosts.draft, true)),
		]);

	return {
		posts: posts[0]?.count || 0,
		pages: pages[0]?.count || 0,
		tags: tags[0]?.count || 0,
		categories: categories[0]?.count || 0,
		media: media[0]?.count || 0,
		faqs: faqs[0]?.count || 0,
		drafts: drafts[0]?.count || 0,
	};
}
