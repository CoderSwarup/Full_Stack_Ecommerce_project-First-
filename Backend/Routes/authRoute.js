import express from "express";
import {
  LoginController,
  RegisterController,
  testController,
} from "../Controllers/authcontroller.js";
import { isadmin, requireSign } from "../Middleware/authMiddleware.js";

//router
const authrouter = express.Router();

//regiter request || POST method
authrouter.post("/register", RegisterController);

//Login request || POST METHOD
authrouter.post("/login", LoginController);

//test route
authrouter.get("/test", requireSign, isadmin, testController);

//Protected Route auth
authrouter.get("/user-auth", requireSign, (req, res) => {
  res.status(200).send({ ok: true });
});
export default authrouter;
