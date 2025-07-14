// 

// 

// src/pages/Signup.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../utils/utils'; // ✅ Make sure this file exists
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      handleError("Please fill all fields!");
      return;
    }

    if (password.length < 4) {
      handleError("Password must be at least 4 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });

      const result = await response.json();
      console.log("Signup response:", result); // ✅ Debug output

      const { success, message, } = result;

      if (success) {
        handleSuccess(message || "Signup successful!");
        setSignupInfo({ name: '', email: '', password: '' });

        // ✅ Navigate immediately
        navigate('/login');
      } else {
        handleError(message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      handleError("Something went wrong!");
    }
  };

  return (
    <div className='container'>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            placeholder='Enter your name...'
            value={signupInfo.name}
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Enter your email...'
            value={signupInfo.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Enter your password...'
            value={signupInfo.password}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Signup</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
