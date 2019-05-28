const http = require("http");

const server = http.createServer((req, res) => {
  // create server which has a callback function inside which is executed whenever a request comes to server. Can read req from req objects and send res to res object from server.
  console.log(req);
});

server.listen(3000); // looping process that prevent script from exiting and also to keep listening for incoming request and callback function in case we get a request.
