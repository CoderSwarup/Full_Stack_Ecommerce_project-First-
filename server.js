import express from "express";
import dotenv from "dotenv"; // import env
import Connect from "./Config/DB.js"; //database connection
//morgan middleware
import morgan from "morgan";
import authrouter from "./Routes/authRoute.js";
import categoryrouter from "./Routes/categoryroute.js";
import ProductRouter from "./Routes/ProductRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//configure env
dotenv.config();

//PORT
const PORT = process.env.PORT || 4000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/dist")));

//Databse connection
Connect();

//routes
app.use("/api/v1", authrouter);
app.use("/api/v1/category", categoryrouter);
app.use("/api/v1/products", ProductRouter);

//rest api
app.use("*", function (req, res) {
  res.sendFile("index.html", { root: "./client/" });
});

app.listen(PORT, () => {
  console.log("Server is run on port", PORT);
});
