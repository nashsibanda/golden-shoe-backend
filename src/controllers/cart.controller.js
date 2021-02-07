const Cart = require("../models/Cart");

exports.getCart = (req, res) => {
  Cart.findOne({ userId: req.user._id })
    .then(cart => res.json(cart))
    .catch(err => res.error(err));
};

exports.editCartItem = (req, res) => {
  Cart.findOne({ userId: req.user._id })
    .then(cart => {
      const existingProduct = cart.items.filter(
        item => String(item.product) === req.params.itemId
      )[0];
      if (existingProduct) {
        existingProduct.quantity += parseInt(req.body.quantity);
      }
      cart.save();
      res.json(cart);
    })
    .catch(err => res.error(err));
};

exports.removeCartItem = (req, res) => {
  Cart.findOne({ userId: req.user._id })
    .then(cart => {
      const remainingItems = cart.items.filter(
        item => String(item.product) !== req.params.itemId
      );
      cart.save();
      res.json(cart);
    })
    .catch(err => res.error(err));
};
