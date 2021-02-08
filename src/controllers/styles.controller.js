const ProductStyle = require("../models/ProductStyle");

exports.getStyles = (req, res) => {
  ProductStyle.find()
    .then(styles => {
      res.json(styles);
    })
    .catch(error => res.status(400).json(error));
};

exports.getStyle = (req, res) => {
  ProductStyle.findById(req.params.id)
    .then(style => {
      res.json(style);
    })
    .catch(error => res.status(400).json(error));
};
