import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
	site: "https://kunjan.in",
	output: "static",
	integrations: [pagefind(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
		ssr: {
			// Let workspace packages be external - pnpm will resolve them correctly
			// This reduces file handle usage during build
		},
		resolve: {
			alias: {
				"@components": "/src/components",
				"@layouts": "/src/layouts",
				"@lib": "/src/lib",
				"@styles": "/src/styles",
			},
		},
	},
});
