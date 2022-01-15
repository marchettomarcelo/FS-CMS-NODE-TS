const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/cms";
mongoose.connect(url, { useNewUrlParser: true });

const Post = mongoose.model("Posts", {
  titulo: { type: String, required: true, trim: true },
  conteudo: { type: String },
});

export default Post

