import { usechatContext } from "./context/chatcontext"
import { Mychats } from "./mychats";
import { Sidedrawer } from "./sidedrawer";
import { Chatbox } from "./chatbox";
import {useNavigate} from "react-router-dom"
// import { useState } from "react";
import React  from 'react';


export const Chat = () => {
  

let navigate = useNavigate()

   const { user } = usechatContext();


   const info =  localStorage.getItem("token") 

   if(!info){
    navigate("/")
   }


  return (
    <div
      className=" bg-dark d-flex flex-column align-items-center "
      style={{ height: "100vh", width: "100vw" }}
    >
      {user && <Sidedrawer user={user}/>}

      <div className="d-flex justify-content-center" style={{width: "100%", height: "100%"}}>
        { user &&
        <Mychats />
        }

      {   user &&    
      <Chatbox/>
     }     
      </div>

      

    </div>
  )
} 
