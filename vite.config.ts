import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],

	resolve: {
		alias: {
			"@pages": "/src/app/pages",
			"@app": "/src/app",
			"@modules": "/src/modules",
			"@shared": "/src/shared",
		},
	},

	server: {
		port: 3000,
	},
});
