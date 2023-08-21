import React, { useState } from "react";
import { Signup } from "./signup";
import { Login } from "./login";




export const Home = () => {

  
  const [showl, setShowl] = useState(true);
  const [shows, setShows] = useState(false);
 
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center "
      style={{ height: "100vh", background: "-webkit-linear-gradient(left, #003366,#004080,#0059b3, #0073e6)" }}
    >
      <div       className="d-flex flex-column align-items-center justify-content-center "
         style={{ height: "500px", width: "380px", backgroundColor: "white", borderRadius: "50px 5px" }}>

        <div className="container">
          <ul className="nav nav-tabs d-flex justify-content-center">
            <li style={{ width: "50%" }} className="nav-item my-3">
              <div
                style={{ borderRadius: "20px", textAlign: "center",
                background: showl? "-webkit-linear-gradient(left, #003366,#004080,#0059b3, #0073e6)" : "white",
                color: showl ? "white" : "", cursor: "pointer", border: shows ? "2px solid blue" : "", height: "47px" }}
                className={showl ? "nav-link active" : "nav-link"}
                aria-current="page"
                onClick={() => {setShowl(true);
                               setShows(false);  }}
              >
                Log In
              </div>
            </li>
            <li style={{ width: "50%"}} className="nav-item my-3">
              <div
                style={{ borderRadius: "20px", textAlign: "center",
                background: shows? "-webkit-linear-gradient(left, #003366,#004080,#0059b3, #0073e6)" : "white",
                color: shows ? "white" : "", cursor: "pointer", border: !shows ? "2px solid blue" : "", height: "47px" }}
                className={shows ? "nav-link active" : "nav-link"}
                aria-current="page"
                onClick={() => {
                  setShows(true); setShowl(false);
                }}
              >
                Sign Up
              </div>
            </li>
          </ul>
        </div>

       
        {/*=================== Login form ============*/}
      
        {showl && <Login/>}

        {/*=================== SignUp form ============*/}
        {shows && <Signup/>}

      </div>
    </div>
  );
};
