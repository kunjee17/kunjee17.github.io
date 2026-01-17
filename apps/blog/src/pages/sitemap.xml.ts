// Sitemap Generation
// Dynamic sitemap with all posts, pages, and static routes

import {
	getAllCategories,
	getAllTags,
	getAllWritingsForSitemap,
} from "@lib/db";
import type { APIRoute } from "astro";

const siteUrl = "https://kunjan.in";

// Static pages
const staticPages = [
	{ url: "/", priority: 1.0, changefreq: "weekly" },
	{ url: "/services", priority: 0.9, changefreq: "monthly" },
	{ url: "/about", priority: 0.8, changefreq: "monthly" },
	{ url: "/contact", priority: 0.8, changefreq: "monthly" },
	{ url: "/writings", priority: 0.9, changefreq: "daily" },
	{ url: "/categories", priority: 0.7, changefreq: "weekly" },
	{ url: "/tags", priority: 0.7, changefreq: "weekly" },
];

export const GET: APIRoute = async () => {
	try {
		// Get all posts
		const writings = await getAllWritingsForSitemap();

		// Get all categories and tags
		const categories = await getAllCategories();
		const tags = await getAllTags();

		// Build sitemap XML
		const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
	.map(
		(page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
	)
	.join("\n")}
${writings
	.map(
		(writing) => `  <url>
    <loc>${siteUrl}/writings/${writing.slug}</loc>
    <lastmod>${(writing.updatedAt || writing.publishedAt)?.toISOString()}</lastmod>
    <changefreq>${writing.sitemapChangefreq || "monthly"}</changefreq>
    <priority>${writing.sitemapPriority || 0.6}</priority>
  </url>`,
	)
	.join("\n")}
${categories
	.map(
		(cat) => `  <url>
    <loc>${siteUrl}/categories/${cat.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`,
	)
	.join("\n")}
${tags
	.map(
		(tag) => `  <url>
    <loc>${siteUrl}/tags/${tag.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`,
	)
	.join("\n")}
</urlset>`;

		return new Response(sitemap, {
			headers: {
				"Content-Type": "application/xml",
				"Cache-Control": "public, max-age=3600",
			},
		});
	} catch (error) {
		console.error("Error generating sitemap:", error);

		// Return a minimal sitemap on error
		const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

		return new Response(fallbackSitemap, {
			headers: {
				"Content-Type": "application/xml",
			},
		});
	}
};
