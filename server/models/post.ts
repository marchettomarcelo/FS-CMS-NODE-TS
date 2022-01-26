const mongoose = require("mongoose");

// const url = "mongodb://127.0.0.1:27017/cms";
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const Post = mongoose.model("Posts", {
  titulo: { type: String, required: true, trim: true },
  conteudo: { type: String, required: true },
});

export default Post

