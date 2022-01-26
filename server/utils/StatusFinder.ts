var request = require('request');
import axios from "axios";

export default async function StatusFinder( postTitle:string, requestInterval:number = 3000){

    let url = `https://cms-client.vercel.app/posts/${postTitle}`
    console.log(url)
    try{
        const { status } = await axios.get(url)
        console.log(status)
        return status

    }catch(e: any){
        console.log(e.response.status)

        setTimeout(()=>{
            return StatusFinder(postTitle)
        }, requestInterval)
    }
    
    
}