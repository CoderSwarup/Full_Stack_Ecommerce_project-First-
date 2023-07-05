import express from "express";
const categoryrouter = express.Router();
import { isadmin, requireSign } from "../Middleware/authMiddleware.js";
import {
  categoryallcontroller,
  categoryycontroller,
  deletecontroller,
  singlecategorycontroller,
  updatecategorycontroller,
} from "../Controllers/categorycontroller.js";

//create category
categoryrouter.post(
  "/create-category",
  requireSign,
  isadmin,
  categoryycontroller
);

//update category
categoryrouter.put(
  "/update-category/:id",
  requireSign,
  isadmin,
  updatecategorycontroller
);

//getall category

categoryrouter.get("/get-category", categoryallcontroller);

//get single category

categoryrouter.get("/single-category/:slug", singlecategorycontroller);

//delete category

categoryrouter.delete(
  "/delete-category/:id",
  requireSign,
  isadmin,
  deletecontroller
);

export default categoryrouter;
