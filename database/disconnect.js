const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconected");
  } catch (err) {
    console.log("falied......");
    console.error(err.message);
    // Exits process with failure
    process.exit(1);
  }
};

module.exports = disconnectDB;
