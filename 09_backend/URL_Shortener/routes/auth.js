const express = require("express");
const router = express.Router();
const {
  handleSignup,
  handleLogin,
  handleLogout,
} = require("../controllers/auth");

router.get("/login", (req, res) => res.render("login"));
router.get("/signup", (req, res) => res.render("signup"));

router.post("/login", handleLogin);
router.post("/signup", handleSignup);
router.post("/logout", handleLogout);

module.exports = router;
