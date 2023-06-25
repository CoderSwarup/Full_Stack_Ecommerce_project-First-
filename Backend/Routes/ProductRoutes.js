import express from "express";
import { requireSign, isadmin } from "../Middleware/authMiddleware.js";
import {
  CreateProductController,
  deleteproductcontroller,
  getproducts,
  getsingleproducts,
  productphotoController,
  updateProdcutController,
} from "../Controllers/productController.js";
import formidable from "express-formidable";
import { updatecategorycontroller } from "../Controllers/categorycontroller.js";
const ProductRouter = express.Router();

//create  product api
ProductRouter.post(
  "/create-product",
  requireSign,
  isadmin,
  formidable(),
  CreateProductController
);

//get all products
ProductRouter.get("/get-product", getproducts);

//single product

ProductRouter.get("/single-product/:slug", getsingleproducts);

//get photo
ProductRouter.get("/product-photo/:id", productphotoController);

//delete product

ProductRouter.delete(
  "/delete-product/:id",
  requireSign,
  isadmin,
  deleteproductcontroller
);

// update Product
ProductRouter.put(
  "/update-product/:id",
  requireSign,
  isadmin,
  formidable(),
  updateProdcutController
);

export default ProductRouter;
