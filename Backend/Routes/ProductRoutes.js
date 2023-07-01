import express from "express";
// import {
//   createProductcontroller,
//   getproductcontroller,
// } from "../Controllers/productController.js";
import { isadmin, requireSign } from "../Middleware/authMiddleware.js";

import {
  DeleteDroductController,
  GetProducts,
  GetSingleproducts,
  ProductCountController,
  ProductFilterController,
  ProductPageController,
  ProductPhotoController,
  RelatedPrductController,
  SearchProductController,
  UpdateProdcutController,
  newCreateProductController,
} from "../Controllers/NewProductController.js";
import multer from "multer";

const upload = multer({
  limits: { fileSize: 1024 * 1024 }, // 1MB
});
const ProductRouter = express.Router();

// ProductRouter.post(
//   "/create-product",
//   requireSign,
//   isadmin,
//   upload.single("image"),
//   createProductcontroller
// );

// ProductRouter.get("/get-products", getproductcontroller);

//create a product
ProductRouter.post(
  "/create-product",
  requireSign,
  isadmin,
  upload.single("image"),
  newCreateProductController
);

// get products Cntroller

ProductRouter.get("/get-products", GetProducts);

// get Photo controller

ProductRouter.get("/product-img/:id", ProductPhotoController);

//get Single Product

ProductRouter.get("/single-product/:slug", GetSingleproducts);

//Update Product Route
ProductRouter.put(
  "/update-product/:id",
  requireSign,
  isadmin,
  upload.single("image"),
  UpdateProdcutController
);

//Delete A product

ProductRouter.delete(
  "/delete-product/:id",
  requireSign,
  isadmin,
  DeleteDroductController
);

//filter Product
ProductRouter.post("/product-filters", ProductFilterController);

// Product count

ProductRouter.get("/product-count", ProductCountController);

//page list product
ProductRouter.get("/product-page/:page", ProductPageController);

//search Prduct
ProductRouter.get("/search/:keyword", SearchProductController);

//Related Prduct
ProductRouter.get("/related-product/:pid/:catid", RelatedPrductController);

export default ProductRouter;
