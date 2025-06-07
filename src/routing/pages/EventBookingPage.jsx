import React, {useContext, useEffect, useState} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import eventApi from '../../api/eventApi'
import bookingApi from '../../api/bookingApi'

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
        eventApi.get(`/api/event/${id}`)
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
      const amt = Number(form.ticketAmount)


      
      if (isNaN(amt) || amt < 1){
      setError('You must purches atleast 1 ticket.')          
        return;
      }
      if (isNaN(amt) || amt > 10){
        setError('You cannot purches more then 10 tickets.')
          return;
      }


    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError('First and Last Name must be entered');
      return;
    }
    // enkel e-post-kontroll
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid Email Adress');
      return;
    }
    if (!form.address.trim() || !form.city.trim() || !form.postalCode.trim()) {
      setError('Adress, City and Postal-code is required!');
      return;
    }

    setSubmitting(true)
    setError(null)

    try {
      const payload = {
        eventId:      id,
        ticketAmount: form.ticketAmount,
        firstName:    form.firstName,
        lastName:     form.lastName,
        email:        form.email,
        address:      form.address,
        city:         form.city,
        postalCode:   form.postalCode
      }

      const res = await bookingApi.post('/api/booking', payload)
      navigate(`/events/${id}/confirmation`, { state: res.data })

      } catch (err){
        setError(err.response?.data || err.message)
      } finally {
        setSubmitting(false)
      }
    }

    if(loading)    return(
      <div className="loading-container">
         <img src="/img/Symbol.svg" alt="Loading" className="loading-spinner" />
         <p className='loading-text'>Loading booking form</p>
       </div>

   )
    if (!event) return <p className='error'>Event Not Found</p>

  return (
    <div className='booking-form-hero'>
      <div className='booking-title'>
         
        <h2>Booking:</h2>
        <h3>{event.name}</h3>
      </div>

      {error && <div className="error">{error}</div>}

      <form className='booking-form' onSubmit={handleBook} noValidate>

        <div className='booking-form-group'>
          <label>Ticket Amount</label>
          <input
            type="number" name="ticketAmount"
            min="1"
            value={form.ticketAmount}
            onChange={handleChange}
            className='booking-input'/>
        </div>

        <div className='booking-form-group'>
          <label>First Name</label>
          <input
            type="text" name="firstName"
            min="1"
            value={form.firstName}
            onChange={handleChange}
            className='booking-input'
            />
        </div>

        <div className='booking-form-group'>
          <label>Last Name</label>
          <input 
            type="text" name="lastName"
            min="1"
            value={form.lastName}
            onChange={handleChange}
            className='booking-input'
            />
        </div>

        <div className='booking-form-group'>
          <label>Email</label>
          <input 
            type="text" name="email"
            min="1"
            value={form.email}
            onChange={handleChange}
            className='booking-input'
            />
        </div>

        <div className='booking-form-group'>
          <label>Adress</label>
          <input
            type="text" name="address"
            min="1"
            value={form.address}
            onChange={handleChange}
            className='booking-input'
            />
        </div>

        <div className='booking-form-group'>
          <label>City</label>
          <input 
            type="text" name="city"
            min="1"
            value={form.city}
            onChange={handleChange}
            className='booking-input'
            />
        </div>

        <div className='booking-form-group'>
          <label>Postal-code</label>
          <input 
            type="text" name="postalCode"
            min="1"
            value={form.postalCode}
            onChange={handleChange}
            className='booking-input'
            />
        </div>
        <p className='booking-total'>Total Price: {event.price * form.ticketAmount} SEK</p>

        <button className='booking-submit' type="submit" disabled={submitting}>
            {submitting ? 'Booking...' : 'Confirm booking'}
        </button>

      </form>
    </div>
  )
}
