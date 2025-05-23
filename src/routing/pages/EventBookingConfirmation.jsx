import React from 'react'
import {useLocation, Link, useParams} from 'react-router-dom'
export default function EventBookingConfirmation() {
    const {state} = useLocation
    const booking = state || {}
    const {id} = useParams
  return (
    <div className="confirmation">
        <h1>Booking Confirmed!</h1>
        <p>Booking-ID: {booking.id}</p>    
        <p>Event: {booking.eventId}</p>    
        <p>Tickets{booking.ticketAmount}</p>    
        <p>Total price: {booking.totalPrice} SEK</p>    
        <Link to="/events">Return To Events!</Link>    
    </div>
  )
}
