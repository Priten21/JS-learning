const express = require("express");
const router = express.Router();
const {
  handleSignup,
  handleLogin,
  handleLogout,
} = require("../controllers/auth");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", handleSignup);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", handleLogin);

router.get("/logout", handleLogout);

module.exports = router;
