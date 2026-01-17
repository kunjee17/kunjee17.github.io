// Re-export queries from @repo/orm for backward compatibility
// This file can be removed once all imports a

// Backward compatibility aliases for old function names
import { admin } from "./orm";

// Alias old function names to new ones
export const getAllWritings = admin.getAllWritings;
export const getWriting = admin.getWriting;
export const getWritingWithRelations = admin.getWritingWithRelations;
export const createWriting = admin.createWriting;
export const updateWriting = admin.updateWriting;
export const deleteWriting = admin.deleteWriting;
export const getTagsWithWritingCounts = admin.getTagsWithWritingCounts;
export const getCategoriesWithWritingCounts =
	admin.getCategoriesWithWritingCounts;
export const checkCategoryNameExists = admin.checkCategoryNameExists;
export const checkCategorySlugExists = admin.checkCategorySlugExists;
export const createCategory = admin.createCategory;
export const deleteCategory = admin.deleteCategory;
export const getCategory = admin.getCategory;
export const updateCategory = admin.updateCategory;
export const deletePage = admin.deletePage;
export const getPage = admin.getPage;
export const createPage = admin.createPage;
export const updatePage = admin.updatePage;
export const getAllPages = admin.getAllPages;
export const checkPageSlugExists = admin.checkPageSlugExists;
export const getTag = admin.getTag;
export const updateTag = admin.updateTag;
export const checkTagNameExists = admin.checkTagNameExists;
export const checkTagSlugExists = admin.checkTagSlugExists;
export const deleteTag = admin.deleteTag;
export const createTag = admin.createTag;
export const checkWritingSlugExists = admin.checkWritingSlugExists;
export const getAllTags = admin.getAllTags;
export const getAllCategories = admin.getAllCategories;
export const getFirstAuthor = admin.getFirstAuthor;
export const getTagsForWriting = admin.getTagsForWriting;
export const getCategoriesForWriting = admin.getCategoriesForWriting;
export const getWritingsByCategory = admin.getWritingsByCategory;
export const getWritingsByTag = admin.getWritingsByTag;
export const getWritingsByAuthor = admin.getWritingsByAuthor;
export const updateAuthor = admin.updateAuthor;
export const createAuthor = admin.createAuthor;
export const checkAuthorSlugExists = admin.checkAuthorSlugExists;
export const createFAQ = admin.createFAQ;
export const getAllFAQs = admin.getAllFAQs;
export const getFAQ = admin.getFAQ;
export const updateFAQ = admin.updateFAQ;
export const deleteFAQ = admin.deleteFAQ;
export const createMedia = admin.createMedia;
export const getAllMedia = admin.getAllMedia;
export const getMedia = admin.getMedia;
export const updateMedia = admin.updateMedia;
export const deleteMedia = admin.deleteMedia;
export const getDashboardStats = admin.getDashboardStats;
export { formatDateTimeLocal, generateSlug, validateSlugFormat } from "./orm";
