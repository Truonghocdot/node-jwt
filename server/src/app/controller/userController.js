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
}
module.exports = new userController();
