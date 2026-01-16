/**
 * Authentication utilities for admin panel
 * Simple password-based authentication using environment variable
 */

type CookieStore = {
	get: (name: string) => { value: string } | undefined;
	set: (
		name: string,
		value: string,
		options?: {
			httpOnly?: boolean;
			secure?: boolean;
			sameSite?: "lax" | "strict" | "none";
			maxAge?: number;
			path?: string;
		},
	) => void;
	delete: (name: string, options?: { path?: string }) => void;
};

/**
 * Check if user is authenticated by verifying session cookie
 */
export function isAuthenticated(cookies: CookieStore): boolean {
	const sessionCookie = cookies.get("admin-session");
	return sessionCookie?.value === "authenticated";
}

/**
 * Set authenticated session cookie
 */
export function setAuthCookie(cookies: CookieStore): void {
	cookies.set("admin-session", "authenticated", {
		httpOnly: true,
		secure: import.meta.env.PROD,
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 7, // 7 days
		path: "/",
	});
}

/**
 * Clear authentication session cookie
 */
export function clearAuthCookie(cookies: CookieStore): void {
	cookies.delete("admin-session", {
		path: "/",
	});
}

/**
 * Validate password against SUPER_ADMIN_PASSWORD environment variable
 */
export function validatePassword(password: string): boolean {
	const adminPassword = import.meta.env.SUPER_ADMIN_PASSWORD;
	console.log("adminPassword", adminPassword);
	console.log("password", password);
	if (!adminPassword) {
		console.error("SUPER_ADMIN_PASSWORD environment variable is not set");
		return false;
	}
	return password === adminPassword;
}
