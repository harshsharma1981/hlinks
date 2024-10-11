import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

const Signup = () => {

  const { register, handleSubmit } = useForm();
  const [step, setStep] = useState(1); // Step 1: Signup form, Step 2: OTP form
  const [email, setEmail] = useState('');
  const [username, setusername] = useState('');
 const [error, setError]=useState('')
  const [password, setPassword] = useState(''); // Store password
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
const navigate =useNavigate()
  // Handle signup submission
  if (!!localStorage.getItem('hlinks')) {

 return <Navigate to="/home"/>
  
  }
  const onSubmitSignup = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/signup', { username:data.username,email: data.email, password: data.password });
      setEmail(data.email)
      setPassword(data.password)
      setusername(data.username)
      
      setMessage('OTP has been sent to your email.');
      setStep(2); // Move to OTP verification step
    } catch (error) {
  
    if (error.response && error.response.data.message) {
      setError(error.response.data.message); // Set error message in state
    } else {
      setError('An unknown error occurred.'); // Handle other cases
    }
    
      // setMessage('Error sending OTP. Please try again.');
    }
  };

  // Handle OTP verification
  const onSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/verify-otp', { username,email, otp,password }).then(response => {
       
        if (response.data.token!=undefined) {
            localStorage.setItem("hlinks",response.data.token)
            navigate("/home")
          }
        
        
    })
    .catch(error => {
       
        // return <div>Oops look Like you missed Otp form Plese wait for 5 min and try again</div>
    });
      setMessage('Account created successfully!');
      setStep(3); // OTP verified
    } catch (error) {
      setMessage('Invalid OTP. Please try again.');
    }
  };
// if (error) {
//   return <div>{error.response.data.message}</div>
  
// }

  return (
    <div className="signup-container">
    <div className="main">
    <h1 className='d-flex w-100 justify-content-center my-3'>Sign Up</h1>
 <div className=" py-5 my-3 otp-cont cont d-flex w-100 justify-content-center">
      {step === 1 && (
        <form onSubmit={handleSubmit(onSubmitSignup)}>
         <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Username You Want In Link</label>
    <input type="name" {...register('username')} required  className="form-control" id="username"/>
  </div>
         <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" {...register('email')} required  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" {...register('password')} required  className="form-control" id="password"/>
  </div>

  <button type="submit" className="btn btn-primary w-100">Submit</button>
  <a href='/login'  className="btn mt-2 border border-bottom-dark btn-transparent w-100">Login ?</a>
        
        
        
        
       
        </form>
        
      )}
<p className='d-flex  errordup justify-content-center'>{error}</p>
      {step === 2 && (
        <form onSubmit={onSubmitOtp}>
          <h2>Verify OTP</h2>
          <label>Enter OTP sent to {email}:</label>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {message && <p>{message }</p>}
    </div>
    </div></div>
  );
};

export default Signup;
