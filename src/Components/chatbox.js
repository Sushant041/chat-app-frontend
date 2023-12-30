import React, { useEffect, useState } from "react";
import { usechatContext } from "./context/chatcontext";
import axios from "axios";
import { Scrollchat } from "./scrollchat";
import io from "socket.io-client"
import {getSender }from "./chatlogics"



// const ENDPOINT = "https://chat-jzip.onrender.com"
const ENDPOINT = "https://chat-jzip.onrender.com/"
 let socket, selectedChatCompare;

export const Chatbox = () => {

  const [newmessage, setNewMessage] = useState("");
  const [message, setMessage] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false)
  const [typing , setTyping] = useState(false)
  const [istyping, setIsTyping] = useState(false)

  const { selectedChat, setSelectedChat, notification, setNotification } = usechatContext();

  const user = JSON.parse(localStorage.getItem('token'));

  const fetchAllmessages = async () => {

    if (!selectedChat) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.authtoken}`,
        },
      };

      const { data } = await axios.get(
        `https://chat-jzip.onrender.com/api/message/${selectedChat._id}`,
        config
      );

      setMessage(data);
      console.log(data);
      socket.emit("join chat", selectedChat._id);

    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);


  useEffect(() => {

    fetchAllmessages();
    selectedChatCompare = selectedChat

  }, [selectedChat]);

  useEffect(() => {

    socket.on("message received", (newMessageReceived) => {
 
    
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
          if(!notification.includes(newMessageReceived)){
            setNotification([newMessageReceived, ...notification]);
            fetchAllmessages();
          }
      } 
      else {
        setMessage([...message, newMessageReceived]);
      }
    });
    
  });
  

 
  const sendMessage = async (e) => {

    if (e.key === "Enter" && newmessage) {
      socket.emit("stop typing", selectedChat._id)
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.authtoken}`,
          },
        };
        
        setNewMessage("");
        const { data } = await axios.post(
          "https://chat-jzip.onrender.com/api/message",
          {
            content: newmessage,
            chatId: selectedChat._id,
          },
          config
        );
        socket.emit("new message", data)
        setMessage([...message, data]);
      } catch (error) {
        alert(error);
      }
    }
  };


  const sendMessage2 = async (e) => {

    if (newmessage) {
      socket.emit("stop typing", selectedChat._id)
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.authtoken}`,
          },
        };
        
        setNewMessage("");
        const { data } = await axios.post(
          "https://chat-jzip.onrender.com/api/message",
          {
            content: newmessage,
            chatId: selectedChat._id,
          },
          config
        );
        socket.emit("new message", data)
        
        setMessage([...message, data]);
      }
       catch (error) {
        alert(error);
      }
    }
  };

  

  const typinghandler = (e) =>{
    setNewMessage(e.target.value)

    if(!socketConnected) return;

    if(!typing){
      setTyping(true);
      socket.emit("typing", selectedChat._id)
    }

    let lastTypingtime = new Date().getTime();
    let timelength = 3000;
    setTimeout(() =>{
      let timenow = new Date().getTime();
      let timediff = timenow - lastTypingtime;

      if(timediff >= timelength && typing){
        socket.emit("stop typing", selectedChat._id)
        setTyping(false);
      }
    }, timelength)
  }


  let width = window.screen.width;

  return (width >= "750" || selectedChat) && (
    <div
      className="d-flex chatbox flex-column align-items-center justify-content-center"
    >
      <div className="d-flex align-items-center justify-content-between" style={{width: "100%", marginTop: "14px"}}>
              {selectedChat && selectedChat.isGroupChat ? (
          <div className="" style={{ fontSize: "28px", opacity: ".8" }}>
            {selectedChat.chatName.toUpperCase()}
          </div>
        ) : ( 
          <div className="mx-3" style={{ fontSize: "20px" }}>
            {selectedChat &&
            <img src={ 
                selectedChat.users[1]._id === user._id ? selectedChat.users[0].pic : selectedChat.users[1].pic
              } className="mx-3" style={{ width: "30px", height: "30px", borderRadius: "50%"}} alt="user img" />}

            {getSender(selectedChat, user)}
          </div>
        )}
         { (width <= "750" && selectedChat) && (<button className="btn btn-primary seacrchbtn me-3 mt-2" onClick={() => setSelectedChat()}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
           <span className="ms-2">Back</span>
         </button>
         )}
      </div>
      {selectedChat ?  <div
        className="mt-3 p-2 scchat"
        style={{
          backgroundColor: "#e9e9e9",
          width: "100%",
          height: "80%",
          overflowY: "auto",
          scrollbarWidth: "none",
          wordWrap: "break-word",
        }}
      >   
          <Scrollchat message={message} />
   
         </div>
         
       : 
        <div className="d-flex flex-column align-items-center justify-content-center" style={{height: "90%"}}>
          <span className="px-2" style={{fontSize: "2rem", opacity: ".7"}}>
            Select Someone to Chat
          </span>
          <lottie-player
           src="https://lottie.host/97c6c8d8-a671-476e-a853-2e1d9a7cdea7/Caqq88HQr0.json"
            background="#fff" speed="1" style={{width: "200px", height: "200px", marginTop: "3%"}}
             direction="1" mode="normal" loop autoplay>
             </lottie-player>
        </div>
       }
       
       { selectedChat &&
        <div
        className="mb-3 px-3"
        style={{ width: "100%", marginTop: "2%", position: "relative" }}
      >
        {
          istyping ?  <div className="mb-3" style={{borderRadius: "7px", backgroundColor: "white", textAlign: "center", width: "80px"}}>
            typing....
          </div>
           : <> </>
        }
           <div className="d-flex">
              <input
                type="text"
                className="form-control mesinp"
                required
                placeholder="Enter Message"
                onKeyDown={sendMessage}
                value={newmessage}
                onChange={typinghandler}
                style={{ width: "100%", paddingRight: "50px"}}
              />
              <button className="sendButton" 
              style={{border: "none", marginLeft: "-40px", marginTop: "10px", background: "none", fontSize: "20px", opacity: ".7"}}
               onClick={sendMessage2}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
       }
      
    </div>
  ) 

};
