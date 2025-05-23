import React, {useContext, useEffect, useState} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import eventApi from '../../api/eventApi';

export default function EventBookingPage() {
    const {id} = useParams();
    const navigate = useNavigate()
    const location = useLocation()
    const {token} = useContext(AuthContext)

    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState ({
        ticketAmount: 1,
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        postalCode: ''
    })

    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() =>{
        eventApi.get()
        .then(res => setEvent(res.data))
        .catch(console.error)
        .finally(() => setLoading(false))
    }, [id])

    const handleChange = e =>{
      const {name, value} = e.target
      setForm (f => ({...f, [name]: value}))
    }

    const handleBook = async e => {
      e.preventDefault()
      if (!token){
        return navigate ('login', {state: {from: location}})
      }
      setSubmitting(true)
      setError(null)
      try{
        payload = {
          eventId: id,
          ticketAmount: form.ticketAmount,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          address: form.address,
          city: form.city,
          postalCode: form.postalCode
      }

      const res = await bookingApi.post('/api/booking', payload)
      navigate(`/bookings/${res.data.id}/confirmation`, { state: res.data })
      } catch (err){
        setError(err.response?.data || err.message)
      } finally {
        setSubmitting(false)
      }
    }

    if(loading) return <p>Loading booking form...</p>
    if (!event) return <p>Event Not Found</p>
  return (
    <div>
      <h1>Booking: {event.name}</h1>
      <form onSubmit={handleBook}>

        <div>
          <label>Ticket Amount</label>
          <input
            type="number" name="ticketAmount"
            min="1"
            value={form.ticketAmount}
            onChange={handleChange}/>
        </div>

        <div>
          <label>First Name</label>
          <input
            type="text" name="firstName"
            min="1"
            value={form.firstName}
            onChange={handleChange}/>
        </div>

        <div>
          <label>Last Name</label>
          <input 
            type="text" name="lastName"
            min="1"
            value={form.lastName}
            onChange={handleChange}/>
        </div>

        <div>
          <label>Email</label>
          <input 
            type="text" name="email"
            min="1"
            value={form.email}
            onChange={handleChange}/>
        </div>

        <div>
          <label>Adress</label>
          <input
            type="text" name="address"
            min="1"
            value={form.address}
            onChange={handleChange}/>
        </div>

        <div>
          <label>City</label>
          <input 
            type="text" name="city"
            min="1"
            value={form.city}
            onChange={handleChange}/>
        </div>

        <div>
          <label>Postal-code</label>
          <input 
            type="text" name="postalCode"
            min="1"
            value={form.postalCode}
            onChange={handleChange}/>
        </div>
        <p>Total Price: {event.price * form.ticketAmount} SEK</p>

        <button type="submit" disabled={submitting}>
            {submitting ? 'Booking...' : 'Confirm booking'}
        </button>

      </form>
    </div>
  )
}
