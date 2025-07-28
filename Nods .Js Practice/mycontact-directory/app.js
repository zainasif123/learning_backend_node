const express = require("express");
const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/conatactErrorHandler");
const { connectDB } = require("./config/db");

dotenv.config();
const app = express();
// Connect to DB
connectDB().then(() => {
  console.log("Database connected successfully");
});

// Middleware
app.use(express.json());

// Routes
app.use("/api/contacts", require("./routes/contactRoutes.js"));
app.use("/user/", require("./routes/userRoutes.js"));
app.use(errorHandler);

module.exports = app;