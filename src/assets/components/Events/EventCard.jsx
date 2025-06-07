import React from 'react'
import { Link } from 'react-router-dom'

export default function EventCard({ event }) {
    if (!event) return null;

    const {id, name, date, location, price, imageUrl} = event;

  return (
    <Link to={`/events/${event.id}`}>
        <div className="event-card">
                <div className="event-bg">
                    <img src={event.imgageUrl ?? '/img/placeholder.jpg'} alt={event.name}></img>
                </div>

                <div className="event-detals">
                    <span className="event-date">{new Date(event.date).toLocaleDateString()}</span>
                    <span className="event-name">{event.name}</span>
                    <div className="event-location">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>{event.location}</span>
                    </div>
                </div>

                <div className="event-demand">
                    <span className="min-price">{event.price} SEK</span>
                </div>
        </div>
    </Link>
    )
}
