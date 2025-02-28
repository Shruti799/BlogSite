const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");
const User = require("../../models/User/User");

const postController = {
  //!Create post
  createPost: asyncHandler(async (req, res) => {
    //get the payload
    const { description, category } = req.body;
  
    // find the user
    const userFound = await User.findById(req.user);
    if (!userFound) {
      throw new Error("User not found");
    }
    const postCreated = await Post.create({
      description,
      image: req.file,
      author: req.user,
    });

    //push the posts into user
    userFound.posts.push(postCreated?._id);
    await userFound.save();
    res.json({
      status: "success",
      message: "Post created successfully",
      postCreated,
    });
  }),

  //!list all posts
  fetchAllPosts: asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.json({
      status: "success",
      message: "Post fetched successfully",
      posts,
    });
  }),

  // get a post
  getPost: asyncHandler(async (req, res) => {
    // Get post ID from params
    const postId = req.params.postId;
    const userId = req.user ? req.user : null;
    const updateViews = req.query.updateViews === "true"; // Check query param

    // Find the post
    const postFound = await Post.findById(postId).populate({
      path: "comments",
      populate: { path: "author" },
    });

    if (!postFound) {
      throw new Error("Post not found");
    }

    // Increase views count only if 'updateViews' is true and user is logged in
    if (userId && updateViews) {
      if (!postFound?.viewers.includes(userId)) {
        postFound.viewers.push(userId);
        postFound.viewsCount = postFound?.viewsCount + 1;
        await postFound.save();
      }
    }

    res.json({
      status: "success",
      message: "Post fetched successfully",
      postFound,
    });
}),


  //! delete
  delete: asyncHandler(async (req, res) => {
    //get the post id from params
    const postId = req.params.postId;
    //find the post
    await Post.findByIdAndDelete(postId);
    res.json({
      status: "success",
      message: "Post deleted successfully",
    });
  }),


  //! update post
  update: asyncHandler(async (req, res) => {
    //get the post id from params
    const postId = req.params.postId;
    //find the post
    const postFound = await Post.findById(postId);
    if (!postFound) {
      throw new Error("Post  not found");
    }
    //update
    const postUpdted = await Post.findByIdAndUpdate(
      postId,
      { description: req.body.description, image: req.file },
      {
        new: true,
      }
    );
    res.json({
      status: "Post updated successfully",
      postUpdted,
    });
  }),


  //like post
  like: asyncHandler(async (req, res) => {
    //Post id
    const postId = req.params.postId;
    //user liking a post
    const userId = req.user;
    //Find the post
    const post = await Post.findById(postId);
    //Check if a user has already disliked the post
    if (post?.dislikes.includes(userId)) {
      post?.dislikes?.pull(userId);
    }
    //Check if a user has already liked the post
    if (post?.likes.includes(userId)) {
      post?.likes?.pull(userId);
    } else {
      post?.likes?.push(userId);
    }
    //resave the post
    await post.save();
    //send the response
    res.json({
      message: "Post Liked",
    });
  }),


  //dislike post
  dislike: asyncHandler(async (req, res) => {
    //Post id
    const postId = req.params.postId;
    //user liking a post
    const userId = req.user;
    //Find the post
    const post = await Post.findById(postId);
    //Check if a user has already liked the post
    if (post?.likes.includes(userId)) {
      post?.likes?.pull(userId);
    }
    //Check if a user has already disliked the post
    if (post?.dislikes.includes(userId)) {
      post?.dislikes?.pull(userId);
    } else {
      post?.dislikes?.push(userId);
    }
    //resave the post
    await post.save();
    //send the response
    res.json({
      message: "Post Disliked",
    });
  }),
};

module.exports = postController;