import React from "react";
import {Link} from "react-router-dom"



export const Home = () => {
 
  let userinfo = JSON.parse(localStorage.getItem("token"));


   return (
    <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "100vh", width: "100vw", background: "-webkit-linear-gradient(left, #003366,#004080,#0059b3, #0073e6)" }}
      >
      <div className="mt-5 typewriter flex-column d-flex align-items-center" style={{color: "white"}}>
       <h1 className="display-3">
        Welcome to Chat App
        </h1>
        <div className="my-3">
            {!userinfo && <Link className="btn btn-primary" style={{width: "180px", fontSize: "24px"}} to="/linsup">Let's Talk</Link>}
            {userinfo && <Link className="btn btn-primary" style={{width: "180px", fontSize: "24px"}} to="/chat">Let's Talk</Link>}
        </div>
        </div>
          <div className="mt-5 d-flex justify-content-around homelottie">
            <div className="lt1">
            <lottie-player src="https://lottie.host/a1645b95-9b80-44bd-959b-80bd2ad28452/sFxlUrGAjO.json"
             speed="1" style={{width: "500px", height: "500px"}} direction="1" mode="normal" loop autoplay>
             </lottie-player>
             </div>
              <div className="lt2">
            <lottie-player  src="https://lottie.host/2a0156bc-353a-40df-b089-c2ec2dca22ed/IfKvUU5ePU.json"
            speed="1" direction="1" mode="normal" loop autoplay>
            </lottie-player>
            </div>
     </div>
    </div>
   )
};
