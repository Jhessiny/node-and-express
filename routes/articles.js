const express = require("express");
const router = express.Router();

//bring in article model
let Article = require("../models/article");

router.get("/add", (req, res) => {
  res.render("add_article", {
    title: "Add article",
  });
});

//add submit post route
router.post("/add", (req, res) => {
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save(function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      // req.flash("sucess", "Article added");
      res.redirect("/");
    }
  });
  return;
});

//load edit form
router.get("/edit/:id", (req, res) => {
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
router.post("/edit/:id", (req, res) => {
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

//delete article route
router.post("/delete/:id", function (req, res) {
  let query = { _id: req.params.id };

  Article.remove(query, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/");
  });
});

//get single post
router.get("/:id", (req, res) => {
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

module.exports = router;
