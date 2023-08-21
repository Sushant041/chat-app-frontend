export const isSameSender = (message , m, i, userId) =>{
  
    return (
         i < message.length -1 && 
         ( message[i+1].sender._id !== m.sender._id || 
            message[i+1].sender._id === undefined) &&
            message[i].sender._id !== userId 
    )
}

export const isLastMessage = (message, i, userId) =>{

    return(
        i === message.length -1 &&
         message[message.length - 1].sender._id !== userId
        //   && message[message.length - 1].sender._id
    );
}


export const isSameSenderMargin = (message, m, i, userId) =>{

    if(
        i < message.length -1 && 
        message[i+1].sender._id === m.sender._id &&
        message[i].sender._id !== userId 
    )
    return 33;

    else if(
       (i < message.length -1 && 
        message[i+1].sender._id !== m.sender._id &&
        message[i].sender._id !== userId ) ||
        (i === message.length - 1 && message[i].sender._id !== userId)
    )
    return 0;
    else return "auto";
};

export const isSameUser = (message, m, i) =>{
    return i > 0 && message[i-1].sender._id === m.sender._id
};


export   const getSender = (chat, user) => {
    if(chat && chat.users){
    if (!chat.isGroupChat) {
      const otherUser = chat.users.find((u) => u._id !== user._id);
      return otherUser ? otherUser.name : "";
    }}
  };