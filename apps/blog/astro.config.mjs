import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
	output: "static",
	integrations: [
		db({
			mode: "web",
		}),
	],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@components": "/src/components",
				"@layouts": "/src/layouts",
			},
		},
	},
});
