const shortId = require("shortid");
const UrlModel = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  try {
    const { url } = req.body;

    // safety check
    if (!url) {
      return res.status(400).send("URL is required");
    }

    // 🔐 user must be logged in (guaranteed by middleware)
    const userId = req.session.userId;

    // ✅ prevent duplicate URL for SAME user
    const existing = await UrlModel.findOne({
      redirectURL: url,
      createdBy: userId,
    });

    if (existing) {
      return res.redirect("/");
    }

    const shortIdValue = shortId.generate();

    await UrlModel.create({
      shortId: shortIdValue,
      redirectURL: url,
      visitHistory: [],
      createdBy: userId, // 🔑 link URL to user
    });

    // ✅ Post → Redirect → Get
    return res.redirect("/");
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).send("Server Error");
  }
}

module.exports = { handleGenerateNewShortURL };
