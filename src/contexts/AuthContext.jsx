// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import authApi from '../api/authApi';

// Create context
export const AuthContext = createContext();

// Provider component
export function AuthProvider({ children }) {
  // JWT token state
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  // Optional: user object state if you want later
  const [user, setUser] = useState(null);

  // Sync axios auth header when token changes
  useEffect(() => {
    authApi.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
  }, [token]);

  // Login function
  const login = async (email, password) => {
    const res = await authApi.post('/api/auth/login', { email, password });
    const newToken = res.data.token;
    setToken(newToken);
    localStorage.setItem('token', newToken);

    // Optionally fetch user profile here
    // const profile = await authApi.get('/api/auth/me');
    // setUser(profile.data);
  };

  // Logout function
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}
