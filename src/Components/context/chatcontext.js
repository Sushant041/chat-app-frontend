import {createContext, useContext, useEffect, useState} from "react"
import React  from 'react';

const ChatContext = createContext()


const ChatProvider = ({children}) =>{
    

    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([])
    const [notification, setNotification] = useState([])
    

    useEffect(() =>{
        // console.log(JSON.parse(localStorage.getItem("token")))
        let userinfo = JSON.parse(localStorage.getItem("token"));
       
        setUser(userinfo);        

    }, [])

    // console.log(user)
    
    
    

    return( <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, notification, setNotification }}>
        {children}
    </ChatContext.Provider>)
}

export const usechatContext = () =>{

    return useContext(ChatContext);
}


export default ChatProvider;