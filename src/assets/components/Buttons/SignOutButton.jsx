import React, { useContext } from 'react'
import { AuthContext }     from '../../../contexts/AuthContext'
import { useNavigate }     from 'react-router-dom'

export default function SignOutButton() {
  const { token, logout } = useContext(AuthContext)
  const navigate          = useNavigate()

  const handleClick = () => {
    if (token) {
      logout()
      navigate('/login', { replace: true })
    } else {
      navigate('/login', { replace: true })
    }
  }

  return (
    <button
      className="sign-out-btn"
      onClick={handleClick}
    >
      <i className={
        token
          ? 'fa-solid fa-arrow-right-from-bracket'
          : 'fa-solid fa-arrow-right-to-bracket'
      }></i>
      <p>{token ? 'Sign Out' : 'Sign In'}</p>
    </button>
  )
}
