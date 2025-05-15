import React from 'react'
import UserSummary from './partals/UserSummary'
import SignInButton from './Buttons/SignInButton'

export default function Header() {
  return (
        <div className="header">
            <div className="head-title">
                <h1>DashBoard</h1>
                <span>Hellor User, Welcome Back!</span>
            </div>
            <div>
                <input className="search-bar" type="text" placeholder="Search Anything"></input>
            </div>
            <div className="btn-group">
                <button className="note-btn">
                    <div className="note-group">
                        <i className="fa-regular fa-bell"></i>
                    </div>
                </button>
                <button className="note-btn"><i className="fa-solid fa-gear"></i></button>
            </div>
            <SignInButton/>
        </div>
    )
}
