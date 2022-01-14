
import './App.css';
import React, { useEffect, useState } from "react";
import Canva from "./components/Canva";
import ContentBar from "./components/ContentBar";
//import MockData from "./data";
import GetTitulos from "./utils/GetTitulos";
import axios from 'axios';
import { Conteudo, Post } from './react-app-env';

function App() {
  //Create the api later

  const [conteudo, setConteudo] = useState<Conteudo>([{ titulo: "", conteudo: "", _id: "0", __v:0 }]);
  const [editingNow, setEditingNow] = useState<Post>(conteudo[0]);
  
  async function fetchData() {
    try {
      const { data } = await axios.get("/post");
      console.log(data)
      setEditingNow(data[0]);
      setConteudo(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // State of the post beeing edited

  const NewContentItemCreated = () => {
    //await axios.post("/post", )
    var UniqueNewPostTitle = "";
    const ArrayOftitulos = GetTitulos(conteudo);

    for (let i = 0; i < conteudo.length; i++) {
      const NewPostPossibility = `New Post ${i}.0`;

      if (!ArrayOftitulos.includes(NewPostPossibility)) {
        UniqueNewPostTitle = NewPostPossibility;
        break;
      }
    }

    let newConteudo = [
      ...conteudo,
      {
        _id: undefined,
        titulo: UniqueNewPostTitle,
        conteudo: "New frontiers, new opportunities",
        __v:0
        
      },
    ];
    setConteudo(newConteudo);
  };

  const clickedChild = (e:any) => {
    const ArrayOftitulos = GetTitulos(conteudo);
    const titulosDuplicados = ArrayOftitulos.filter(
      (tituloAtual:any) => tituloAtual === editingNow.titulo
    );
    if (titulosDuplicados.length > 1) {
      //Alertar o user sobre os titulo repetido
      console.log("deu rui men");
      return;
    }
    setEditingNow(conteudo[e]);
  };

  const postFoiEditado = (postEditado:Post) => {
    let novo = [...conteudo];
    novo[conteudo.indexOf(editingNow)] = postEditado;
    setEditingNow(postEditado);
    setConteudo(novo);
  };

  const saveChanges = () => {
    fetchData()
  }

  return (
    <div className=" h-screen w-screen overflow-hidden flex flex-row">
      <ContentBar
        conteudo={conteudo}
        clickedChild={clickedChild}
        NewContentItemCreated={NewContentItemCreated}
        saveChanges={saveChanges}
      />
      <Canva editingNow={editingNow} postFoiEditado={postFoiEditado} />
    </div>
  );
}

export default App;
