const shorID = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const shortId = shorID.generate();
    const newUrl = await URL.create({
      shortUrl: shortId,
      redirectUrl: url,
      visitHistory: [],
    });

    return res.status(201).json({ id: newUrl.shortUrl });
  } catch (err) {
    console.error("Error generating short URL:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shorID;
  const result = await URL.findOne({ shortId });
  return res.json({
    totlaClicks: result.visitHistory.length,
    analyytics: result.visitHistory,
  });
}

module.exports = { handleGenerateNewShortUrl, handleGetAnalytics };
