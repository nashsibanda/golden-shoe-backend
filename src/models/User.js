const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      max: 30,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      max: 30,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    contactNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
};

module.exports = mongoose.model("User", userSchema);
