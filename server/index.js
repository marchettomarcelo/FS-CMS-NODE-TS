const path = require("path");
const express = require("express");
const Post = require("./models/post");
require("mongoose");

const PORT = process.env.PORT || 3001;
const app = express();
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../my-app/build")));
app.use(express.json());

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server bitchesssss!" });
});

//Create a new post endpoint
app.post("/post", async (req, res) => {
  console.log(req.body);
  const post = new Post(req.body);
  try {
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.get("/post", async (req, res) => {
  try {
    const post = await Post.find({});
    res.send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../my-app/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Back-end server listening on ${PORT}`);
});
