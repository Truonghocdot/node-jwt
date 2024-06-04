const pool = require("../config/db.js");
class userController {
  postOwn(req, res, next) {
    const userId = req.params.id;
    const q = `SELECT * FROM posts 
    WHERE uid = ?`;
    pool.query(q, [userId], (err, data) => {
      if (err) return res.status(401).json(err);
      res.status(200).json(data);
    });
  }

  async updateProfile(req, res, next) {
    const token = req.body.access_token;
    console.log(token);
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");
      const postId = req.params.id;
      const q = `UPDATE users
      SET username = ?,email =?,userImg = ?
      WHERE id = ?
      `;
      const values = [req.body.username, req.body.email, req.body.userImg];
      pool.query(q, [...values], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(300).json("Profile has been updated!");
      });
    });
  }

  async getComments(req, res, next) {
    const idPost = req.params.id;
    let q = `
    SELECT users.username, users.userImg, users.id uid,comments.idPost , comments.content, comments.timeCreated, comments.id commentId
    FROM users
    JOIN comments ON users.id = comments.uid
    WHERE comments.idPost = ?`;
    pool.query(q, [idPost], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  }

  async createComment(req, res, next) {
    let idPost = parseInt(req.params.id);
    let q = `INSERT INTO comments(idPost, content, uid) 
    VALUE (?,?,?)`;
    pool.query(q, [idPost, req.body.content, req.body.uid], (err, data) => {
      if (err) return res.status(500).json(err);
      res.status(200).json("Comment has been created!");
    });
  }

  async updateComment(req, res, next) {
    let q = `UPDATE comments
    SET content = ?
    WHERE id = ?;
    `;
    pool.query(q, [req.body.content], (err, result) => {
      if (er) return res.status(500).json(err);
      res.status(304).json("comment has been updated !");
    });
  }

  async deleteComment(req, res, next) {
    let q = `DELETE FROM comments WHERE id = ?`;
    pool.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      res.status(200).json("comment has been deleted !");
    });
  }
}

module.exports = new userController();
