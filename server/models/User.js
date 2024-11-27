const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      required: true,
      type: String,
      trim: true,
    },
    lastName: {
      required: true,
      type: String,
      trim: true,
    },
    email: {
      required: true,
      type: String,
      trim: true,
    },
    password: {
      required: true,
      type: String,
    },
    active: {
      required: true,
      type: Boolean,
      default: true,
    },
    role: {
      required: true,
      type: String,
      default: "User",
      enum: ["User", "Manager", "Admin"],
    },
    createdAt: {
      required: true,
      type: Date,
      default: Date.now,
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
