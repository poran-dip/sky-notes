import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("react-dom") || id.includes("react/")) {
            return "vendor-react";
          }

          const pkg = id.split("node_modules/")[1].split("/")[0];
          return `vendor-${pkg}`;
        },
      },
    },
    chunkSizeWarningLimit: 300,
  },
});
