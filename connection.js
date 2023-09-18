const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.DB_URI;
const connectDB = async () => {
  const connection = await mongoose.connect(MONGO_URI);
  if (connection) {
    console.log("Database connected");
  } else {
    console.log("Failed to connect to database");
  }
};

module.exports = {
  connectDB,
};
