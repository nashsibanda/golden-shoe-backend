const express = require("express");
const {
  signup,
  login,
  requireAuth,
} = require("../controllers/auth.controller");
const router = express.Router();
const User = require("../models/User");
const { validateSignup, isRequestValidated, validateLogin } = require("../validators/auth.validators");

router.post("/login", validateLogin, isRequestValidated, login());
router.post("/admin/login", validateLogin, isRequestValidated, login("admin"));

router.post("/signup", validateSignup, isRequestValidated, signup);

module.exports = router;
