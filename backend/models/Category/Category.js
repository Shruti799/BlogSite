const mongoose = require("mongoose");
// schema
const categorySchema = new mongoose.Schema(
    {
      categoryName: { type: String, requires: true },
      descritpion: { type: string },
      post: [{type: mongoose.Schema.Types.ObjectId, ref:'Post'}],
      author: {type: mongoose.Schema.Types.ObjestId, ref: "User"},
    },
    {
      timestamps: true,
    }
);
// model

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;