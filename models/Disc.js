const mongoose = require("mongoose");

const DiscSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      username: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Disc = mongoose.model("Disc", DiscSchema);
