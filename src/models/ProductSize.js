const mongoose = require("mongoose");

const productSizeSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductSize", productSizeSchema);
