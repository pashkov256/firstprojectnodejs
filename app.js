const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log("Server request");

  const createPath = (page) => path.resolve(__dirname, "views", `${page}.html`);
  console.log(createPath("index"));
  let basePath = "";

  switch (req.url) {
    case "/home":
    case "/index.html":
    case "/":
      basePath = createPath("index");
      res.statusCode = 200;
      break;

    case "/about-us":
      res.statusCode = 301;
      res.setHeader("Location", "/contacts"); //редирект на другую страницу
      res.end();
      break;

    case "/contacts":
      basePath = createPath("contacts");
      res.statusCode = 200;
      break;
    default:
      basePath = createPath("error");
      res.statusCode = 404;
      break;
  }

  fs.readFile(basePath, (err, data) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });

  console.log(basePath);

  res.setHeader("Content-Type", "text/html");
});

server.listen(PORT, "localhost", (error) => {
  error ? console.log(error) : console.log(`SERVER LISTEN PORT:${PORT}`);
});
