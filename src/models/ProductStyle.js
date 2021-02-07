const mongoose = require("mongoose");

const productStyleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    images: [{ url: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductStyle", productStyleSchema);
