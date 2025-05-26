import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import bookingApi from '../../api/bookingApi'

export default function BoookingDashbord() {
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if(!token) {
            navigate('/login', {replace: true, state: {from:{ pathname:'/bookings'}}})
            return
        }
        bookingApi.get('/api/booking')
        .then(res => setBookings(res.data))
        .catch(err => {
            console.error(err)
            setError(err.response?.data || 'Could not GET bookings')
        })
        .finally(() => setLoading(false))
    }, [token, navigate])

    if(loading) return <p>Loading Bookings...</p>
    if(error) return <p className="error">{error}</p>
    if(bookings.length === 0){
        
        return <p>You have not made any bookings yet.</p>
        
    } 

  return (
            <div className="booking-hero">
                <div className="booking-main">

                    <div className="sorting-bar">
                        <span>Booking Id</span>
                        <span>Date</span>
                        <span>Name</span>
                        <span>Event</span>
                        <span>Price</span>
                        <span>Quantity</span>
                        <span>Amount</span>
                    </div>

                    {bookings.map(b => (
                            <div key={b.id} className="booking">
                                <p>{b.id}</p>

                                <span>
                                {new Date(b.bookingDate).toLocaleDateString()}&nbsp;
                                <p>{new Date(b.bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </span>

                                <span>{b.firstName} {b.lastName}</span>

                                <span>{b.eventId}</span>

                                <span>{b.price ?? '-'} SEK</span>

                                <span>{b.ticketAmount}</span>

                                <span>{b.totalPrice} SEK</span>
                            </div>
                            ))}

                </div>
            </div>
    )
}
