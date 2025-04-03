import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl({
      domains: ["192.168.1.151"],
    }),
  ],
  server: {
    host: true,
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "[hash].js",
        chunkFileNames: "[hash].js",
        assetFileNames: "[hash][extname]",
        dir: "dist", // Ensure all files go directly into dist
      },
    },
  },
  // optimizeDeps: {
  //   include: ["three"],
  //   //   // exclude: ["zustand", "three", "@bufbuild/protobuf"],
  // },
  // build: {
  //   rollupOptions: {
  //     external: [
  //       "three",
  //       "zustand",
  //       "@bufbuild/protobuf/wire",
  //       "three/src/math/MathUtils.js",
  //     ],
  //   },
  // },
  // resolve: {
  //   alias: {
  //     "use-sync-external-store/shim/with-selector.js":
  //       "use-sync-external-store/shim/with-selector",
  //   },
  // },
});
