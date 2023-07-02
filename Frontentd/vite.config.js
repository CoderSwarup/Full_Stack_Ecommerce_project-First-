import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const BASE_URL = "http://localhost:4000";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   manifest: true,
  //   rollupOptions: {
  //     input: "./src/main.jsx",
  //   },
  // },
  server: {
    proxy: {
      // "/v1/pizzadata": {
      //   target: "http://localhost:3000",
      //   changeOrigin: true,
      //   rewrite: (path) => {
      //     return "/";
      //   },
      // },

      "/api/v1/register": BASE_URL, // the address that u serve in the backend
      "/api/v1/login": BASE_URL,
      "/api/v1/update-profile": BASE_URL,
      "/api/v1/user-auth": BASE_URL,
      "/api/v1/forgotpassword": BASE_URL,
      "/api/v1/admin-auth": BASE_URL,
      "/api/v1/category/get-category": BASE_URL,
      "/api/v1/category/create-category": BASE_URL,
      "/api/v1/category/update-category": BASE_URL,
      "/api/v1/category/delete-category": BASE_URL,
      "/api/v1/products/create-product": BASE_URL,
      "/api/v1/products/get-products": BASE_URL,
      "/api/v1/products/product-img": BASE_URL,
      "/api/v1/products/single-product": BASE_URL,
      "/api/v1/products/update-product": BASE_URL,
      "/api/v1/products/delete-product": BASE_URL,
      "/api/v1/products/product-filters": BASE_URL,
      "/api/v1/products/product-count": BASE_URL,
      "/api/v1/products/product-page": BASE_URL,
      "/api/v1/products/search": BASE_URL,
      "/api/v1/products/related-product": BASE_URL,
      "/api/v1/products/caterory-related": BASE_URL,
    },
  },
});
