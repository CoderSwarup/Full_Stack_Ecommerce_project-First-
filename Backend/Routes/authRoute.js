import express from "express";
import {
  ForgotpasswdController,
  LoginController,
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
export default authrouter;
