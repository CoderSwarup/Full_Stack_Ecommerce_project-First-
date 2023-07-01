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
      "/api/v1/user-auth": "http://localhost:4000",
      "/api/v1/forgotpassword": "http://localhost:4000",
      "/api/v1/admin-auth": "http://localhost:4000",
      "/api/v1/category/get-category": "http://localhost:4000",
      "/api/v1/category/create-category": "http://localhost:4000",
      "/api/v1/category/update-category": "http://localhost:4000",
      "/api/v1/category/delete-category": "http://localhost:4000",
      "/api/v1/products/create-product": "http://localhost:4000",
      "/api/v1/products/get-products": "http://localhost:4000",
      "/api/v1/products/product-img": "http://localhost:4000",
      "/api/v1/products/single-product": "http://localhost:4000",
      "/api/v1/products/update-product": "http://localhost:4000",
      "/api/v1/products/delete-product": "http://localhost:4000",
      "/api/v1/products/product-filters": "http://localhost:4000",
      "/api/v1/products/product-count": "http://localhost:4000",
      "/api/v1/products/product-page": "http://localhost:4000",
      "/api/v1/products/search": "http://localhost:4000",
      "/api/v1/products/related-product": "http://localhost:4000",
    },
  },
});
