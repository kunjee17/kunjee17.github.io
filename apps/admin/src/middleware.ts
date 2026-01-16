import { defineMiddleware } from "astro:middleware";
import { isAuthenticated } from "./lib/auth";

export const onRequest = defineMiddleware(async (context, next) => {
	console.log("Middleware running for:", context.url.pathname);
	const { url, cookies } = context;
	const currentPath = url.pathname;

	// Skip auth check for login page
	if (currentPath === "/login") {
		return next();
	}

	// Check authentication and redirect if not authenticated
	if (!isAuthenticated(cookies)) {
		const loginUrl = new URL("/login", url);
		return Response.redirect(loginUrl, 302);
	}

	// Continue to the next middleware or route handler
	return next();
});
