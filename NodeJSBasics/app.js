const http = require("http");

const server = http.createServer((req, res) => {
  // create server which has a callback function inside which is executed whenever a request comes to server. Can read req from req objects and send res to res object from server.
  console.log(req);

  console.log(req.url, req.method, req.headers); //read data from request

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
