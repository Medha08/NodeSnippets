const path = require("path");
var express = require("express");

const rootDir = require("../util/path");

var router = express.Router();

router.get("/", (req, res, next) => {
  //get does specific1 matching
  res.sendFile(path.join(rootDir, "views", "shop.html")); //send("<h1>Hi all </h1>");
});

module.exports = router;
