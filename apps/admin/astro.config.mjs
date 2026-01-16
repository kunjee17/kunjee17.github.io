import db from "@astrojs/db";
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

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
