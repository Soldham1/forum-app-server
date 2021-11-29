const express = require("express");

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

    disc = new Disc(data);

    await disc.save();

    res.send("Post created");
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
    const disc = await Disc.findById(req.query.id);

    if (!disc) {
      return res.status(404).json({ msg: "Discussion not found" });
    }

    // Check user
    if (disc.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await disc.remove();

    res.send("Discussion removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST discs/comment
// @desc    Post a comment
// @access  Private
router.post("/comment", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    const disc = await Disc.findById(req.query.id);

    if (!disc) {
      return res.status(404).json({ msg: "Discussion not found" });
    }

    const newComment = {
      user: req.user.id,
      text: req.body.text,
      username: user.username,
    };

    disc.comments.unshift(newComment);

    await disc.save();

    res.json(disc.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE discs/comment
// @desc    Delete a comment
// @access  Private
router.delete("/comment", auth, async (req, res) => {
  try {
    // @TODO  implement
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;