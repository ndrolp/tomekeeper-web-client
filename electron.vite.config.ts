import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.join(__dirname, "./src/electron/index.ts"),
      formats: ["cjs"],
    },
    outDir: "dist/electron",
    rollupOptions: {
      external: ["electron"], // Don't bundle Electron
    },
    emptyOutDir: false,
    target: "node14", // or node16 depending on your Electron version
  },
});
