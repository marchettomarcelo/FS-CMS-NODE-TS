import { useEffect, useState } from "react";
import { Post, CanvaProps } from "../react-app-env";


export default function Canva({editingNow, postFoiEditado }: CanvaProps) {
  //State of the post being currently edited
  const [editingNowInCanva, setEditingNowInCanva] = useState<Post>({
    _id: undefined,
    titulo: "",
    conteudo: "",
    __v:0
  });

  //Informing the canva component of the values of the post being edited
  useEffect(() => {
    setEditingNowInCanva(editingNow);
  }, [editingNow]);

  //notifiing parent component of changes on the current post
  const HandleChange = async (e:any) => {

    let novo = {
      ...editingNowInCanva,
      [e.target.id]: e.target.value,
    };
    postFoiEditado(novo);
    setEditingNowInCanva(novo);
  };

  return (
    <div
      className="flex flex-col border-4 border-black border-solid 
    w-9/12 h-11/12 my-4 mr-4 rounded shadow-2xl p-4 gap-4"
    >
      <textarea
        className="text-5xl font-extrabold  p-2
        border border-solid border-gray-300 rounded
        focus:bg-white focus:border-gray-600 focus:outline-none
        transition
        ease-in-out"
        name="titulo"
        id="titulo"
        rows={2}
        value={editingNowInCanva.titulo}
        onChange={HandleChange}
      />
      <textarea
        className="text-2xl font-extrabold  p-2
        border border-solid border-gray-300 rounded
        focus:bg-white focus:border-gray-600 focus:outline-none
        transition
        ease-in-out"
        name="conteudo"
        id="conteudo"
        rows={5}
        onChange={HandleChange}
        value={editingNowInCanva.conteudo}
      />
    </div>
  );
}
