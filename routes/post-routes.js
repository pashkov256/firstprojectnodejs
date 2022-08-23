const express = require("express");
const {
  getPost,
  editPost,
  getEditPost,
  getPosts,
  deletePost,
  getAddPost,
  addPost,
} = require("../controllers/post-controller");
const router = express.Router();
const createPath = require("../helpers/create-path");
const Post = require("../models/post");

router.get("/posts/:id", getPost);
router.put("/edit/:id", editPost);
router.get("/edit/:id", getEditPost);
router.post("/add-post", addPost);
router.get("/posts", getPosts);
router.delete("/posts/:id", deletePost);
router.get("/add-post", getAddPost);

module.exports = router;
