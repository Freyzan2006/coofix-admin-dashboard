import { createProviderApp } from "@app/providers";
import { createRoot } from "react-dom/client";

import "@app/global.css";

function createReactApp() {
	const root = document.getElementById("root");
	if (!root) {
		throw new Error("Root element not found");
	}
	const providers = createProviderApp();
	createRoot(root).render(providers);
}

createReactApp();
