const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB (Mongoose)");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = { connectDB };
