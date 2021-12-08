const express = require("express");

// Import middleware
const auth = require("../../middleware/auth");

// Import DB
const Disc = require("../../models/Disc");
const User = require("../../models/User");

const router = express.Router();

// @route   POST discs
// @desc    Post a new discussion
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    let id = req.user.id;

    // Get username
    let user = await User.findById(id);

    username = user.username;

    let userId = id;

    // Destructure request data
    const { title, content } = req.body;

    let data = { userId, username, title, content };

    // Create new user
    disc = new Disc(data);

    // Save to db
    await disc.save();

    res.json(disc.id);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET discs
// @desc    Get all discussions
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // Gets all discussions and sorts so the newest is at the top
    let discussions = await Disc.find().sort({ date: -1 });
    res.json(discussions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE discs
// @desc    Delete a discussion
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    // Finds discussion
    const disc = await Disc.findById(req.query.id);

    if (!disc) {
      return res.status(404).json({ msg: "Discussion not found" });
    }

    // Check users permissions
    if (disc.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Deletes discussion
    await disc.remove();

    res.send("Discussion removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
