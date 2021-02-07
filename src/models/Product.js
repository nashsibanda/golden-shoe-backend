const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ProductStyle = require("./ProductStyle");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        url: {
          type: String,
        },
      },
    ],
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        body: { type: String, required: true },
        rating: {
          type: Number,
          enum: [1, 2, 3, 4, 5],
          required: true,
        },
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    // styles: [
    //   {
    //     style: { type: String, required: true, trim: true },
    //     slug: { type: String, trim: true, required: true },
    //     images: [{ url: String }],
    //   },
    // ],
    // sizes: [
    //   {
    //     size: { type: String, required: true, trim: true },
    //     slug: { type: String, trim: true, required: true },
    //   },
    // ],
    type: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
