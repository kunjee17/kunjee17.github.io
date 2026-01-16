import db from "@astrojs/db";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

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
