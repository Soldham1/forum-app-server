const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    console.log(process.env.DB_URI);
    // Connects db
    await mongoose.connect(process.env.DB_URI, {
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
