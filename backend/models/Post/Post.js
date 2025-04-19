const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, trim: true },
    image: {
      type: Object,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      //required: true,
      index: true,
    },
    viewsCount: { type: Number, default: 0 },
    // Interactions
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", index: true}],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", index: true }],
    viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", index: true}],
    // Comments
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

// Create compound index for sorting by creation date
postSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Post", postSchema);