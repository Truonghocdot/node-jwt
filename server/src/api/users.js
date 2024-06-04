const express = require("express");
const route = express.Router();
const userController = require("../app/controller/userController.js");
route.get("/own-posts/:id", userController.postOwn);
route.get("/comments/:id", userController.getComments);
route.post("/comment/:id", userController.createComment);
route.delete("/comment/:id", userController.deleteComment);
route.put("/update-profile/:id", userController.updateProfile);
module.exports = route;
