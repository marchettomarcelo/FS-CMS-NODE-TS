// var request = require('request');
import axios from "axios";
//---------------------------VENCEDOR---------------------------

export default async function StatusFinder( postTitle:string){

    let url = `https://cms-client.vercel.app/posts/${postTitle}`
    console.log(url)
    try{
        const { status } = await axios.get(url)
        console.log(status)
        return status

    }catch(e: any){
        console.log(e.response.status)
        return e.response.status
    }
    
    
}
