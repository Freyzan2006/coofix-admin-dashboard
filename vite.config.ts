import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [react(), tailwindcss(), tsconfigPaths()],
	resolve: {
		alias: {
			"@shared": "/src/shared",
			"@modules": "/src/modules",
			"@app": "/src/app",
			"@pages": "/src/app/pages",
		},
	},
	build: {
		minify: "esbuild",
		sourcemap: false,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules/react")) return "react-vendor";
					if (id.includes("node_modules/lucide-react")) return "icons-vendor";
					if (id.includes("node_modules/motion")) return "motion-vendor";
				},
			},
		},
		chunkSizeWarningLimit: 500,
	},

	server: {
		port: 3000,
	},
});
