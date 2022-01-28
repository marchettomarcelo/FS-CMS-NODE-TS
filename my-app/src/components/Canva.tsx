import { useEffect, useState } from "react";
import { Post, CanvaProps } from "../react-app-env";
import SwitchItem from "./SwitchItem"


export default function Canva({editingNow, postFoiEditado, deleteEditingNow }: CanvaProps) {
  //State of the post being currently edited
  const [editingNowInCanva, setEditingNowInCanva] = useState<Post>({
    _id: undefined,
    titulo: "",
    conteudo: "",
    __v:0,
    publishOnNextBuild: false
  });

  //Informing the canva component of the values of the post being edited
  useEffect(() => {
    setEditingNowInCanva(editingNow);
  }, [editingNow]);

  //notifiing parent component of changes on the current post
  const HandleTypeChanges = async (e:any) => {
    let novo = {
      ...editingNowInCanva,
      [e.target.id]: e.target.value,
    };
    postFoiEditado(novo);
    setEditingNowInCanva(novo);
  };

  const HandleSwitchChanges = (SwitchValue:boolean)=>{

    let novo = {
      ...editingNowInCanva,
      publishOnNextBuild: SwitchValue 
    };
    postFoiEditado(novo);
    setEditingNowInCanva(novo);

  }

  return (
    <div
      className="flex flex-col border-4 border-black border-solid 
    w-9/12  h-11/12 rounded shadow-2xl gap-4"
    >
      <div className=" overflow-y-auto  m-4 overscroll-non">
        <textarea
          className="text-5xl font-extrabold  p-2 w-full
          border border-solid border-gray-300 rounded
          focus:bg-white focus:border-gray-600 focus:outline-none
          transition
          ease-in-out"
          name="titulo"
          id="titulo"
          rows={2}
          value={editingNowInCanva.titulo ? editingNowInCanva.titulo: " "}
          onChange={HandleTypeChanges}
        />
        
        <textarea          
          className="text-2xl font-sans  p-2 w-full whitespace-pre-wrap indent-8
          border border-solid border-gray-300 rounded
          focus:bg-white focus:border-gray-600 focus:outline-none
          transition
          ease-in-out"
          name="conteudo"
          id="conteudo"
          rows={5}
          onChange={HandleTypeChanges}
          value={editingNowInCanva.conteudo?editingNowInCanva.conteudo: " " }
        />
      </div>
      
      <div className=" bg-gray-300 border-t-4 mx-0 border-solid border-black h-20 w-full items-center p-4
      flex bottom-1 mt-auto">
      
      
        <h1 className="mr-4 text-lg font-bold">Publicar <br /> este Post</h1>
        <SwitchItem 
        HandleSwitchChanges={HandleSwitchChanges}
        publishOnNextBuild={editingNowInCanva.publishOnNextBuild} 
        />


  

        <img src={require("../assets/X-cross.png")} 
        alt="Close icon" 
        className="w-14 h-14 cursor-pointer ml-auto"
        onClick={deleteEditingNow}
        />

      </div>
      
    </div>
  );
}
