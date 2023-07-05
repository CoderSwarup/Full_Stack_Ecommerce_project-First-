import express from "express";
import {
  AllOrdersController,
  AllUsers,
  ForgotpasswdController,
  LoginController,
  OrderStatusController,
  OrdersController,
  RegisterController,
  testController,
  updateProfileController,
} from "../Controllers/authcontroller.js";
import { isadmin, requireSign } from "../Middleware/authMiddleware.js";

//router
const authrouter = express.Router();

//regiter request || POST method
authrouter.post("/register", RegisterController);

//Login request || POST METHOD
authrouter.post("/login", LoginController);

//Updateprofile
authrouter.put("/update-profile", requireSign, updateProfileController);

//Forgot password controller
authrouter.post("/forgotpassword", ForgotpasswdController);

//test route
authrouter.get("/test", requireSign, isadmin, testController);

//Protected Route auth for user
authrouter.get("/user-auth", requireSign, (req, res) => {
  res.status(200).send({ ok: true });
});

//Protected Route auth for admin
authrouter.get("/admin-auth", requireSign, isadmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//orders
authrouter.get("/orders", requireSign, OrdersController);

//all orders
authrouter.get("/all-orders", requireSign, isadmin, AllOrdersController);

//order status

authrouter.put(
  "/order-status/:order_id",
  requireSign,
  isadmin,
  OrderStatusController
);
//all users Controller

authrouter.get("/all-users", requireSign, isadmin, AllUsers);
export default authrouter;
