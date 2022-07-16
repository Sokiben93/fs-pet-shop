const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //   console.log("version:", req.httpVersion);
  //   console.log("headers:", req.headers);
  console.log("method:", req.method);
  console.log("url:", req.url);

  // when receiving a GET request to /pets
  fs.readFile("pets.json", "utf-8", (err, data) => {
    res.setHeader("Content-Type", "application/json");
    let petsArr = JSON.parse(data);
    let index = req.url.split("/");
    console.log("index:", index);
    let num = parseInt(index[2]);
    console.log("num:", num);

    // GET METHOD
    if (req.method === "GET") {
      if (req.url === "/pets") {
        res.end(data);
      } else if (typeof num === "number" && num < petsArr.length && num > -1) {
        let petsJson = JSON.stringify(petsArr[num]);
        res.end(petsJson);
      } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not Found");
      }
    }

    // POST METHOD
    else if (req.method === "POST" && req.url === "/pets") {
      let body = "";
      req.on("data", (chuck) => {
        body += chuck;
        console.log("body:", body);
      });
      req.on("end", () => {
        console.log("body:", body);
        let newPet = JSON.parse(body);
        if ((req.url = "/pets")) {
          fs.readFile("pets.json", "utf-8", (err, data) => {
            const existingPet = JSON.parse(data);
            existingPet.push(newPet);
            return fs.writeFile("pets.json", JSON.stringify(petsArr), (err) => {
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(newPet));
            });
          });
        } else {
          res.statusCode = 400;
          res.setHeader("Content-Type", "text/plain");
          res.end("Bad Request");
        }
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Not Found");
    }
  });
});

server.listen(3000, () => {
  console.log("server started on port 3000");
});
// res.writeHead(404);
// res.end();
