const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/tests", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

router.get("/enterUrl", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("enterUrl", {
    urls: allUrls,
  });
});

router.get("/signup", async (req, res) => {
  return res.render("signUp");
});

router.get("/login", async (req, res) => {
  return res.render("logIn");
});

module.exports = router;
