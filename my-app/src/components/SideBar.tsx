import React from "react";

export default function SideBar({toggleSideMenu}:any){
    return(
        <div className="
            p-2 text-center min-w-fit
            h-11/12 w-side
            mr-6  rounded border-black border-4 bg-slate-400">
            <button
            onClick={()=> toggleSideMenu()}
            > 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            
            
            </button>
        </div>)
}