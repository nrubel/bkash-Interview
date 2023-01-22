/** @format */

import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import { DateTime } from "luxon";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), splitVendorChunkPlugin()],
	build: {
		outDir: "./build",
		rollupOptions: {
			output: {
				entryFileNames: `[name].` + DateTime.now().toUnixInteger() + `.js`,
				chunkFileNames: `[name].` + DateTime.now().toUnixInteger() + `.js`,
				assetFileNames: `[name].` + DateTime.now().toUnixInteger() + `.[ext]`,
			},
		},
	},
});
