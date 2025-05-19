import React, { createContext, useState, useEffect} from 'react';
import authApi from '../api/authApi';

export const AuthContext = createContext();

export function AuthProvider({children}) {
  const [token, setToken] =useState(localStorage.getItem('token'));

  useEffect(() => {
    api.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
  }, [token]);

  const login = async (email, password) => {
    const res = await authApi.post('/api/auth/login', {email, password});
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
  };
  
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

    return (
        <AuthContext.Provider value ={{token, login, logout, user}}>
            {children}
        </AuthContext.Provider>
  );
}
