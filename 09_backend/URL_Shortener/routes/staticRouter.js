const express = require("express");
const router = express.Router();
const UrlModel = require("../models/url");
const { requireLogin } = require("../middlewares/auth");

router.get("/", requireLogin, async (req, res) => {
  const urls = await UrlModel.find({ createdBy: req.user._id });
  res.render("home", { urls, user: req.user });
});

module.exports = router;
