"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var url = "mongodb://127.0.0.1:27017/cms";
mongoose.connect(url, { useNewUrlParser: true });
var Post = mongoose.model("Posts", {
    titulo: { type: String, required: true, trim: true },
    conteudo: { type: String },
});
exports.default = Post;
