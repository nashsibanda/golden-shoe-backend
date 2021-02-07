const express = require("express");
const router = express.Router();
const { createCart, getCart, editCartItem, removeCartItem } = require("../controllers/cart.controller");
const {
  isRequestValidated,
  requireAdmin,
  requireAuth,
} = require("../middleware/global.middleware");

router.get("/", requireAuth, getCart);
router.put("/:itemId", requireAuth, editCartItem);
router.delete("/:itemId", requireAuth, removeCartItem);

module.exports = router;
