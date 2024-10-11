import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Login0 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  // Function to handle form submission
  if (!!localStorage.getItem('hlinks')) {

    return <Navigate to="/home"/>
     
     }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send email and password to the backend
      const response = await axios.post('http://localhost:3000/api/login', { email, password }).then(response => {
     
        if (response.data.token!=undefined) {
          localStorage.setItem("hlinks",response.data.token)
          navigate("/home")
        }
        
        
    })
    .catch(error => {
      
    });
      
      if (response.data.success) {
        // Handle login success (e.g., store token, redirect to dashboard)
        setMessage('Login successful!');
        localStorage.setItem('token', response.data.token); // Save JWT token to localStorage
        // You could also use React Router to redirect the user, e.g., to a dashboard page
      } else {
        setMessage(response.data.message); // Display error message from the backend
      }
    } catch (error) {
      setMessage('Error logging in. Please check your credentials.');
    }
  };
  
  return (
    <div className="login-container">
      <div className="main">
    <h1 className='d-flex w-100 justify-content-center my-5'>Login</h1>
 <div className=" py-5 my-5 cont d-flex w-100 justify-content-center">
      
      <form onSubmit={handleSubmit}>
      
   
        <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input  type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input  type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required  className="form-control" id="password"/>
  </div>

  <button type="submit" className="btn btn-primary w-100">Submit</button>
  <a href='/login'  className="btn mt-2 border border-bottom-dark btn-transparent w-100">Create Acount ?</a>
      </form>
      
      {message && <p>{message}</p>}
    </div>
    </div>
    </div>
  );
};

export default Login0;
