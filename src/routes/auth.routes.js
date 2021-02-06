const express = require("express");
const { signup, login, requireAuth } = require("../controllers/auth.controller");
const router = express.Router();
const User = require("../models/User");

router.post("/login", login());
router.post("/admin/login", login("admin"));
router.post("/signup", signup);

router.post("/profile", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
