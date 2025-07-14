// 

// src/pages/Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../utils/utils';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email || !password) {
      handleError("Please fill all fields!");
      return;
    }

    if (password.length < 4) {
      handleError("Password must be at least 4 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      console.log("Login response:", result);

      const { success, message, jwtToken, name } = result;

      if (success) {
        handleSuccess(message || "Login successful!");
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setLoginInfo({ email: '', password: '' });

        navigate('/todo');
      } else {
        handleError(message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      handleError("Something went wrong!");
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Enter your email...'
            value={loginInfo.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Enter your password...'
            value={loginInfo.password}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Login</button>
        <span>
          Don't have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
