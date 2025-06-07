import React, { createContext, useState, useEffect } from 'react'
import api from '../api/api'   

export const AuthContext = createContext() //context that handles difrent states, as in logged in, logged out, valid token and so on

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser]   = useState(null)

  useEffect(() => {
    api.defaults.headers.common['Authorization'] = 
      token ? `Bearer ${token}` : ''
  }, [token])

  const login = async (email, password) => {
    const res = await api.post(
      import.meta.env.VITE_AUTH_API_URL + '/api/auth/login',
      { email, password }
    )

    const newToken = res.data.token
    setToken(newToken)
    localStorage.setItem('token', newToken)


  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}
