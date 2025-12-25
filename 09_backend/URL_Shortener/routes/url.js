const express = require("express");
const router = express.Router();

const UrlModel = require("../models/url");
const { handleGenerateNewShortURL } = require("../controllers/url");
const { requireLogin } = require("../middlewares/auth");

router.post("/", requireLogin, handleGenerateNewShortURL);

router.get("/:shortId", async (req, res) => {
  const entry = await UrlModel.findOneAndUpdate(
    { shortId: req.params.shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

  if (!entry) return res.status(404).send("Not Found");
  res.redirect(entry.redirectURL);
});

module.exports = router;
