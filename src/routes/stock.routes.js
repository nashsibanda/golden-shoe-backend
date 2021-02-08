const express = require("express");
const multer = require("multer");
const router = express.Router();
const { getStockUnit, addStockToCart, getStock } = require("../controllers/stock.controller");
const {
  isRequestValidated,
  requireAdmin,
  requireAuth,
} = require("../middleware/global.middleware");
const { validateCategory } = require("../validators/category.validators");

router.get("/", getStock);
router.get("/:id", getStockUnit);
router.post("/:id/addToCart", requireAuth, requireAdmin, multer().none(), addStockToCart);

module.exports = router;
