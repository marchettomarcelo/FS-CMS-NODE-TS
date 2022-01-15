
export default function UniqueNewPostTitle(ArrayOftitulos: string[] ){
    let UniqueNewPostTitle = "";
    for (let i = 0; i < ArrayOftitulos.length+1; i++) {
        const NewPostPossibility = `New Post ${i}.0`;
  
        if (!ArrayOftitulos.includes(NewPostPossibility)) {
          UniqueNewPostTitle = NewPostPossibility;
          break;
        }
    }
    
    return UniqueNewPostTitle
}