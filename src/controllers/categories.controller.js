const { default: slugify } = require("slugify");
const Category = require("../models/Category");

exports.createCategory = (req, res) => {
  const categoryFields = {
    name: req.body.name,
    slug: slugify(req.body.name, { remove: /[*+~.()'"!:@]/g, lower: true }),
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
};

exports.getCategories = (req, res) => {
  Category.find()
    .then(categories => res.json(categories))
    .catch(error => res.status(400).json(error));
};
