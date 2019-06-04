const fs = require("fs");

const requestHandler = (req, res) => {
  var url = req.url;
  var method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Hi Page</title></head>");
    res.write(
      "<body><form action='/message' method='post'><input type='text' name='message'><input type='submit' value='Send'></form></body>"
    );
    res.write("</html>"); //POST request sent by response of / which will be handled  by /message and it executes below response
    return res.end(); // not returns response but mentions end of response and get out of req listener function otherwise it will run below code and throw error as res object is same if not exited the function and one can not write to res object after res.end().
  }

  if (url === "/message" && method === "POST") {
    // catch a req with url /message and method POST ie an post req to url "/message"
    //task1 redirect to /
    //task2 create a file and store th message user entered in it

    //task2
    //var message = req.message;
    const body = []; //chunks of data
    req.on("data", chunk => {
      console.log(chunk);
      body.push(chunk);
    });

    //node js calls end event when it is done parsing req
    return req.on("end", () => {
      // adding return returns the particular response quitting out of function
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      // fs.writeFileSync("message.txt", message); //synchronus blocking code
      //if code inside callback is affecting anything outside it move it inside function as below when below code was out we were sending response before writing message to file
      fs.writeFile("message.txt", message, err => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
      //as this is inside the callback will not be executed independently rather it is registred internally and when this function if=s called after parsing then it gets out of the function but too late now when it happens as header already set and below response on client/screen.
    });

    //fs.writeFileSync("message.txt", "DUMMY");

    //res.writeHead(302, { Location: "/" }); //writing header of res in one go
  }

  res.setHeader("Content-Type", "text-html");

  //res.write adds res content or fills in res body/content in chunks ie in multiple lines;the html code is converted and written to res object.

  res.write("<html>");
  res.write("<head><title>Hi Page</title></head>");
  res.write(
    "<body><h1>This is troublesome way of writing response!! </h1></body>"
  );
  res.write("</html>");

  res.end(); // sends the response object to client

  //process.exit(); // to hard exit event loop that listens incoming request
};

//module.exports = requestHandler;
// module.exports.requestHandler = requestHandler;
// module.exports.someText = "Some Text";
// module.exports = {
//   requestHandler: requestHandler,
//   someText: "Some Text"
// };
exports.requestHandler = requestHandler;
exports.someText = "Some Text";
