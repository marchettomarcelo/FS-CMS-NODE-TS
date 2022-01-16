
import './App.css';
import React, { useEffect, useState } from "react";
import Canva from "./components/Canva";
import ContentBar from "./components/ContentBar";
//import MockData from "./data";
import GetTitulos from "./utils/GetTitulos";
import UniqueNewPostTitle from "./utils/UniqueNewPostTitle";
import axios from 'axios';
import { Conteudo, Post } from './react-app-env';

function App() {
  //Create the api later

  const [conteudo, setConteudo] = useState<Conteudo>([{ titulo: "", conteudo: "", _id: "0", __v:0 }]);
  const [editingNow, setEditingNow] = useState<Post>({ titulo: "", conteudo: "", _id: "0", __v:0 });
  

  
  async function fetchData(conteudoIndex:number = 0, shouldSetEditingNow:boolean = true) {
    try {
      const newlyFetchedConteudo = await axios.get("/post");

      const dat:Conteudo = newlyFetchedConteudo.data
      const formatedNewlyFetchedConteudo:Conteudo = dat.map(({conteudo, _id, __v, titulo}:Post)=>{
        return {
          conteudo,
          _id,
          __v,
          titulo : titulo.replaceAll("-", " ")
        }

      })
      setConteudo(formatedNewlyFetchedConteudo);
      if(shouldSetEditingNow){
        setEditingNow(formatedNewlyFetchedConteudo[conteudoIndex]);
      } 
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // State of the post beeing edited
  const clickedChild = (e:any) => {
    const ArrayOftitulos = GetTitulos(conteudo);
    const titulosDuplicados = ArrayOftitulos.filter(
      tituloAtual => tituloAtual === editingNow.titulo
      );
      if (titulosDuplicados.length > 1) {
        //Alertar o user sobre os titulo repetido
        console.log("Altere o título do post atual para mudar de post. Não é possível ter post com títulos iguais");
        return;
      }
      setEditingNow(conteudo[e]);
    };


    const NewContentItemCreated = async () => {
      var titulo = UniqueNewPostTitle(GetTitulos(conteudo));
      try{
        await axios.post("/post", {
          titulo,
          conteudo: "New frontiers, new opportunities"
        })
      }catch(e){
        console.log(e)
        return
      }
      await fetchData(conteudo.length, true)

      // ChangeEditingNow(conteudo.length)

      // setEditingNow(conteudo[conteudo.length])
      // setEditingNow(conteudo[conteudo.length-1])
    };

  const postFoiEditado = (postEditado:Post) => {
    let novo = [...conteudo];
    novo[conteudo.indexOf(editingNow)] = postEditado;
    setEditingNow(postEditado);
    setConteudo(novo);
  };

  const saveChanges = async () => {

    try {
      await axios.patch("/update-posts", conteudo )
      const indexEditingNow = conteudo.indexOf(editingNow)
      fetchData(indexEditingNow)

    } catch (e) {
      console.log(e)
      return
    }
  }

  const deleteEditingNow = async () => {

    if (conteudo.length === 1){
      return
    }
    try {
      await axios.delete(`/post/${editingNow._id}`)
      fetchData()  
      
    } catch (e) {
      console.log(e)
      return
    }

  }

  return (
    <div className=" h-screen w-screen overflow-hidden flex p-4 flex-row">
      <ContentBar
        conteudo={conteudo}
        clickedChild={clickedChild}
        NewContentItemCreated={NewContentItemCreated}
        saveChanges={saveChanges}
      />
      <Canva editingNow={editingNow} postFoiEditado={postFoiEditado} deleteEditingNow={deleteEditingNow} />
    </div>
  );
}

export default App;
