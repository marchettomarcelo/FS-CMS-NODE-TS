import { useRef } from "react";
import { Conteudo, Post, ContentBarProps, PossibleControlBarIds  } from "../react-app-env";
import ContentItem from "./ContentItem";
import Controls from "./ControlBar";

export default function ContentBar({
  visitWebsite,
  conteudo, clickedChild, 
  NewContentItemCreated, saveChanges, 
  publishWebsite, publishButtonState}: ContentBarProps) {

  const Conteudo: Conteudo = [...conteudo]

  const messagesEndRef = useRef<HTMLDivElement>(null);

  //------------------------Create new post function------------------------
  const CreateNewPost = () => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    NewContentItemCreated();
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // alerts the parent sends the id of the child if clicked
  const HandleClick = async (e:any) => {
    const ControlBarId:PossibleControlBarIds = e.target.id
    
    if (ControlBarId === "Create New Post") {
      CreateNewPost();
    } else if (ControlBarId === "Save Changes") {
      saveChanges()
    } else if( ControlBarId === "Publicar site") {
      publishWebsite()

    } 
    else if( ControlBarId === "Visitar site") {
      visitWebsite()
    }
    else if (ControlBarId){
      
      return clickedChild(ControlBarId);
    }
  };

  
  return (
    <div
      className="xl:flex xl:flex-col xl:justify-betweens xl:w-contbar relative  h-11/12 gap-4"
      onClick={HandleClick}
    >
      <Controls publishButtonState={publishButtonState}/>

      <hr className=" h-1 border border-black rounded-sm w-11/12 my-2 bg-black "/>
      

      <div className="overflow-y-auto w-full overscroll-non grid gap-4">
        {Conteudo.map((post:Post, id:any) => {
          return (
            <ContentItem
              id={id.toString()}
              key={id}
              titulo={post.titulo}
              conteudo={post.conteudo}
              publishOnNextBuild={post.publishOnNextBuild}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
