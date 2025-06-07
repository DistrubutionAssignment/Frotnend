import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { AuthContext} from '../../contexts/AuthContext'
import eventApi from '../../api/eventApi'
import bookingApi from '../../api/bookingApi'

export default function EventDetailsPage() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const location   = useLocation()
  const { token }  = useContext(AuthContext)

  const [event,   setEvent]   = useState(null)
  const [loading, setLoading] = useState(true)

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    useEffect(() => {
        eventApi.get(`/api/Event/${id}`)
        .then(res => setEvent(res.data))
        .catch(console.error)
        .finally(() => setLoading(false))
    }, [id]);

  const handleBook = () => {
    bookingApi.post('/api/booking', { eventId: id })
      .then(() => navigate('/bookings'))
      .catch(err => console.error(err))
  }

    if(loading) return <p className='loading-text'>Loading Event...</p>
    if(!event) return <p className='loading-error'>The event could not be found...</p>

  return (
        <div className="hero">
            <div className="details-hero">
                
                <div className="details-main">
                    <div className="details-img">
                        <img src={event.imgageUrl ?? '/img/placeholder.jpg'} alt={event.name}
                         />
                    </div>

                    <div className="details-info">

                        <h1 className="details-name">{event.name}</h1>

                        <div className="details-date">
                            <i className="fa-solid fa-calendar-days"></i>
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="details-location">
                            <i className="fa-solid fa-location-dot"></i>
                            <span>{event.location}</span>
                        </div>

                        <div className="details-price">
                            <p>Starting from</p>
                            <h3>{event.price} SEK</h3>
                        </div>
                    </div>
                    <div className="details-about">
                        <span>About Event</span>
                        <p>{event.description}</p>
                    </div>
                </div>

                <div className="package-main">
                    <h2>Packages</h2>
                    <Link to={`/events/${id}/booking`}
                    state={{from: location}}> 
                        <div className="package-group">
                                <h2 className="package-title">Standard Package</h2>
                                <p className="package-seating">Standing</p>
                                <p className="package-price">{event.price} SEK</p>
                        </div> 
                    </Link>
                </div>
            </div>

        </div>
  )
}
