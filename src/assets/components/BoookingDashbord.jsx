import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import bookingApi from '../../api/bookingApi'
import eventApi from '../../api/eventApi'    

export default function BookingDashboard() {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => { //navigerar to login if we are not already logged in. returns bookings after successfull login.
    if (!token) {
      navigate('/login', { replace: true, state: { from: { pathname: '/bookings' } } })
      return
    }
    //calling 
    Promise.all([
      bookingApi.get('/api/booking'),
      eventApi.get('/api/Event')
    ])
        .then(([bkRes, evRes]) => {
            const allBookings = bkRes.data
            const eventsMap = evRes.data.reduce((map, ev) => {
            map[ev.id] = {
              name: ev.name, //lastmin change so i didnt have to change the dto, as it only contains the ID and not full name from booking
              price: ev.price
            }
            return map
            }, {}) 

        const withExtras = allBookings.map(b => ({
          ...b,
          eventName: eventsMap[b.eventId] || 'Unknown event'
        }))
        setBookings(withExtras)
      })
      .catch(err => {
        console.error(err)
        setError(err.response?.data || 'Could not load data. Navigate back to dashbord then to bookings.') //genereall crash, often happens when we randomly looses token
      })
      .finally(() => setLoading(false))
  }, [token, navigate])

  if (loading)    
    return (
      <div className="loading-container">
        <img src="/img/Symbol.svg" alt="Loading" className="loading-spinner" />
        <p className='loading-text'>Loading Bookings</p>
      </div>
    )

  if (error) 
    return <p className="error">{error}</p>

  if (bookings.length === 0) {
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
            <span>{b.eventName}</span>
            <span>{b.eventPrice} SEK</span>
            <span>{b.ticketAmount}</span>
            <span>{b.totalPrice} SEK</span>
          </div>
        ))}

      </div>
    </div>
  )
}
