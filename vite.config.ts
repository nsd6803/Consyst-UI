import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// "@/components/ui" — это путь, по которому разработчики кладут компоненты у себя в проекте.
// В этом репозитории он указывает на src/registry, поэтому код примеров совпадает с тем,
// что будет у вас после копирования.
export default defineConfig({
  plugins: [react()],
  // Относительные пути: сайт работает и в корне домена, и на GitHub Pages (/<repo>/)
  base: "./",
  resolve: {
    alias: [
      { find: "@/components/ui", replacement: path.resolve(__dirname, "src/registry") },
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
});
