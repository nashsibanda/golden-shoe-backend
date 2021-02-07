const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.requireAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "You must be logged in to do this" });
  }
  const token = req.headers.authorization.split(" ")[1];
  const userId = jwt.verify(token, process.env.JWT_SECRET);
  req.user = userId;
  next();
};

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0)
    return res.status(400).json({ errors: errors.array().map(err => err.msg) });
  next();
};

exports.requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({ message: "Access denied" });
  }
  next();
};
