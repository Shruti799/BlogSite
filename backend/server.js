const express = require('express');

const app = express();

// PORT
const PORT = 5000;

// Middlewares
app.use(express.json()) // Pass json data

// Create Post
app.post('/api/v1/posts/create', async(req, res)=>{
    try {
        // get the payload
        const postData = req.body;
        const postCreated = await Post.create(postData);
        res.json({
            status: "success",
            message: "Post created successfully",
            postCreated,
        });
    } catch (error) {
        res.json(error);
    }
});

// Start Server
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));