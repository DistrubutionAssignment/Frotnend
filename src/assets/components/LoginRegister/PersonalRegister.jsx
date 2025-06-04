import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authApi from '../../../api/authApi'

export default function PersonalRegister() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email:    '',
    password: '',
    confirm:  ''
  })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (error) setError('') 
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!form.email.trim()) {
      setError('Enter a valid Email')
      return
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Enter a valid Email')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be atleast 6 charachters long')
      return
    }
    if (form.password !== form.confirm) {
      setError('Password do not match')
      return
    }

    setLoading(true)
    setError('')

    try {
      await authApi.post('/api/auth/register', {
        email:    form.email,
        password: form.password
      })
      navigate('/send-verification', { state: { email: form.email } })
    } catch (err) {
      const apiError = err.response?.data || {}
      const msg = apiError.message 
               || apiError.title 
               || err.response?.statusText 
               || 'Something went wrong'
      setError(msg)
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

      {error && <p className="error">{error}</p>}

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

        <button
          className="btn-primary"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Registrerar…' : 'Register'}
        </button>
      </form>

      <p className="form-footer">
        Already have an account?{' '}
        <Link to="/login" replace>
          Sign in here
        </Link>
      </p>
    </div>
  )
}
