const http = require("http");

const express = require("express");
//express application
const app = express(); //initializes new object  where expressjs framework manages lot of logic behind scene
//app is a valid req handler
app.use((req, res, next) => {
  console.log("This is one first MiddleWare");
  next(); //moves req to next middleware in line
});

app.use((req, res, next) => {
  console.log("This is second MiddleWare");
  res.send("<h1>Hi Express!</h1>");
});

app.listen(4200);
