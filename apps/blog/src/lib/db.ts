// Re-export blog queries from @repo/orm for backward compatibility
// This file maintains the same API as before but uses Drizzle ORM under the hood

import { blog } from "./orm";

// Backward compatibility aliases for old function names
export const getPublishedWritings = blog.getPublishedWritings;
export const getWritingBySlug = blog.getWritingBySlug;
export const getFeaturedWritings = blog.getFeaturedWritings;
export const getWritingsByCategory = blog.getWritingsByCategory;
export const getWritingsByTag = blog.getWritingsByTag;
export const getRelatedWritings = blog.getRelatedWritings;
export const getAllWritingsForSitemap = blog.getAllWritingsForSitemap;
export const getAuthor = blog.getAuthor;
export const getAllCategories = blog.getAllCategories;
export const getAllTags = blog.getAllTags;
