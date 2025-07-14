// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('token'); // or use context/global state
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
