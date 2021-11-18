const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { validationResult } = require("express-validator");
// Import DB
const User = require("../../models/User");
// Import middleware
const {
  requireUsername,
  requirePassword,
} = require("../../middleware/sanitisers/reglogin");

const router = express.Router();
dotenv.config();

// @route   POST users
// @desc    Register user
// @access  Public
router.post("/", [requireUsername, requirePassword], async (req, res) => {
  try {
    // Checks for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure request data
    const { username, password } = req.body;

    let data = { username, password };

    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).send("Username already in use");
    }

    // Creates salt
    const salt = await bcrypt.genSalt(10);
    // Hashes password
    data.password = await bcrypt.hash(password, salt);

    // Create DB instance
    user = new User(data);

    // Saves to db
    await user.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
