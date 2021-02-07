const express = require("express");
const router = express.Router();
const { createCategory, getCategories } = require("../controllers/categories.controller");
const { isRequestValidated, requireAdmin, requireAuth } = require("../middleware/global.middleware");
const { validateCategory } = require("../validators/category.validators")

router.get("/", getCategories);
router.post("/create", requireAuth, requireAdmin, validateCategory, isRequestValidated, createCategory);

module.exports = router;
