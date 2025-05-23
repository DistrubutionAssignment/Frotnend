import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authApi from '../../../api/authApi'
export default function PersonalRegister() {
    const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirm: ''
  })
  const [error, setError]     = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    if (form.password !== form.confirm) {
      setError('Password does not match')
      return
    }
    setLoading(true)
    try {
      await authApi.post('/api/auth/register', {
        email:    form.email,
        password: form.password
      })
      navigate('/login', { replace: true })
    } catch (err) {
      setError(err.response?.data || 'Register failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    
 <div className="form">
      <div className="form-head">
        <h1>Ventixe</h1>
        <img src="/img/Symbol.svg" alt="Ventixe logo" />
      </div>

      <div className="form-title">
        <h2>Register</h2>
      </div>

      <form className="login-portal-form" onSubmit={handleSubmit} noValidate>
        <label className="form-label" htmlFor="email">
          Email
        </label>
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

        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          className="form-input"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
        />

        <label className="form-label" htmlFor="confirm">
          Confirm Password
        </label>
        <input
          className="form-input"
          id="confirm"
          name="confirm"
          type="password"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={handleChange}
          required
        />

        {error && <p className="error">{error}</p>}

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Registrerar…' : 'Register'}
        </button>
      </form>

      <p className="form-footer">
        Already have an account?{' '}
        <Link to="/login" replace>
          Sign in Here
        </Link>
      </p>
    </div>
  )
}
