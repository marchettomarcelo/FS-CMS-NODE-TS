// var request = require('request');
import axios from "axios";
//---------------------------VENCEDOR---------------------------

export default async function StatusFinder( postTitle:string){

    let url = `https://cms-client.vercel.app/posts/${postTitle}`
    
    try{
        const { status } = await axios.get(url)

        return status

    }catch(e: any){

        return e.response.status
    }
    
    
}
