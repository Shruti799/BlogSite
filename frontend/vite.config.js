import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@tanstack/react-query", "@tanstack/react-query-devtools"],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/], // Ensures React Query is bundled properly
    },
  },
});





