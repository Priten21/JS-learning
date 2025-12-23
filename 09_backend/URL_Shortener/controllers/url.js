const shortId = require("shortid");
const UrlModel = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send("URL is required");
  }

  // optional: prevent duplicates
  const existing = await UrlModel.findOne({ redirectURL: url });
  if (existing) {
    return res.redirect("/");
  }

  const shortIdValue = shortId.generate();

  await UrlModel.create({
    shortId: shortIdValue,
    redirectURL: url,
    visitHistory: [],
  });

  // ✅ PRG pattern (no duplicate insert)
  return res.redirect("/");
}

module.exports = { handleGenerateNewShortURL };
