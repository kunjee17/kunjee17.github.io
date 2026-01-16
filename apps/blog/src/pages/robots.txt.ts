// Robots.txt Generation
// Allow all bots, reference sitemap

import type { APIRoute } from "astro";

const siteUrl = "https://kunjan.in";

export const GET: APIRoute = () => {
	const robotsTxt = `# https://kunjan.in/robots.txt
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${siteUrl}/sitemap.xml
Sitemap: ${siteUrl}/sitemap-0.xml

# Crawl delay (optional, adjust as needed)
# Crawl-delay: 10

# Disallow admin/private paths (if any)
# Disallow: /admin/
# Disallow: /api/

# Allow search engines to index everything
# No restrictions for this site
`;

	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain",
			"Cache-Control": "public, max-age=86400",
		},
	});
};
