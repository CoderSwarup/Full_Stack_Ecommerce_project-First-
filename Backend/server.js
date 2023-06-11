import express from "express";
import dotenv from "dotenv"; // import env
import Connect from "./Config/DB.js"; //database connection
//morgan middleware
import morgan from "morgan";
import authrouter from "./Routes/authRoute.js";

const app = express();

//configure env
dotenv.config();

//PORT
const PORT = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//Databse connection
Connect();

//routes
app.use(authrouter);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});

app.listen(PORT, () => {
  console.log("Server is run on port", PORT);
});
