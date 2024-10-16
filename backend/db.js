const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;