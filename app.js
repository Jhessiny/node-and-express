const express = require("express");
const path = require("path");

const app = express();

//load viwe engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Articles",
  });
});

app.get("/articles/add", (req, res) => {
  res.render("add_article", {
    title: "Add article",
  });
});

app.listen(3000, () => {
  console.log("server running port 3000");
});
