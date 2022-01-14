import {ContentItemProps} from "../react-app-env"

export default function ContentItem({ conteudo, id, titulo }:ContentItemProps) {
  return (
    <div
      id={id}
      className="cursor-pointer border-4 border-black 
        border-solid m-2 p-2 rounded shadow-lg w-11/12 
        hover:bg-gray-200 active:bg-gray-300"
    >
      <h3 id={id} className="text-xl font-bold">
        {titulo.length > 20 ? titulo.slice(0, 20) + "..." : titulo}
      </h3>
      <p id={id} className="text-sm break-all">
        {conteudo.length > 80 ? conteudo.slice(0, 80) + "..." : conteudo}
      </p>
    </div>
  );
}
