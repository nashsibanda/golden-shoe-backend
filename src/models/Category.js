const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const categorySchema = new mongoose.Schema(
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
      unique: true
    },
    parentId: {
      type: mongoose.Types.ObjectId,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
