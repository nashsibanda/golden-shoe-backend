const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

function getPrice(value) {
  if (typeof value !== 'undefined') {
    return parseFloat(value.toString())
  }
  return value;
}

const stockUnitSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    styleId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    size: {
      size: {
        type: Number,
        required: true
      },
      gender: {
        type: String,
        enum: ['women', 'men', 'children']
      }
    },
    inventory: {
      type: Number,
      required: true,
    },
    price: { type: mongoose.Types.Decimal128, required: true, get: getPrice },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StockUnit", stockUnitSchema);
