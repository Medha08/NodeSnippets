const express = require("express");
const path = require("path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const rootDir = require("./util/path");

//express application
const app = express(); //initializes new object  where expressjs framework manages lot of logic behind scene
//app is a valid req handler
// app.use((req, res, next) => {
//   console.log("This is one first MiddleWare");
//   next(); //moves req to next middleware in line
// });
app.use(express.static(path.join(rootDir, "public")));
app.use(shopRoutes);
app.use("/admin", adminRoutes); //adminRoutes is a valid middleware function has to be above "/" route

// app.use("/add-me", (req, res, next) => {
//   console.log("Add Me Page");
//   //res.send("<h1>Hi Add!</h1>"); //we are not calling next so as when / url below middlewares execute and /add this will execute next not used for req to travel down managing express js funnel
// });

// app.use("/", (req, res, next) => {
//   // always runs as / matches all url not mentioned what should be before and after / so always runs
//   console.log("This is second MiddleWare");
//   res.send("<h1>Hi Express!</h1>");
//   next();
// });

// app.use("/add", (req, res, next) => {
//   console.log("Add Page");
//   //res.send("<h1>Hi Express!</h1>"); we are again setting headers automaticallyls//send response //
// });
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html")); //can be chained like this it's just send has to be the last method //"/" default path in app.use()handles all incoming requests
});

app.listen(4200);
