const mysql2 = require("mysql2");
const dotenv = require("dotenv").config();

const pool = mysql2.createPool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER || "root",
  password: process.env.password || "",
});

pool.getConnection((err, result) => {
  if (!err) {
    console.log("connected!");
  } else {
    console.log(result);
  }
});
module.exports = pool;
