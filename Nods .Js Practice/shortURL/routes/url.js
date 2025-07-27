const express = require("express");

const router = express.Router();

const {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
} = require("../controllers/url");

// Pass the function reference, not the invocation
router.post("/", handleGenerateNewShortUrl);

router.get("/analytics/:shortUrl", handleGetAnalytics);

module.exports = router; // No need to wrap it in an object
