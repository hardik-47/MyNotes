
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'

function Signup() {

  const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword:"" });
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const {name,email,password}= credentials;
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",

          },
          body: JSON.stringify({ name,email,password }),
      })
      const json = await response.json();
      console.log(json);
          if (json.success) {
            localStorage.setItem('token',json.authtoken);
          navigate("/");
          }
          else{
            alert("Error");
          }
     

  }
  const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div>
     <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="email">Name</label>
    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onChange} minLength={5} required/>
  </div>
  <div className="form-group">
    <label htmlFor="cpassword">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Password" onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary my-2">Submit</button>
</form>
    </div>
  )
}

export default Signup
