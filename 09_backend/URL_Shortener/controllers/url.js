const shortId = require("shortid");
const UrlModel = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const { url } = req.body;
  if (!url) return res.redirect("/");

  await UrlModel.create({
    shortId: shortId.generate(),
    redirectURL: url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  res.redirect("/");
}

module.exports = { handleGenerateNewShortURL };
