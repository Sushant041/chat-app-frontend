import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import Drawer from './drawer';
import { Userlist } from './uselist';
import { Chatloading } from './chatloading';
import axios from "axios"
import { usechatContext } from "./context/chatcontext"
import {getSender }from "./chatlogics"



export const Sidedrawer = () => {

  const { user, setSelectedChat, notification, setNotification } = usechatContext()


 let modal = document.getElementById("myModal");


  const [show, setShow] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [shownot, setShownot] = useState(false);


  const closeModel = () => {
    setShow(false)
  }
  
  window.onclick = (event) => {
    if (event.target === modal) {
        setShow(false)
    }
  }

    let navigate = useNavigate();

    const logout = () => {
         localStorage.removeItem("token");
         setSelectedChat();
         navigate("/")
    }

      const myprofile = () =>{
         setShow(true);
    }

    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)


    const handleClick = async () =>{
       
      try {
        setLoading(true);
      
        const config = {
          headers: {
            Authorization: `Bearer ${user.authtoken}`,
          },
          params: {
            search: search,
          },
        };
      
        const response = await axios.get("https://chat-jzip.onrender.com//api/user/allusers", config);
      
        setLoading(false);
        setSearchResult(response.data);
      } catch (error) {
        setLoading(false);
        alert(error);
      }
      
    }

    const accessChat = async (userId) =>{
        
      try {
  
  
         const config = {
          headers: {
            "Content-type" : "application/json",
            Authorization: `Bearer ${user.authtoken}`,
          },
        };
  
        const {data} = await axios.post("https://chat-jzip.onrender.com//api/chat", { userId }, config);
         setSelectedChat(data[0]);

         console.log(data)
  
      } catch (error) {
        alert(error);
      }
    }
    

    const shownoti = () =>{
      setShownot(!shownot);
    }


  return (

    <div  className=" d-flex justify-content-center" style={{width: "100vw", backgroundColor: "#0d6efd" }} >

    <div className="d-flex my-2 justify-content-between" style={{width: "95vw" }}>

       <div className="app">
           <button onClick={() => setIsOpen(!isOpen)} className="form-control seacrchbtn ms-0" type="search">
              <i className="fa-solid fa-magnifying-glass mx-2"></i>
                Search Users
            </button>

            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>

                <p style={{fontSize: "1.3rem"}}>Search Users
                <button onClick={() => setIsOpen(!isOpen)} className="btn btn-primary m-3">
                       close
                      </button>
                </p>

              
              <div className='d-flex'>
                <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="name"
                        placeholder="Search here"
                         onChange={(e) =>{setSearch(e.target.value)}}
                        required
                    />
                    <button onClick={handleClick} className='ms-3 btn btn-secondary' style={{backgroundColor: "#0d6efd"}}>Go</button>
                    </div>

                    

                { loading  ?

                    (
                       <Chatloading/>
                    ) 
                   :
                       searchResult.map((u) =>{
                            return <Userlist
                             key={u._id} u={u}
                             handleClick={() => accessChat(u._id)}
                             />
                        },
                         )   
                     
                 }

            </Drawer>
       </div>


    <div className="display-6 slideheading" style={{opacity: ".8", color: "white"}}>
        Let's Talk
        </div>


       <div className='d-flex align-items-center' style={{position: "relative"}}>
        
        <div className="d-flex align-items-center flex-column">
         <i className="fa fa-bell p-2 mx-3  notif" aria-hidden="true"
          style={{backgroundColor: "white", borderRadius: "50%"}}
          onClick={() => shownoti()}></i>
          
         {!notification.length && <div className='hide px-3 my-4'
          style={{position: "absolute", zIndex: "3", display: shownot ? "flex": "none", backgroundColor :"white", borderRadius: "5px", border: "2px solid black"}}>
            No new messages
            </div>
            }

          { notification.length > 0 && <div className="d-flex justify-content-center  align-items-center" style={{position: "absolute", right: "89px", top: 0, zIndex: "4", background: "red", color: "white", width: "15px", height: "15px", borderRadius : "50%", fontSize: "12px", padding: "8px"}}>
                {notification.length}
            </div>
            }
          { notification.map((n) =>{
             return <div className='hide mx-5' style={{position: "absolute", zIndex: "3", display: shownot ? "flex": "none", backgroundColor :"white", borderRadius: "5px", border: "2px solid black"}}
              key={n._id} onClick={() =>{setSelectedChat(n.chat)
              setNotification(notification.filter((x) => x !== n))}}
               >
                 {
                  n.chat.isGroupChat ? 
                  `New Message in ${n.chat.chatName}` :
                  `New Message from ${getSender(n.chat, user)}`
                 }
              </div>
            })
          }
          
         </div>

        <div className="dropdown">
        <button className="btn btn-light sldrp dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img style={{width: "30px", height: "30px", borderRadius: "50%"}} className='mx-1' src={user.pic} alt="" />
        </button>
        <ul className="dropdown-menu">
            <li><button className="dropdown-item" id="myBtn" onClick={myprofile}>My Profile</button></li>
            <li><button className="dropdown-item"  onClick={logout}>Logout</button></li>
        </ul>
        </div>
        </div>
    </div>


    <div id="myModal" style={{display: show ? "block" : "none"}} className="modal">

        <div className="modal-content d-flex justify-content-center">

          <span className="close" onClick={closeModel}>&times;</span>

          <div className='mcontent'>
          <p className='display-5 d-flex justify-content-center align-items-center '>{user.name}</p>
          <div className='d-flex justify-content-center align-items-center'>
            <img style={{width: "200px", height: "200px", borderRadius: "50%", border: "2px solid #b4b4b4"}} src={user.pic} alt="" />
          </div>
            <div className='d-flex my-3 flex-column align-items-center justify-content-center'  style={{fontSize: "30px", backgroundColor: "rgb(235 235 235)", borderRadius: "8px"}}>
               Email : {user.email}
            </div>
          </div>
       </div>

      </div>

    
        
    </div>
  )
} 
