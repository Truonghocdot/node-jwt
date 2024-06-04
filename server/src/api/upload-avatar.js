const express = require("express");
const route = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "D:/full_node/client/public/upload/avatar");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
route.post("", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).send(file.filename);
});
module.exports = route;
