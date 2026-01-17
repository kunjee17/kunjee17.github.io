import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	output: "server",
	adapter: netlify(),
	integrations: [],
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
			},
		},
	},
});
