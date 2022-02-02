const mongoose = require("mongoose");

// const url = "mongodb://127.0.0.1:27017/cms";
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const Post = mongoose.model("Posts", {
  path: { type: String, required: true, trim: true },
  info: { type: String, required: true },

  publishOnNextBuild: { type: Boolean, default: false, required: true },

  HTMLContent: { type: String, default: "oi" }
});

export default Post

