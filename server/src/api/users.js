const express = require("express");
const route = express.Router();
const userController = require("../app/controller/userController.js");
route.get("/own-posts/:id", userController.postOwn);
module.exports = route;
