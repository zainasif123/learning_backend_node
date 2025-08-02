const express = require("express");
const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/conatactErrorHandler");
const { connectDB } = require("./config/db");
const db = require("./config/sql");

dotenv.config();
const app = express();
// Connect to DB
connectDB();

//connect to sql
db.pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
  } else {
    console.log("Connected to MySQL database.");
    connection.release();
  }
});

// Middleware
app.use(express.json());

// Routes for mongoDB
app.use("/api/contacts", require("./routes/contactRoutes.js"));
app.use("/user/", require("./routes/userRoutes.js"));

// Routes for mongoDB and MySQL
app.use("/api/mysql-contacts/", require("./routes/mysqlContactRoutes.js"));

app.use(errorHandler);

module.exports = app;
