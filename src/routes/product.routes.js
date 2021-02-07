const express = require("express");
const multer = require("multer");
const shortid = require("shortid");
const router = express.Router();
const {
  createProduct,
  getProducts,
} = require("../controllers/products.controller");
const {
  isRequestValidated,
  requireAdmin,
  requireAuth,
} = require("../middleware/global.middleware");
const { validateProduct } = require("../validators/product.validators");
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(path.dirname(__dirname), 'uploads'))
  },
  filename: (req, file, callback) => {
    callback(null, shortid.generate() + '-' + file.originalname)
  }
})
const upload = multer({ storage });

router.get("/", getProducts);
router.post(
  "/create",
  requireAuth,
  requireAdmin,
  validateProduct,
  isRequestValidated,
  upload.array('productImage'),
  createProduct
);

module.exports = router;
