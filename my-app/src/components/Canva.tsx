// import { CanvaProps } from "../react-app-env";
import { Post } from "../react-app-env";
import SwitchItem from "./SwitchItem"
import useWindowDimensions from "../utils/Dimensions"

interface CanvaProps{
  editingNow: Post,
  postFoiEditado: (post: Post) =>void
  deleteEditingNow: ()=>void
  sideMenu:boolean,
}

export default function Canva({editingNow, postFoiEditado, deleteEditingNow, sideMenu }: CanvaProps) {
  
  
  //notifiing parent component of changes on the current post
  const HandleTypeChanges = (e:any) => {
    let novo = {
      ...editingNow,
      [e.target.id]: e.target.value,
    };
    postFoiEditado(novo);
    // setEditingNowInCanva(novo);
  };
  
  const HandleSwitchChanges = (SwitchValue:boolean)=>{
    let novo = {
      ...editingNow,
      publishOnNextBuild: SwitchValue 
    };
    postFoiEditado(novo);
  }

  const { width } = useWindowDimensions()

  
  const cla = `hidden w-full`
  

  // console.log(editingNow)
  return (
    <div
      className={`flex flex-col 

    ${width < 600 && sideMenu && cla}
      border-4 border-black 
      border-solid w-full  h-11/12 rounded shadow-2xl gap-4`}
    >
      <div className=" overflow-y-auto m-4 overscroll-non">
        <textarea
          className="text-5xl font-extrabold  p-2 w-full
          border border-solid border-gray-300 rounded
          focus:bg-white focus:border-gray-600 focus:outline-none
          transition
          ease-in-out"
          name="titulo"
          id="titulo"
          rows={2}
          value={editingNow.titulo}
          
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
          value={editingNow.conteudo }
        />
      </div>
      
      <div className=" bg-[#EDE1D4] border-4 m-2 border-solid border-black rounded h-20 w-auto items-center p-4
      flex bottom-1 mt-auto">
      
      
        <h1 className="mr-4 text-lg font-bold">Publicar <br /> este Post</h1>
        <SwitchItem 
        HandleSwitchChanges={HandleSwitchChanges}
        publishOnNextBuild={editingNow.publishOnNextBuild} 
        />
      
        <svg xmlns="http://www.w3.org/2000/svg" 
        className="w-12 h-12 cursor-pointer ml-auto " 
        onClick={deleteEditingNow}
        fill="none" viewBox="0 0 24 24" stroke="#ff000d">
          <path  onClick={deleteEditingNow} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>


      </div>
      
    </div>
  );
}
