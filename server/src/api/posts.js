const express = require("express");
const postController = require("../app/controller/postController.js");
const route = express.Router();
route.patch("/:id", postController.editPost);
route.delete("/:id", postController.deletePost);
route.get("/:id", postController.getPost);
route.get("/", postController.getPosts);
route.post("/", postController.createPost);
module.exports = route;
