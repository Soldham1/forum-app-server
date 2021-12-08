const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    let db = process.env.DOCKER_DB_URI;

    // Decides which uri to use depending on the environment
    if (process.env.NODE_ENV === "testing") {
      db = process.env.TEST_DB_URI;
    }

    // Connects db
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exits process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
