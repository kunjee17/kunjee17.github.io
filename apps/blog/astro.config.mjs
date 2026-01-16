import db from "@astrojs/db";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
	site: "https://kunjan.in",
	output: "static",
	integrations: [
		db({
			mode: "web",
		}),
		pagefind(),
		sitemap(),
	],
	vite: {
		plugins: [tailwindcss()],
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
