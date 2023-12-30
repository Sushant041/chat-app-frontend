import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usechatContext } from "./context/chatcontext"


export const Login = () => {

  const { setUser } = usechatContext();

    let navigate = useNavigate();

  const [Loading, setLoading] = useState(false);


  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
;



  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleClick2 = async (e) => {
    e.preventDefault();

    setLoading(true);
    const { email, password } = credentials;

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      setLoading(false);
      const json = await response.json();

      setUser(json)

      if (json.success) {
        setLoading(false);

        localStorage.setItem("token", JSON.stringify(json));
        
        navigate("/");
      }
      
      else {
        setLoading(false);
        alert("Invalid Credentials");
      }
    } catch (error) {
        alert(error);
    }
  };


    if (Loading) {
        return (<div style={{textAlign: "center", color: "black"}}>
              <h3>Loading......</h3>
             <div className="lds-ring">
             <div></div><div></div><div></div><div></div></div> 
                 </div>)
      }
    

  return (
    <div className="d-flex justify-content-center" style={{width: "100%"}}>
      <form style={{width: "85%"}} onSubmit={handleClick2}>
        <div className="form-floating my-3">
          <input
            type="email"
            className="form-control"
            id="floatingPassword"
            name="email"
            placeholder="Email"
            onChange={onChange}
          />
          <label htmlFor="floatingPassword">Email</label>
        </div>

        <div className="form-floating mt-3">
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            id="password"
            name="password"
            placeholder="Password"
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
        </div>

        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <button
            className="btn btn-primary mt-3 "
            type="submit"
            style={{ width: "100%", background: "-webkit-linear-gradient(left, #003366,#004080,#0059b3, #0073e6)" }}
          >
            Log in
          </button>
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
        </div>
      </form>
    </div>
  );
};
