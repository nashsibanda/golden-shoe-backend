const { check } = require("express-validator");

exports.validateSignup = [
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("A valid email address is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.validateLogin = [
  check("email").isEmail().withMessage("A valid email address is required"),
  check("password")
    .notEmpty()
    .withMessage("Password is required"),
];