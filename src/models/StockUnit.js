const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const stockUnitStyleSchema = new mongoose.Schema(
  {
    skuId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    style: String,
    inventory: {
      type: Number,
      required: true,
      default: 0,
    },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StockUnitStyle", stockUnitStyleSchema);
