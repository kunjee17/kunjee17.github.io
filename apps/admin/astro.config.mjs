import { defineConfig } from "astro/config";
import db from "@astrojs/db";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
	output: "server",
	adapter: netlify(),
	integrations: [
		db({
			mode: "web",
		}),
	],
	vite: {
		plugins: [tailwindcss()],
		ssr: {
			noExternal: ["@repo/services", "@repo/dtos"], // Monorepo packages
		},
		resolve: {
			alias: {
				"@components": "/src/components",
				"@layouts": "/src/layouts",
				"@lib": "/src/lib",
			},
		},
	},
});
