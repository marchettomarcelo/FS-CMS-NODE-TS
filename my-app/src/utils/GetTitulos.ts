import { allPosts } from "../react-app-env";

export default function GetTitulo(conteudo:allPosts){
  const Titulos = conteudo.map((post) => {
    return post.path;
  });

  return Titulos

}