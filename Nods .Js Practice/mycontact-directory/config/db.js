// const { MongoClient } = require("mongodb");
// const dotenv = require("dotenv");

// dotenv.config();

// const uri = process.env.MONGO_URI;

// let db;
// const connectDB = async () => {
//   try {
//     const client = new MongoClient(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     await client.connect();
//     db = client.db();
//     console.log("✅ Connected to MongoDB");
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     process.exit(1);
//   }
// };

// const getDB = () => db;

// module.exports = { connectDB, getDB };

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true });
    console.log("✅ Connected to MongoDB (Mongoose)");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = { connectDB };
