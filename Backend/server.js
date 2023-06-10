import express from "express";
import dotenv from "dotenv"; // import env
const app = express();

//configure env
dotenv.config();

//PORT
const PORT = process.env.PORT || 4000;

//rest api
app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});

app.listen(PORT, () => {
  console.log("Server is run on port", PORT);
});
