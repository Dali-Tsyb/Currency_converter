import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
   base: "/",
   plugins: [vue()],
   css: {
      postcss: {
         plugins: [autoprefixer()],
      },
   },
   resolve: {
      alias: {
         "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
   },
   build: {
      outDir: "dist",
   },
});
