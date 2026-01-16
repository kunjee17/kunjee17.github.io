// Admin panel type definitions

export interface NavigationItem {
	label: string;
	href: string;
	icon?: string;
}

export interface FormState {
	isSubmitting: boolean;
	errors: Record<string, string>;
	isDirty: boolean;
}

export interface UIState {
	sidebarOpen: boolean;
	theme: "light" | "dark" | "auto";
	notifications: Notification[];
}

export interface Notification {
	id: string;
	type: "success" | "error" | "warning" | "info";
	message: string;
	duration?: number;
}

export interface RebuildOption {
	type: "immediate" | "scheduled";
	scheduledDate?: Date;
}

export interface MigrationFile {
	name: string;
	content: string;
	path: string;
}

export interface SocialMediaPost {
	id: string;
	platform: "linkedin" | "twitter";
	content: string;
	scheduledAt?: Date;
	publishedAt?: Date;
	status: "draft" | "scheduled" | "published";
}
