const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

mongoose.connect(
  "mongodb://localhost/nodekb",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);
let db = mongoose.connection;

//check connection
db.once("open", function () {
  console.log("Connected to MongoDB");
});

//check db errors
db.on("error", function (err) {
  console.log(err);
});

const app = express();

//bring in models
let Article = require("./models/article");
const bodyParser = require("body-parser");

//load viwe engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname, "public")));

//home route
app.get("/", (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        title: "Articles",
        articles: articles,
      });
    }
  });
});

//get single post
app.get("/article/:id", (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if (err) {
      console.log(err);
    } else {
      res.render("article", {
        article: article,
      });
    }
  });
});

app.get("/articles/add", (req, res) => {
  res.render("add_article", {
    title: "Add article",
  });
});

//add submit post route
app.post("/articles/add", (req, res) => {
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save(function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/");
    }
  });
  return;
});

//load edit form
app.get("/article/edit/:id", (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if (err) {
      console.log(err);
    } else {
      res.render("edit_article", {
        title: "Edit",
        article: article,
      });
    }
  });
});

//Update submit post route
app.post("/article/edit/:id", (req, res) => {
  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = { _id: req.params.id };

  Article.update(query, article, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/");
    }
  });
  return;
});

app.post("/article/delete/:id", function (req, res) {
  let query = { _id: req.params.id };

  Article.remove(query, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("server running port 3000");
});
