const { default: slugify } = require("slugify");
const Product = require("../models/Product");

exports.createProduct = (req, res) => {
  const { name, description, categories } = req.body;
  let images = [];
  if (req.files.length > 0) {
    images = req.files.map(file => {
      return {
        url: file.path,
      };
    });
  }

  const newProduct = new Product({
    name,
    slug: slugify(name, { remove: /[*+~.()'"!:@]/g, lower: true }),
    description,
    images,
    categories,
  });

  newProduct
    .save()
    .then(product => {
      return res.json(product);
    })
    .catch(error => {
      return res.status(400).json(error);
    });
};

const arrangeProducts = (products, parent = undefined) => {
  const arrangedProducts = [];
  products.forEach(product => {
    if (String(product.parentId) === String(parent)) {
      arrangedProducts.push(product);
    }
  });
  return arrangedProducts.map(product => {
    const { _id, name, slug } = product;
    return {
      _id,
      name,
      slug,
      children: arrangeProducts(products, _id),
    };
  });
};

exports.getProducts = (req, res) => {
  Product.find()
    .then(products => {
      const output = arrangeProducts(products);
      res.json(output);
    })
    .catch(error => res.status(400).json(error));
};
