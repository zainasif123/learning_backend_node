const express = require("express");
const { connectToMongoDB } = require("./connectionDB");
const app = express();
const port = 3000;
const URL = require("./models/url");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRoutes");
const userRouter = require("./routes/user");
const path = require("path");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly } = require("./middleware/auth");

// Connect to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Mount the user router and URL router
app.use("/url", urlRouter);
app.use("/user", userRouter);

// Apply the authentication middleware only for routes that need authentication
app.use("/static", restrictToLoggedInUserOnly, staticRouter); // Protect static routes

// Redirect route for short URLs
app.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;

    const entry = await URL.findOneAndUpdate(
      { shortUrl },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectUrl);
  } catch (err) {
    console.error("Error redirecting:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
