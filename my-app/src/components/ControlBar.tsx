
import {PossibleControlBarIds } from "../react-app-env"

interface ControlButtonProps{
  id: PossibleControlBarIds,
  clas: string,
  nome: string
}

function ControlButton({id, clas, nome}: ControlButtonProps){
  return(
    <div
      id={id}
      className={clas}>
        
        <h3 id={id} className="text-xl font-bold text-center">
          {nome}
        </h3>
        
    </div>  
  )
}

export default function Controls({publishButtonState}:any) {

  const id1:PossibleControlBarIds = "Create New Post"
  const id2:PossibleControlBarIds = "Save Changes"
  const id3:PossibleControlBarIds = "Publicar site"
  const id4:PossibleControlBarIds = "Visitar site"


  let publishButton

  let but = publishButtonState

  if(but === "default"){
    publishButton = <ControlButton 
      id={id3} 
      clas="border-4 bg-orange-400 border-black border-solid 
      rounded shadow-lg  hover:bg-orange-500 justify-center
      active:bg-orange-600 cursor-pointer p-3 flex items-center"
      nome="Publicar Site"
    />

  }
  if(but === "loading"){
    publishButton = <ControlButton 
      id={id3} 
      clas="border-4 bg-red-600 border-black border-solid 
      rounded shadow-lg  hover:bg-red-500 justify-center
      cursor-pointer p-3 flex items-center"
      nome="Loading..."
    />

  }
  if(but === "success"){
    publishButton = <ControlButton 
      id={id3} 
      clas="border-4 bg-green-400 border-black border-solid 
      rounded shadow-lg  hover:bg-green-500 justify-center
      cursor-pointer p-3 flex items-center"
      nome="Sucesso!!!"
    />

  }
  


  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 justify-between  w-11/12">
      <ControlButton 
        id={id1} 
        clas="border-4 bg-[#E0A458] border-black border-solid 
        rounded shadow-lg  hover:bg-[#DC9941] justify-center
        active:bg-[#CF8626] cursor-pointer p-3 flex items-center"

        nome="Adicionar Post "
      />
      <ControlButton 
        id={id2} 
        clas="border-4 bg-[#81A3B1] border-black border-solid 
        rounded shadow-lg  hover:bg-[#6790A2]
        active:bg-[#557B8B] cursor-pointer justify-center flex items-center"
        
        nome="Salvar Mudanças"
      />
      
        <ControlButton
          id={id4} 
          clas="border-4  border-black border-solid 
          rounded shadow-lg  justify-center
          cursor-pointer p-3 flex items-center"
          nome="Visitar site"
        
        />
      
      
      {publishButton}

    </div>
  );
}
