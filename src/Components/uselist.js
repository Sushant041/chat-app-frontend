import React from 'react'




export const Userlist = ({u, handleClick}) => {

 
  return (
    <div className="container my-2" style={{overflowY: "auto"}} >
      <div className='row'>
          <div className=" d-flex align-items-center col-12 userSch" onClick={handleClick}  style={{height: "60px"}}>
            <img src={u.pic} style={{width: "50px", height: "50px", borderRadius: "50%"}} alt="" />
            <div className='mx-2'>
             <div> <strong>{u.name}</strong></div>
            </div>
              
          </div>
      </div>
    </div>
  )
}
