import { Crepe } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";

export async function initializeMarkdownEditor(
	id: string,
	initialValue: string = "",
	_placeholder: string = "Start typing markdown...",
) {
	const editorId = `${id}-editor`;
	const textarea = document.getElementById(id) as HTMLTextAreaElement;

	if (!textarea) return null;

	try {
		const crepe = new Crepe({
			root: editorId,
			defaultValue: initialValue,
		});

		await crepe.create();

		// Sync on form submit - simple and reliable
		// textarea.closest("form")?.addEventListener("submit", () => {
		// 	textarea.value = crepe.getMarkdown();
		// });

		// return crepe;
	} catch (error) {
		console.error("Error initializing Milkdown editor:", error);
		document.getElementById(editorId)?.remove();
		textarea.classList.remove("hidden");
		textarea.classList.add(
			"textarea",
			"textarea-bordered",
			"h-64",
			"w-full",
			"font-mono",
		);
		return null;
	}
}
