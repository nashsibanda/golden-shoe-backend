const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const { createCategory, getCategories } = require("../controllers/categories.controller");
const { isRequestValidated, requireAdmin, requireAuth } = require("../middleware/global.middleware");
const Category = require("../models/Category");
const { validateCategory } = require("../validators/category.validators")

router.get("/", getCategories);
router.post("/create", requireAuth, requireAdmin, validateCategory, isRequestValidated, createCategory);

module.exports = router;
