const shortid = require("shortid");
const { default: slugify } = require("slugify");
const Product = require("../models/Product");
const ProductStyle = require("../models/ProductStyle");
const StockUnit = require("../models/StockUnit");

exports.getProducts = (req, res) => {
  Product.find()
    .then(products => {
      res.json(products);
    })
    .catch(error => res.status(400).json(error));
};

exports.getProduct = (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      res.json(product);
    })
    .catch(error => res.status(400).json(error));
};

exports.getProductStyles = (req, res) => {
  ProductStyle.find({ productId: req.params.id })
    .then(styles => res.json(styles))
    .catch(err => res.status(400).json(err));
};

exports.getProductStock = (req, res) => {
  StockUnit.find({ productId: req.params.id })
    .then(stock => res.json(stock))
    .catch(err => res.status(400).json(err));
};

exports.createProduct = (req, res) => {
  const { name, description, categories, type } = req.body;
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
    slug:
      slugify(name, { remove: /[*+~.()'"!:@]/g, lower: true }) +
      "-" +
      shortid.generate(),
    description,
    images,
    categories,
    type,
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

exports.addStyle = (req, res) => {
  const { name } = req.body;
  let images = [];
  if (req.files.length > 0) {
    images = req.files.map(file => {
      return {
        url: file.path,
      };
    });
  }

  const newStyle = new ProductStyle({
    name,
    slug: slugify(name, { remove: /[*+~.()'"!:@]/g, lower: true }),
    productId: req.params.id,
    images,
  });

  newStyle
    .save()
    .then(product => {
      return res.json(product);
    })
    .catch(error => {
      return res.status(400).json(error);
    });
};

exports.addUnit = (req, res) => {
  const { sizeUnit, style, inventory, gender, price } = req.body;
  console.log(req.body);
  const newSize = new StockUnit({
    productId: req.params.id,
    styleId: style,
    inventory: parseInt(inventory),
    size: {
      size: sizeUnit,
      gender,
    },
    price
  });
  console.log(newSize);

  newSize
    .save()
    .then(product => {
      return res.json(product);
    })
    .catch(error => {
      return res.status(400).json(error);
    });
};
