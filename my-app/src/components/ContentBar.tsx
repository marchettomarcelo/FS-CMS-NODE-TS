import { useRef } from "react";
import { Conteudo, Post, ContentBarProps, PossibleControlBarIds  } from "../react-app-env";
import ContentItem from "./ContentItem";
import Controls from "./ControlBar";

export default function ContentBar({conteudo, clickedChild, NewContentItemCreated, saveChanges}: ContentBarProps) {

  const Conteudo: Conteudo = [...conteudo]

  const messagesEndRef = useRef<HTMLDivElement>(null);

  //------------------------Create new post function------------------------
  const CreateNewPost = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    NewContentItemCreated();
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // alerts the parent sends the id of the child if clicked
  const HandleClick = async (e:any) => {
    const ControlBarId:PossibleControlBarIds = e.target.id
    
    if (ControlBarId === "Create New Post") {
      CreateNewPost();
    } else if (ControlBarId === "Save Changes") {

      // ---make api later---
      saveChanges()

    } else if (ControlBarId) {
      return clickedChild(ControlBarId);
    }
  };

  
  return (
    <div
      className="flex flex-col justify-betweens w-3/12 h-11/12 gap-4"
      onClick={HandleClick}
    >
      <Controls />

      <div className="overflow-y-auto w-full overscroll-non grid gap-4">
        {Conteudo.map((post:Post, id:any) => {
          return (
            <ContentItem
              id={id.toString()}
              key={id}
              titulo={post.titulo}
              conteudo={post.conteudo}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
