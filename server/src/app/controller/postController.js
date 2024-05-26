const pool = require("../config/db.js");
const jwt = require("jsonwebtoken");
class postController {
  getPost(req, res, next) {
    const q = `SELECT users.username, users.userImg ,posts.id ,posts.title, posts.description, posts.img, posts.cat, posts.date
    FROM users
    JOIN posts ON users.id = posts.uid
    WHERE posts.id = ?
    `;
    pool.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]);
    });
  }
  getPosts(req, res, next) {
    let q = req.query.cat
      ? "SELECT * FROM posts WHERE cat = ?"
      : "SELECT * FROM posts";
    pool.query(q, [req.query.cat], (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(data);
    });
  }
  createPost(req, res, next) {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");
      const q = `INSERT INTO posts(title,description,img,cat,date,uid)
      VALUES (?)
      `;
      const values = [
        req.body.title,
        req.body.description,
        req.body.img,
        req.body.cat,
        req.body.date,
        userInfo.id,
      ];

      pool.query(q, [values], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(300).json("Post has been created!");
      });
    });
  }
  editPost(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");
      const postId = req.params.id;
      const q = `UPDATE posts
      SET title = ?,description = ?,img = ?,cat = ?,title = ?
      WHERE id = ? AND uid = ? 
      `;
      const values = [
        req.body.title,
        req.body.description,
        req.body.img,
        req.body.cat,
        userInfo.id,
      ];
      pool.query(q, [...values, postId, userInfo.id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(300).json("Post has been updated!");
      });
    });
  }
  deletePost(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");
      const postId = req.params.id;
      const q = `DELETE FROM posts WHERE id = ? AND uid = ?`;
      pool.query(q, [postId, userInfo.id], (err, data) => {
        if (err) return res.status(403).json("You can delete only your post!");
        return res.status(200).json("Post has been deleted!");
      });
    });
  }
}
module.exports = new postController();
