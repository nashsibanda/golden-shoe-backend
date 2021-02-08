const express = require("express");
const router = express.Router();
const {
  getStyles,
  getStyle,
} = require("../controllers/styles.controller");

router.get("/", getStyles);
router.get("/:id", getStyle);

module.exports = router;
