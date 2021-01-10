const express = require("express");
const router = express.Router();

//bring in user model
let User = require("../models/user");

// register form
router.get("/register", function (req, res) {
  res.render("register");
});

router.post("/register", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkboxBody;
});

module.exports = router;
