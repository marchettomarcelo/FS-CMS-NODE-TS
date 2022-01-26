var request = require('request');
import axios from "axios";

export default async function StatusFinder(requestInterval:number = 3000){

    try{
        const { status } = await axios.get("https://cms-client.vercel.app/posts/dois")
        console.log(status)
        return status

    }catch(e: any){
        console.log(e.response.status)

        setTimeout(()=>{
            return StatusFinder()
        }, requestInterval)
    }
    
    
}
//---------------------------VENCEDOR---------------------------
// request("https://cms-client.vercel.app/posts/um", (error:any, response:any)=>{
//         if(error){
//             return error
//         }
//         if(response.statusCode === 200){
//             console.log("pagina foi encontrada")
//             return "pagina foi encontrada"
//         }
//         if(response.statusCode ===404 ){
//             console.log("nao achou")

//             setTimeout(()=>{
//                 StatusFinder()
//             },requestInterval)
            
//         }
//     })