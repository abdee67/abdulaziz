import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    rollupOptions: {
      output: {
        // Split rarely-changing vendor code out of the app bundle. This keeps the
        // first payload parallel-loadable and lets repeat visitors reuse cached
        // vendor chunks when only application code changes.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion", "gsap", "lenis"],
          icons: ["lucide-react", "react-icons"],
        },
      },
    },
  },
});
