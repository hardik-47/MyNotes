import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
function Navbar() {
  const navigate= useNavigate();
  const handleLogout=()=>{

    localStorage.removeItem('token');
    navigate('/login');

  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">Navbar</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {/* <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/Home">Home</a>
        </li> */}
        <li className="nav-item">
          <NavLink className="nav-link" to="/About">About</NavLink>
        </li>
        
      </ul>
          {!localStorage.getItem('token')? 
          <div className="d-flex">
          <NavLink className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</NavLink>
          <NavLink className="btn btn-primary mx-2" to="/login" role="button">Login</NavLink>
          </div>: <button onClick={handleLogout} className="btn btn-primary mx-2">Logout</button>
}
    </div>
    
  </div>
</nav>
    </div>
  )
}

export default Navbar
