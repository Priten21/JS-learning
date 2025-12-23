const express = require("express");
const router = express.Router();
const UrlModel = require("../models/url");

// homepage
router.get("/", async (req, res) => {
  const allUrls = await UrlModel.find({});
  return res.render("home", { urls: allUrls });
});

module.exports = router;
