import {PossibleControlBarIds} from "../react-app-env"

export default function Controls() {

  const id1:PossibleControlBarIds = "Create New Post"
  const id2:PossibleControlBarIds = "Save Changes"
  
  return (
    <div className="flex flex-col gap-4 xl:flex-row justify-between  w-11/12">
      <div
        id="Controls"
        className="border-4 bg-green-400 border-black border-solid 
          rounded shadow-lg  hover:bg-green-500 
          active:bg-green-600 cursor-pointer p-3 
          "
      >
        <h3 id={id1} className="text-2xl font-bold text-center">
          Adicionar post
        </h3>
      </div>

      <div
        id="save"
        className="border-4 bg-blue-400 border-black border-solid 
           rounded shadow-lg  hover:bg-blue-500 
          active:bg-blue-600 cursor-pointer p-3 "
      >
        <h3 id={id2} className="text-2xl font-bold text-center">
          Salvar Mudanças
        </h3>
      </div>
    </div>
  );
}
