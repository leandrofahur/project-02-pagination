const express = require("express");
const res = require("express/lib/response");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, response) => {
  res.status(200).sendFile("index.html");
});

app.listen(3000, () => {
  console.log("🚀 Server up and running on port 3000");
});
