const { check } = require("express-validator");

exports.validateCategory = [
  check("name").notEmpty().withMessage("Category name is required")
];
