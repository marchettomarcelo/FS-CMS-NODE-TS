import { Conteudo } from "../react-app-env";

export default function GetTitulos(conteudo:Conteudo) {
  const Titulos = conteudo.map((post) => {
    return post.titulo;
  });
  return Titulos;
}
