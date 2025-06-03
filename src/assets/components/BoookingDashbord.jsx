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

    if(loading) return <p className='loading'>Loading Bookings...</p>
    if(error) return <p className="error">{error}</p>
    if(bookings.length === 0){
        
        return <p className='error'>You have not made any bookings yet.</p>
        
    } 

  return (
            <div className="booking-hero">
                <div className="booking-main">

                    <div className="sorting-bar">
                        <span id='booking-id'>Booking Id</span>
                        <span id='Date'>Date</span>
                        <span id='Name'>Name</span>
                        <span id='Event'>Event</span>
                        <span id='Price'>Price</span>
                        <span id='Quantity'>Quantity</span>
                        <span id='Amount'>Amount</span>
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

                                <span id='booking-price'>{b.price ?? '-'} SEK</span>

                                <span>{b.ticketAmount}</span>

                                <span>{b.totalPrice} SEK</span>
                            </div>
                            ))}

                </div>
            </div>
    )
}
