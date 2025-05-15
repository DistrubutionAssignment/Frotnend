import React from 'react'
import SignOutButton from './Buttons/SignOutButton'

export default function Sidebar() {
  return (
    <div className="side-bar">
        <div className="logo-group">
            <img src="img/Symbol.svg" alt="Logo"></img>
            <h1>Ventixe</h1>
        </div>
        <div className="nav-group">
            <div className="nav-btn">
                <img src="img/Sidecons/SquaresFour.svg" alt=""></img>
                <a href="#">Dashboard</a>
            </div>
            <div className="nav-btn">
                <img src="img/Sidecons/CheckSquare.svg" alt=""></img>
                <a href="#">Bookings</a>
            </div>
            <div className="nav-btn">
                <img src="img/Sidecons/Receipt.svg" alt=""></img>
                <a href="#">Invoices</a>
            </div>
            <div className="nav-btn">
                <img src="img/Sidecons/Ticket.svg" alt=""></img>
                <a href="#">Events</a>
            </div>
            <div className="nav-btn">
                <img src="img/Sidecons/ListStar.svg" alt=""></img>
                <a href="#">Feedback</a>
            </div>
        </div>

        <div className="add-group dec-only">
            <img src="img/Sidecons/addimage.svg" alt=""></img>
        </div>
        <SignOutButton/>
</div>
  )
}
