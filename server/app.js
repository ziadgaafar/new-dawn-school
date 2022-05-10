const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
