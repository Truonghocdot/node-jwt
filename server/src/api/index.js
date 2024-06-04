const authApi = require("./auth.js");
const postsApi = require("./posts.js");
const usersApi = require("./users.js");
const uploadPostApi = require("./upload-post.js");
const updateProfile = require("./upload-avatar.js");
function api(app) {
  app.use("/api/upload/post", uploadPostApi);
  app.use("/api/upload/avatar", updateProfile);
  app.use("/api/post", postsApi);
  app.use("/api/auth", authApi);
  app.use("/api/user", usersApi);
}
module.exports = api;
