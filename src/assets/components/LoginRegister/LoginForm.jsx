import React from 'react'

export default function LoginForm() {
  return (
    <div className="form-container">
        <div className="form">
            <div className="form-head">
                <h1>Ventixe</h1>
                <img src="img/Symbol.svg" alt=""/>
            </div>
            <h1>Login</h1>
            <form className="login-portal-form" action="post">
                <Button className="btn-primary form-btn"><a href="PersonalAccountLog.html">Personal Account</a></Button>
                <Button className="btn-primary form-btn"><a href="SellerAccountlogin.html">Seller Account</a></Button>

                <div>
                    <span>Dont have an Account?</span>
                    <a href="/Register.html">Sign Up here!</a>
                </div>
                <a className="form-btn" href="AdminLogin.html">Login As Admin</a>
            </form>
        </div>
    </div>  )
}
