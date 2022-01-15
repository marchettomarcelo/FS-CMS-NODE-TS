import { Conteudo } from "../react-app-env";

export default function GetTitulo(conteudo:Conteudo){
  const Titulos = conteudo.map((post) => {
    return post.titulo;
  });

  return Titulos

}