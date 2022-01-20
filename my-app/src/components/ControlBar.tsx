import {PossibleControlBarIds } from "../react-app-env"

interface ControlButtonProps{
  id: PossibleControlBarIds,
  clas: string,
  nome: string
}

function ControlButton({id, clas, nome}: ControlButtonProps){
  
  return(
    <div
      id="Controls"
      className={clas}>

        <h3 id={id} className="text-xl font-bold text-center">
          {nome}
        </h3>
    </div>  
  )
}

export default function Controls() {

  const id1:PossibleControlBarIds = "Create New Post"
  const id2:PossibleControlBarIds = "Save Changes"
  const id3:PossibleControlBarIds = "Publicar site"

  return (
    <div className="grid grid-cols-2 gap-4 xl:flex-row justify-between  w-11/12">
      <ControlButton 
        id={id1} 
        clas="border-4 bg-green-400 border-black border-solid 
        rounded shadow-lg  hover:bg-green-500 
        active:bg-green-600 cursor-pointer p-3 flex items-center"

        nome="Adicionar Post "
      />
      <ControlButton 
        id={id2} 
        clas="border-4 bg-blue-400 border-black border-solid 
        rounded shadow-lg  hover:bg-blue-500 
        active:bg-blue-600 cursor-pointer p-3 flex items-center"
        
        nome="Salvar Mudanças"
      />
      <ControlButton 
        id={id3} 
        clas="border-4 bg-orange-400 border-black border-solid 
        rounded shadow-lg  hover:bg-orange-500 
        active:bg-orange-600 cursor-pointer p-3 flex items-center"
        nome="Publicar Site"
      />


    </div>
  );
}
