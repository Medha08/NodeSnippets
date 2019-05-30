const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // create server which has a callback function inside which is executed whenever a request comes to server. Can read req from req objects and send res to res object from server.
  //console.log(req);

  //console.log(req.url, req.method, req.headers); //read data from request
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
    fs.writeFileSync("message.txt", "DUMMY");

    //res.writeHead(302, { Location: "/" }); //writing header of res in one go
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
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
});

server.listen(3000); // looping process that prevent script from exiting and also to keep listening for incoming request and callback function in case we get a request.
