import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Signup = () => {


    let navigate = useNavigate();
    const [pic, setPic] = useState();
    const [Loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    pic: "",
  });


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };



  const postDetails = (pics, e) => {
    e.preventDefault();
  
    if (pics === undefined) {
      setLoading(false);
      alert("Please Select an image");
      return;
    }

    if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
      setLoading(false);
      alert("Please Select a valid image (JPEG or PNG)");
      return; // Add a return statement to exit the function
    }
    
   const data = new FormData();
  data.append("file", pics);
  data.append("upload_preset", "chatting");
  data.append("cloud_name", "dfgxnaxon");
  
  fetch("https://api.cloudinary.com/v1_1/dfgxnaxon/image/upload", {
    method: "post",
    body: data, // Fix the typo here
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setPic(data.url.toString());
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};
  



  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      setLoading(false);
      alert("password did not match");
      return 0;
    }

    try {
      const response = await fetch("https://chat-jzip.onrender.com/api/user/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          pic,
        }),
      });
      const json = await response.json();

      console.log(json);
      setLoading(false);

      if (json.success) {

         alert("Registration Successful")

         localStorage.setItem("token", JSON.stringify(json));
         navigate("/");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };


  if (Loading) {
    return (<div style={{textAlign: "center", color: "white"}}>
          <h3>Loading......</h3>
         <div className="lds-ring">
         <div></div><div></div><div></div><div></div></div> 
             </div>)
  }

  return (
    <div>
      <form className="py-3" onSubmit={handleClick}>
        <div className="form-floating my-1">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            name="name"
            placeholder="Name"
            onChange={onChange}
            required
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
        <div className="form-floating my-1">
          <input
            type="email"
            className="form-control"
            id="floatingPassword"
            name="email"
            placeholder="Email"
            onChange={onChange}
            required
          />
          <label htmlFor="floatingPassword">Email</label>
        </div>

        <div className="form-floating mt-1">
          <input
            type={"password"}
            className="form-control"
            onChange={onChange}
            id="password"
            name="password"
            placeholder="Password"
            required
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
        </div>


        <div className="form-floating my-1">
          <input
            type={"password"}
            className="form-control"
            onChange={onChange}
            id="cpassword"
            name="cpassword"
            placeholder="Confirm Password"
            required
          />
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
        </div>

        <div className="" style={{marginTop: "-8%"}}                    >
          <label
            htmlFor="formFile"
            style={{ color: "white" }}
            className="form-label"
          >
            Upload your picture
          </label>
          <input
            className="form-control"
            accept="image/*"
            type="file"
            id="pic"
            onChange={(e) => postDetails(e.target.files[0], e)}
          />
        </div>

        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <button
            className="btn btn-primary my-3 "
            type="submit"
            style={{ width: "100%", background: "-webkit-linear-gradient(left, #003366,#004080,#0059b3, #0073e6)" }}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};
