// Re-export blog queries from @repo/orm for backward compatibility
// This file maintains the same API as before but uses Drizzle ORM under the hood

import { blog } from "./orm";

// Backward compatibility aliases for old function names
export const getPublishedPosts = blog.getPublishedWritings;
export const getPostBySlug = blog.getWritingBySlug;
export const getFeaturedPosts = blog.getFeaturedWritings;
export const getPostsByCategory = blog.getWritingsByCategory;
export const getPostsByTag = blog.getWritingsByTag;
export const getRelatedPosts = blog.getRelatedWritings;
export const getAllPostsForSitemap = blog.getAllWritingsForSitemap;
export const getAuthor = blog.getAuthor;
export const getAllCategories = blog.getAllCategories;
export const getAllTags = blog.getAllTags;
