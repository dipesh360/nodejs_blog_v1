//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/", (req, res) => {
  res.render("home", { posts: posts });
});

app.post("/", (req, res) => {
  const { title, description } = req.body;
  const postObj = {
    title: title,
    description: description,
  };
  posts.push(postObj);

  res.redirect("/");
});

app.get("/posts/:title", function (req, res) {
  const title = _.lowerCase(req.params.title);

  const post = posts.filter((post) => {
    const postTitle = _.lowerCase(post.title);
    return postTitle == title;
  });
  res.render("post", { post: post[0] });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
