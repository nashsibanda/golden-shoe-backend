const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const Category = require("../models/Category");

router.post("/create", (req, res) => {
  const categoryFields = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.body.parentId) {
    categoryFields.parentId = req.body.parentId;
  }

  const newCategory = new Category(categoryFields);

  newCategory
    .save()
    .then(category => {
      return res.json(category);
    })
    .catch(error => {
      return res.status(400).json(error);
    });
});

module.exports = router;
