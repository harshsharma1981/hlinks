import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Navbar() {
const navigate= useNavigate()
const logout=()=>{
  localStorage.removeItem("hlinks")
   navigate("/")
}
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand btn bg-success text-light" href="#">HLinks</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link active"  href="/dashboard">Dashboard</a>
        <a className="nav-link active"  href="/home">Home</a>
       
      </div>
    </div>
    {!!localStorage.getItem('hlinks')?(
    <div className='text-dark fs-5 btn ' onClick={()=>logout()}>Logout</div>
    ):(
      <div className="d-flex float-end btn btn-light">
      <a className='text-dark fs-5' href='/'>Signup </a> /
      <a className='text-dark fs-5' href='/login'> Login</a>
      </div>
    )}
    
   
  </div>
</nav>
    </div>
  )
}

export default Navbar
