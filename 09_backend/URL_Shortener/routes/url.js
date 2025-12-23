const express = require("express");
const router = express.Router();
const UrlModel = require("../models/url");
const { handleGenerateNewShortURL } = require("../controllers/url");

// create short url
router.post("/", handleGenerateNewShortURL);

// redirect (MUST BE LAST)
router.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    const entry = await UrlModel.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    return res.redirect(entry.redirectURL);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
