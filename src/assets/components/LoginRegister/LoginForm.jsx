import React, { useState, useContext } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'

export default function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useContext(AuthContext)

  const from = location.state?.from?.pathname || '/'

  const [form, setForm]     = useState({ email: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (error) setError('')    
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!form.email.trim() || !form.password) {
      setError('Email and password must be entered')
      return
    }

    setLoading(true)
    setError('')

 try {
    await login(form.email, form.password)
    navigate(from, { replace: true })
  } catch (err) {
    const apiError = err.response?.data || {}
const msg =
    apiError.message       
    || apiError.detail         
    || apiError.title         
    || err.response?.statusText
    || err.message
    || 'Login Failed'
    setError(msg)
  } finally {
    setLoading(false)
    }
  }

  return (
    <div className="form">
      <div className="form-head">
        <h1>Ventixe</h1>
        <img src="img/Symbol.svg" alt="Logo" />
      </div>

      <div className="form-title">
        <h2>Login</h2>
      </div>

      {error && <p className="error">{error}</p>}

      <form className="login-portal-form" onSubmit={handleSubmit} noValidate>
        <label className="form-label" htmlFor="email">Email</label>
        <input
          className="form-input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label className="form-label" htmlFor="password">Password</label>
        <input
          className="form-input"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          className="btn-primary form-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="form-footer">
        No Account?{' '}
        <Link to="/register" replace>
          Register here!
        </Link>
      </p>
    </div>
  )
}
