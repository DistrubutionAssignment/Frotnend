import React from 'react'

export default function PersonalRegister() {
  return (
       <div class="form-container">
        <div class="form">
            <div class="form-head">
                <h1>Ventixe</h1>
                <img src="img/Symbol.svg" alt=""/>
            </div>

            <div class="form-title">
                <h1>Register</h1>
                <h2>Personal Account</h2>
            </div>

            <form class="login-portal-form" action="post">
                
                <label class="form-lable" for="Email">Email</label>
                <input class="form-input" id="Email" type="text" placeholder="Email"/>


                <label class="form-lable" for="Password">Password</label>
                <input class="form-input" id="Password" type="text" placeholder="Password"/>


                <label class="form-lable" for="Confirm">Confirm Password</label>
                <input class="form-input" id="Confirm" type="text" placeholder="Confirm Password"/>

                <div class="terms-container">
                    <input class="form-check" id="Terms" type="checkbox"/>
                    <label class="form-lable" for="Terms">I Accept the Terms and Usage</label>
                </div>

                <button class="btn-primary" type="submit">Register</button>
            </form>
        </div>
    </div>
  )
}
