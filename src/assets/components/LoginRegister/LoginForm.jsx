import React, { useState, useContext  } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'

export default function LoginForm() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useContext(AuthContext)

    const from = location.state?.from?.pathname || '/'

    const [form, setForm] = useState({email: '', password: ''})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange =e =>{
        const {name, value } = e.target
        setForm(f => ({...f, [name]: value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try{
            await login(form.email, form.password)
            navigate(from, {replace:true})
        } catch(err){
            setError(err.response?.data||"Login Failed")
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className="form">
              <div className="form-head">
                  <h1>Ventixe</h1>
                  <img src="img/Symbol.svg" alt=""></img>
              </div>
  
              <div className="form-title">
                  <h2>Login</h2>
              </div>
  
              <form className="login-portal-form" onSubmit={handleSubmit} noValidate>
  
                  <label className="form-lable" htmlFor="Email"> Email </label>
                  <input
                    className="form-input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required />
  
                  <label className="form-lable" htmlFor="Password">Password</label>
                  <input
                    className="form-input"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required/>

                    {error && <p className="error">{error}</p>}

                  <button className="btn-primary" type="submit">Login</button>

                  <p className="form-footer">
                    No Account?{' '}
                    <Link to="/register" replace>
                    Registr Here!
                    </Link>
                </p>
              </form>
      </div>
  )
}
