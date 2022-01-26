import axios from "axios";
const path = require("path");
const express = require("express");
import Post from "./models/post"
import StatusFinder from "./utils/StatusFinder";
require("mongoose");
import crypto from "crypto"


//TYPESCRIPT TEST FILE
const PORT = process.env.PORT || 3001;
const app = express();
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../my-app/build")));
app.use(express.json());

// Handle GET requests to /api route
app.get("/onepost", async (req:any , res:any) => {
  const pedido = await Post.findOne({ titulo: req.query.titulo });

  res.json(pedido);
});

//Create a new post endpoint
app.post("/post", async (req:any, res:any) => {
  const post = new Post(req.body);
  try {
    await post.save();
    res.status(201).send(post);
  } catch (e:any) {
    res.status(400).send(e.message);
  }
});

app.patch("/update-posts", async (req:any, res:any) => {
  const dataToUpdateDatabase = req.body;

  for (let i = 0; i < dataToUpdateDatabase.length; i++) {
    const { _id, titulo, conteudo } = dataToUpdateDatabase[i];

    try {
      const tituloFormatado = titulo.replaceAll(" ", "-");

      await Post.findByIdAndUpdate(
        { _id },
        {
          titulo: tituloFormatado,
          conteudo,
        }
      );
    } catch (e:any) {
      res.status(400).send(e.message);
    }
  }
  res.send("deu certo men");
});

app.delete("/post/:_id", async (req:any, res:any) => {
  const postBeingDeleted = req.params._id;
  try {
    await Post.findByIdAndDelete(postBeingDeleted);
    res.send("Apagado com sucesso");
  } catch (e:any) {
    res.send(e.message);
  }
});

app.get("/", (req:any, res:any)=>{
  res.send("opa")
})

app.get("/post", async (req:any, res:any) => {
  try {
    const post = await Post.find({});
    res.send(post);
  } catch (e:any) {
    res.status(500).send(e);
  }
});

app.get("/publish-website", async (req:any, res:any) => {

  res.send("publicando")
  const testPost = crypto.randomBytes(20)
  const testPostString = testPost.toString("hex")

  const newPost = await new Post({titulo: testPostString})
  try{
    const ne = await newPost.save() 
    console.log(ne)

    await axios.get("https://api.vercel.com/v1/integrations/deploy/prj_Bf5RbDJ1DzPSNqlvmWbk2zAkuPjn/KlS72WhKlw")
    
    const status = await StatusFinder(testPostString)
    await Post.findOneAndDelete({titulo: testPostString})

    res.status(200).send(status)
  
    

  }catch(e:any){
    res.status(201).send(e.message)
  }
})

// All other GET requests not handled before will return our React app
app.get("*", (req:any, res:any) => {
  res.sendFile(path.resolve(__dirname, "../my-app/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Back-end server listening on ${PORT}`);
});
