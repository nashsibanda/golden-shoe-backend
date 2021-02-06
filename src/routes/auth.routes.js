const express = require("express");
const { signup } = require("../controllers/auth.controller");
const router = express.Router();
const User = require("../models/User");

router.get("/login", (req, res) => {});

router.post("/signup", signup);

module.exports = router;
