/// <reference types="react-scripts" />

export interface Post{
    _id: string | undefined,
    titulo: string,
    conteudo: string,
    __v: number,
    publishOnNextBuild: boolean
}

export type Conteudo = Post[]

export interface ContentItemProps{
    conteudo:string, 
    id:string, 
    titulo:string
}

export interface CanvaProps{
    editingNow: Post, 
    postFoiEditado: (post:Post) => void,
    deleteEditingNow: ()=>void
}

export interface ContentBarProps{
    conteudo:Conteudo,
    publishButtonState: string
    clickedChild: (childId:string)=>void,
    NewContentItemCreated:()=>void,
    saveChanges: ()=> void,
    publishWebsite:()=>void
}

export type PossibleControlBarIds = "Save Changes"| "Create New Post"|string| "Publicar site"|"Visitar site"