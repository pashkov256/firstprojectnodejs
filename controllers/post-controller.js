const createPath = require("../helpers/create-path");
const Post = require("../models/post");

const handleError = (res, error) => {
  console.log(error);
  res.render(createPath("error"));
};

const getPost = (req, res) => {
  const title = "Post";
  Post.findById(req.params.id)
    .then((post) => {
      console.log(post);
      res.render(createPath("post"), { post, title });
    })
    .catch((error) => handleError(res, error));
};

const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { title, author, text })
    .then((result) => {
      console.log(result);
      res.redirect(`/posts/${id}`);
    })
    .catch((error) => handleError(res, error));
};

const getEditPost = (req, res) => {
  const title = "edit Post";
  Post.findById(req.params.id)
    .then((post) => {
      console.log(post);
      res.render(createPath("edit-post"), { post, title });
    })
    .catch((error) => handleError(res, error));
};

const getPosts = (req, res) => {
  const title = "Post";
  Post.find()
    .sort({ createdAt: -1 }) //сортировка
    .then((posts) => {
      console.log(posts);
      const id = posts._id;
      res.render(createPath("posts"), { posts, title, id });
    })
    .catch((error) => handleError(res, error));
};

const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => handleError(res, error));
};

const getAddPost = (req, res) => {
  const title = "Add posts";
  res.render(createPath("add-post"), { title });
};

const addPost = (req, res) => {
  const { title, author, text } = req.body;

  const post = new Post({ title, author, text });
  post
    .save()
    .then((result) => res.redirect("/posts"))
    .catch((error) => handleError(res, error));
};

module.exports = {
  getPost,
  editPost,
  getEditPost,
  getPosts,
  deletePost,
  getAddPost,
  addPost,
};
