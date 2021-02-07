const express = require("express");
const multer = require("multer");
const shortid = require("shortid");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  addStyle,
  addUnit,
  getProductStyles,
  getProductStock,
} = require("../controllers/products.controller");
const {
  isRequestValidated,
  requireAdmin,
  requireAuth,
} = require("../middleware/global.middleware");
const { validateProduct } = require("../validators/product.validators");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: (req, file, callback) => {
    callback(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/", getProducts);
router.get("/:id", getProduct);
router.get("/:id/styles", getProductStyles);
router.get("/:id/stock", getProductStock);

router.post(
  "/:id/styles",
  requireAuth,
  requireAdmin,
  isRequestValidated,
  upload.array("styleImage"),
  addStyle
);

router.post(
  "/:id/stock",
  requireAuth,
  requireAdmin,
  upload.array("styleImage"),
  isRequestValidated,
  addUnit
);

router.post(
  "/create",
  requireAuth,
  requireAdmin,
  validateProduct,
  isRequestValidated,
  upload.array("productImage"),
  createProduct
);

module.exports = router;
