export interface Post{

    _id: string,
    titulo: string,
    conteudo: string,
    __v: number
}

export type Conteudo = Post[]


export interface ContentItemProps{
    conteudo:string, 
    id:string, 
    titulo:string
}

interface CanvaProps{
    editingNow: Post,
    postFoiEditado: (post: Post) =>void
}

export type PossibleControlBarIds = "Controls" | "Save Changes" | string



