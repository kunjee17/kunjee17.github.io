// Base setup file for Alpine.js and Lucide icons
// Centralized imports and initialization

import Alpine from "alpinejs";
import persist from "@alpinejs/persist";

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
	Home,
	FileText,
	BookOpen,
	Upload,
	Share2,
	Settings,
	Plus,
	Edit,
	Trash,
	Menu,
	X,
	Save,
	Search,
	Filter,
	Calendar,
	Tag,
	Image,
	Link,
	Eye,
	EyeOff,
	LogOut,
	ChevronRight,
	ChevronLeft,
	MoreVertical,
	Check,
	AlertCircle,
	Info,
	Loader2,
} from "lucide";

// Export Alpine instance for global access
export { Alpine };
