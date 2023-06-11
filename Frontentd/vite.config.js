import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx",
    },
  },
  server: {
    proxy: {
      // "/v1/pizzadata": {
      //   target: "http://localhost:3000",
      //   changeOrigin: true,
      //   rewrite: (path) => {
      //     return "/";
      //   },
      // },
      "/api/v1/register": "http://localhost:4000", // the address that u serve in the backend
      "/api/v1/login": "http://localhost:4000",
    },
  },
});
