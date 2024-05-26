const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const api = require("./api/index.js");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

api(app);
app.listen(process.env.PORT || 8000, (err, result) => {
  if (err) {
    return new err();
  } else {
    if (process.env.PORT) {
      console.log("server is running on localhost:8800");
    } else {
      console.log("server is running on localhost:8000");
    }
  }
});
