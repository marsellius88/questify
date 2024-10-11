require("dotenv").config();
const express = require("express");
const connectDB = require("./db");

const app = express();

app.get("/", (req, res) => {
  res.send("Started Working, Express!");
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server listening at port", PORT);
  });
});
