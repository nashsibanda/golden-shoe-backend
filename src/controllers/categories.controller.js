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

const arrangeCategories = (categories, parent = undefined) => {
  const arrangedCategories = [];
  categories.forEach(category => {
    if (String(category.parentId) === String(parent)) {
      arrangedCategories.push(category);
    }
  });
  return arrangedCategories.map(category => {
    const { _id, name, slug } = category
    return {
      _id, name, slug,
      children: arrangeCategories(categories, _id),
    };
  });
};

exports.getCategories = (req, res) => {
  Category.find()
    .then(categories => {
      const output = arrangeCategories(categories)
      res.json( output )
  })
    .catch(error => res.status(400).json(error));
};
