// Base setup file for Alpine.js and Lucide icons
// Centralized imports and initialization

import persist from "@alpinejs/persist";
import Alpine from "alpinejs";

// Initialize Alpine.js with persist plugin
Alpine.plugin(persist);

declare global {
	interface Window {
		Alpine: typeof Alpine;
	}
}

// Make Alpine available globally
window.Alpine = Alpine;

// Start Alpine.js
Alpine.start();

// Export commonly used Lucide icons
export {
	AlertCircle,
	BookOpen,
	Calendar,
	Check,
	ChevronLeft,
	ChevronRight,
	Edit,
	Eye,
	EyeOff,
	FileText,
	Filter,
	Home,
	Image,
	Info,
	Link,
	Loader2,
	LogOut,
	Menu,
	MoreVertical,
	Plus,
	Save,
	Search,
	Settings,
	Share2,
	Tag,
	Trash,
	Upload,
	X,
} from "lucide";

// Export Alpine instance for global access
export { Alpine };
