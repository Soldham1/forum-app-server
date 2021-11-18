const { check } = require("express-validator");

module.exports = {
  requireUsername: check(
    "username",
    "Username cannot contain special characters."
  )
    .trim()
    .isAlphanumeric(),
  requirePassword: check(
    "password",
    "Password must be between 6 and 20 characters and contain no special characters."
  )
    .trim()
    .isAlphanumeric()
    .isLength({ min: 5, max: 20 }),
};
