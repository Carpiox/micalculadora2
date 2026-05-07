import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import { PRERENDER_ROUTES } from "./src/lib/site-routes";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },

  plugins: [
    react(),
    ...(mode !== "development"
      ? vitePrerenderPlugin({
          renderTarget: "#root",
          prerenderScript: path.resolve(__dirname, "src/prerender.tsx"),
          additionalPrerenderRoutes: PRERENDER_ROUTES.filter((route) => route !== "/"),
        })
      : []),
    ...(mode === "development" ? [componentTagger()] : []),
  ],

  build: {
    cssCodeSplit: true,
    modulePreload: {
      polyfill: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom", "react-helmet-async"],
          "ui-vendor": ["lucide-react", "@radix-ui/react-tooltip", "@radix-ui/react-select"],
        },
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
