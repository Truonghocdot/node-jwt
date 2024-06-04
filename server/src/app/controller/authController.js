const pool = require("../config/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
class authController {
  register(req, res, next) {
    console.log(req.body);
    //Check existing user
    let q = "SELECT * FROM users WHERE username = ? OR email = ?";
    pool.query(q, [req.body.username, req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists!");
      //Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      q = ` INSERT INTO users(username,email,password) 
      VALUES (?)`;
      const values = [req.body.username, req.body.email, hash];
      pool.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        console.log("Creadted successfully!");
        return res.status(200).json("User has been created!");
      });
    });
  }
  login(req, res, next) {
    //Check user
    let q = "SELECT * FROM users WHERE username = ? ";
    pool.query(q, [req.body.username], (err, data) => {
      if (data.length === 0) return res.status(404).json("User not found!");
      //Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong user or password!");
      const token = jwt.sign({ id: data[0].id }, "jwtkey");
      const { password, ...others } = data[0];
      console.log(token);
      res.status(200).json([others, token]);
    });
  }
  logout(req, res, next) {
    res
      .clearCookie("access_token", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json("User has been logout!");
  }
}
module.exports = new authController();
