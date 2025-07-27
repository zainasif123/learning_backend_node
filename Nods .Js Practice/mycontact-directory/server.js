const express = require("express");
const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/conatactErrorHandler");
const { connectDB } = require("./config/db"); // Add this line

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/contacts", require("./routes/contactRoutes.js"));
app.use("/user/", require("./routes/userRoutes.js"));
app.use(errorHandler);

// Connect to DB and start server
const port = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
});
