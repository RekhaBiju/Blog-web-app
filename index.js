const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = []; //  Our "fake database"
let postId = 1; //  Increment ID for each new post

// Home Route - show all posts
app.get("/", (req, res) => {
  res.render("home", { posts: posts });
});

//  Compose page (GET)
app.get("/compose", (req, res) => {
  res.render("compose");
});

//  Handle New Post Submission
app.post("/compose", (req, res) => {
  const post = {
    id: postId++,
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

//  Edit Post (GET)
app.get("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  if (post) {
    res.render("edit", { post: post });
  } else {
    res.send("Post not found");
  }
});

//  Update Edited Post (POST)
app.post("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.title = req.body.postTitle;
    post.content = req.body.postBody;
    res.redirect("/");
  } else {
    res.send("Post not found");
  }
});

// Delete a Post
app.post("/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter(p => p.id !== postId);
  res.redirect("/");
});

//  Start Server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
