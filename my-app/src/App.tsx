
import './App.css';
import React,  { useEffect, useState } from "react";
import Canva from "./components/Canva";
import ContentBar from "./components/ContentBar";
//import MockData from "./data";
import GetTitulos from "./utils/GetTitulos";
import UniqueNewPostTitle from "./utils/UniqueNewPostTitle";
import axios from 'axios';
import { Conteudo, Post } from './react-app-env';
import loadingSVG from "./assets/loadingSVG.svg"
import Sleep from "./utils/Sleep"
import useWindowDimensions from './utils/Dimensions';
import SideBar from './components/SideBar';

function App() {
  //Create the api later

  const [conteudo, setConteudo] = useState<Conteudo>([{ titulo: " ", conteudo: "", _id: "0", __v:0, publishOnNextBuild: false }]);
  const [editingNow, setEditingNow] = useState<Post>({ titulo: "", conteudo: "", _id: "0", __v:0, publishOnNextBuild: false });
  const [loading, setLoading] = useState<boolean>(false)
  const [publishButtonState, setPublishButtonState] = useState<"loading"|"default"|"success">("default")
  
  const [sideMenu, setSideMenu] = useState<boolean>(true)
  
  async function fetchDataAndSetEditingNow(conteudoIndex:number = 0) {
    try {
      setLoading(true)

      const {data} = await axios.get("/post");
      const newlyFetchedConteudo:Conteudo = data
      const formatedNewlyFetchedConteudo:Conteudo = newlyFetchedConteudo.map(({conteudo, _id, __v, titulo, publishOnNextBuild}:Post)=>{
        
        return {
          publishOnNextBuild,
          conteudo,
          _id,
          __v,
          titulo : titulo.replaceAll("-", " ")
        }

      })
      setConteudo(formatedNewlyFetchedConteudo);
      setEditingNow(formatedNewlyFetchedConteudo[conteudoIndex]);
      setLoading(false)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchDataAndSetEditingNow();
  }, []);


  const saveChanges = async () => {
    setLoading(true)
    try {
      await axios.patch("/update-posts", conteudo )
      const indexEditingNow = conteudo.indexOf(editingNow)
      fetchDataAndSetEditingNow(indexEditingNow)
    } catch (e) {
      console.log(e)
      return
    }
  }

  // State of the post beeing edited
  const clickedChild = (e:any) => {
    //add save changes later manin
    const ArrayOftitulos = GetTitulos(conteudo);
    const titulosDuplicados = ArrayOftitulos.filter(
      tituloAtual => tituloAtual === editingNow.titulo
      );
      if (titulosDuplicados.length > 1) {
        //Alertar o user sobre os titulo repetido
        console.log("Altere o título do post atual para mudar de post. Não é possível ter post com títulos iguais");
        return;
      }
      console.log(conteudo[e])
      setEditingNow(conteudo[e]);
    };


    const NewContentItemCreated = async () => {
    await saveChanges()
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
      fetchDataAndSetEditingNow(conteudo.length)
    };

  const postFoiEditado = (postEditado:Post) => {
    let novo = [...conteudo];
    novo[conteudo.indexOf(editingNow)] = postEditado;
    setEditingNow(postEditado);
    setConteudo(novo);
  };



  const deleteEditingNow = async () => {
    await saveChanges()
    if (conteudo.length === 1){
      return
    }
    try {
      await axios.delete(`/post/${editingNow._id}`)
      
      const index = conteudo.indexOf(editingNow)
      fetchDataAndSetEditingNow(index === 0 ? 0 :  index -1)
    } catch (e) {
      console.log(e)
      return
    }
  }

  const publishWebsite = async ()=>{
    if(publishButtonState === "loading" || publishButtonState === "success" ){
      return
    }
    setPublishButtonState("loading")
    const data = await axios.get("/publish-website")
    console.log(data)
    setPublishButtonState("success")
    await Sleep(5000)
    setPublishButtonState("default")

  }

  const visitWebsite = async ()=>{
    window.open("https://cms-client.vercel.app/posts")
  }

  const toggleSideMenu = ()=>{
    setSideMenu(!sideMenu)
  }

  
  const { width } = useWindowDimensions()

  const mainDivStyle = width < 600 && sideMenu? 
  `h-[90vh] xl:h-screen w-screen 
  overflow-hidden flex 
  p-4 pr-0
  xl:p-4 flex-row` : 
  `h-[90vh] xl:h-screen w-screen 
  overflow-hidden flex 
  p-4 
  xl:p-4 flex-row`

  return (
    <>
      {loading && 
        <div className="h-screen w-screen backdrop-blur-sm absolute z-50 flex items-center justify-center"> 
          <img src={loadingSVG} alt="loading" className="w-1/6"/>
        </div>}
    
        <div className={mainDivStyle}>   
            
          
          <SideBar toggleSideMenu={toggleSideMenu}/>
        
          { 
          
          sideMenu && <ContentBar
            visitWebsite={visitWebsite}
            publishWebsite={publishWebsite}
            publishButtonState={publishButtonState}

            conteudo={conteudo}
            clickedChild={clickedChild}
            NewContentItemCreated={NewContentItemCreated}
            saveChanges={saveChanges}
          />
          }
          <Canva 

          editingNow={editingNow} 
          postFoiEditado={postFoiEditado} 
          deleteEditingNow={deleteEditingNow} 
          sideMenu={sideMenu}
          
          />



      </div>
    
    </>
  );
}

export default App;
