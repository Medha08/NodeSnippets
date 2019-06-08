const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const rootDir = require("../util/path");

const router = express.Router(); //min express app tied to other / pluggable to other express app/ which can be then exported

router.use(bodyParser.urlencoded({ extended: false }));

// /admin/add-product =>"GET"
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html")); // had used ../ but better to use .. as to make no assumption of linux or windows
});

// /admin/add-product => "POST"

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
