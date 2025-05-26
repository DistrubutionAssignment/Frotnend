import React, { useContext } from 'react'
import SignOutButton from './Buttons/SignOutButton'
import { useNavigate, NavLink } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'


export default function Sidebar() {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/', { replace: true })
  }

    return (
        <div className="side-bar">
            <div className="logo-group" onClick={handleLogoClick}>
                <img src="/img/Symbol.svg" alt="Logo" />
                <h1>Ventixe</h1>
            </div>
        {/*  shows regladless if we are logged in or not */}

            <div className="nav-group">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `nav-btn${isActive ? ' active' : ''}`}
                >
                    <img src="/img/Sidecons/Ticket.svg" alt="Events" />
                    <span>Events</span>
                </NavLink>


        {/* Only shows if we are logged in  */}

                {token && (
                    <NavLink
                    to="/bookings"
                    className={({ isActive }) => `nav-btn${isActive ? ' active' : ''}`}
                    >
                    <img src="/img/Sidecons/CheckSquare.svg" alt="Bookings" />
                    <span>Bookings</span>
                    </NavLink>
                )}

            </div>
            <SignOutButton/>
    </div>
    )
}
