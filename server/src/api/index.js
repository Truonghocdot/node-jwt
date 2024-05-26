const authApi = require("./auth.js");
const postsApi = require("./posts.js");
const usersApi = require("./users.js");
const uploadApi = require("./upload.js");
function api(app) {
  app.use("/api/upload", uploadApi);
  app.use("/api/post", postsApi);
  app.use("/api/auth", authApi);
  app.use("/api/user", usersApi);
}
module.exports = api;
