const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { validationResult } = require("express-validator");
// Import middleware
const {
  requireUsername,
  requirePassword,
} = require("../../middleware/sanitisers/reglogin");

// Import DB
const User = require("../../models/User");

const router = express.Router();
dotenv.config();

// @route   POST auth
// @desc    User login
// @access  Public
router.post("/", [requireUsername, requirePassword], async (req, res) => {
  try {
    // Checks for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    // Destructure request data
    const { username, password } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send("Username not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Login failed");
    } else {
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
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
