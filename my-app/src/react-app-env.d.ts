/// <reference types="react-scripts" />

export interface Post{
    _id: string | undefined,
    path: string,
    info: string,
    __v: number,
    publishOnNextBuild: boolean
    HTMLContent:string
}

export type allPosts = Post[]

export interface ContentItemProps{
    info:string, 
    id:string, 
    path:string
    publishOnNextBuild:boolean
}

export interface CanvaProps{
    editingNow: Post, 
    postFoiEditado: (post:Post) => void,
    deleteEditingNow: ()=>void
}

export interface ContentBarProps{
    
    allPosts:allPosts,
    publishButtonState: string
    clickedChild: (childId:string)=>void,
    NewContentItemCreated:()=>void,
    saveChanges: ()=> void,
    publishWebsite:()=>void
    visitWebsite:()=>void
}

export type PossibleControlBarIds = "Save Changes"| "Create New Post"|string| "Publicar site"|"Visitar site"