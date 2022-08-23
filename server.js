const express = require("express");
const morgan = require("morgan");
const createPath = require("./helpers/create-path");
const mongoose = require("mongoose");
require("dotenv").config();
const methodOverride = require("method-override");

const postRoutes = require("./routes/post-routes");
const contactRoutes = require("./routes/contact-routes");
const postApiRoutes = require("./routes/api-post-routes");

const app = express();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Connect to db"))
  .catch((error) => console.log(error));

app.set("viev engine", "ejs");

app.listen(process.env.PORT, (error) => {
  error ? console.log(error) : console.log(`SERVER LISTEN PORT:${PORT}`);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.urlencoded({ extended: false }));

app.use(express.static("styles")); //общедоступная папка

app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  /*   res.send("<h1>Hello World</h1>"); */
  const title = "Home";
  console.log(createPath("index"));
  /*   console.log(req); */

  res.render(createPath("index"));
});

app.get("/about-us", (req, res) => {
  res.redirect("/contacts"); //редирект
});

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);

app.use((req, res) => {
  /*   res.statusCode = 404; */
  const title = "Error page";
  res.status(404).render(createPath("error"));
});
