const express = require("express");
const {
  getPost,
  editPost,

  getPosts,
  deletePost,

  addPost,
} = require("../controllers/api-post-controller");
const router = express.Router();

//Get All Posts
router.get("/api/posts", getPosts);
//add New Post
router.post("/api/post", addPost);
//get post by id
router.get("/api/post/:id", getPost);

router.get("/api/penis", (req, res) => {
  res.status(200).json({ id: 0 });
});

//delete post by id
router.delete("/api/post/:id", deletePost);
//Update post by ID
router.put("/api/post/:id", editPost);

module.exports = router;
