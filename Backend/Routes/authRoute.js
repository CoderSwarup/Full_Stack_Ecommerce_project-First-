import express from "express";
import { RegisterController } from "../Controllers/authcontroller.js";
const authrouter = express.Router();

authrouter.post("/api/v1/register", RegisterController);

export default authrouter;
