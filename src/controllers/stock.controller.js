const Cart = require("../models/Cart");
const StockUnit = require("../models/StockUnit");

exports.getStock = (req, res) => {
  StockUnit.find()
    .then(stock => res.json(stock))
    .catch(err => res.error(err));
};

exports.getStockUnit = (req, res) => {
  StockUnit.findById(req.params.id)
    .then(stockUnit => res.json(stockUnit))
    .catch(err => res.error(err));
};

exports.addStockToCart = (req, res) => {
  StockUnit.findById(req.params.id).then( stockUnit => {
    Cart.findOne({ userId: req.user._id }).then(response => {
      let cart;
      if (response) {
        cart = response;
      } else {
        cart = new Cart({
          userId: req.user._id
        })
      }

      const existingProduct = cart.items.filter(item => String(item.product) === String(stockUnit._id))[0]
      if (existingProduct) {
        existingProduct.quantity += parseInt(req.body.quantity);
      } else {
        cart.items.push({
          product: stockUnit._id,
          quantity: req.body.quantity,
          priceOnAdd: stockUnit.price
        })
      }
      cart.save();
      res.json(cart);
    })
    .catch(err => res.error(err))
  }).catch(error => res.error(error))
}