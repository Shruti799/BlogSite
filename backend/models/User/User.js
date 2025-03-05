const mongoose = require("mongoose");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    // Basic user information
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true, // Set to false if email is not mandatory
    },
    password: {
      type: String,
      required: false, // Set to false if password is not mandatory
    },
    googleId: {
      type: String,
      required: false, // Required only for users logging in with Google
    },
    authMethod: {
      type: String,
      enum: ["google", "local", "facebook", "github"],
      required: true,
      default: "local",
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);

module.exports = User;