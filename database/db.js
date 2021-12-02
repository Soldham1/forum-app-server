const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async (db) => {
  try {
    // Connects db
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log("fails here");
    console.error(err.message);
    // Exits process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
