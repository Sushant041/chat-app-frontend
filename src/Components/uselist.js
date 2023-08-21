import React from 'react'




export const Userlist = ({u, handleClick}) => {

  // const { user, setSelectedChat } = usechatContext()


  // const accessChat = async (userId) =>{
        
  //   try {


  //      const config = {
  //       headers: {
  //         "Content-type" : "application/json",
  //         Authorization: `Bearer ${user.authtoken}`,
  //       },
  //     };

  //     const response = await axios.post("/api/chat", { userId }, config);
  //     console.log(response.data._id);
  //     setSelectedChat(response.data);

  //   } catch (error) {
  //     alert(error);
  //   }
  // }


  return (
    <div className="container my-2" style={{overflowY: "auto"}} >
      <div className='row'>
          <div className=" d-flex align-items-center col-12 userSch" onClick={handleClick}>
            <img src={u.pic} style={{width: "50px", borderRadius: "50%"}} alt="" />
            <div className='mx-2'>
             <div> <strong>{u.name}</strong></div>
            </div>
              
          </div>
      </div>
    </div>
  )
}
