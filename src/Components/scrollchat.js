import React from 'react'
import ScrollableFeed from "react-scrollable-feed"
import { usechatContext } from './context/chatcontext'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from './chatlogics'

export const Scrollchat = ({message}) => {

  const {user} = usechatContext()
  return (
       <div style={{width: "100%", height: "99.5%"}}>
    <ScrollableFeed >
        {
            message &&  message.map((m, i) =>{
              return <div className='d-flex' key={m._id}>
              {(isSameSender(message, m, i, user._id) || isLastMessage(message, i, user._id)) && (
                  <div>
                      <img src={m.sender.pic} style={{ width: "30px", height: "30px", borderRadius: "50%" }} alt="user img" />
                  </div>
              )}

                 <span style={{
                    backgroundColor: `${m.sender._id === user._id ?  "#0d6efd" : "white"}`,
                    color: `${m.sender._id === user._id ? "white" :"black"}`,
                    borderRadius: `${m.sender._id === user._id ? "10px 10px 0 10px": "10px 10px 10px 0"}`, padding : "5px 10px", maxWidth: "75%",
                    marginLeft: isSameSenderMargin(message, m, i, user._id),
                    marginTop: isSameUser(message, m, i, user._id) ? 3: 10,
                    overflow: "auto",
                    
                 }}>
                {
                    m.content
                }
                 </span>

          </div>
            })
        }
    </ScrollableFeed>
    </div>
    
  ) 
}
