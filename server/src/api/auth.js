const express = require("express");
const route = express.Router();
const autController = require("../app/controller/authController.js");
route.post("/register", autController.register);
route.post("/logout", autController.logout);
route.post("/login", autController.login);

module.exports = route;
