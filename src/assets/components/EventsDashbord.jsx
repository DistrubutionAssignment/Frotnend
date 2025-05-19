import React, { useState } from 'react'
import EventCard from './Events/EventCard'
import eventApi from '../../api/eventApi';

export default function EventsDashbord() {
const [events, setEvents] =  useState([]);
const [loading, setLoading] = useState(true);

useEffect(() =>  {
   eventApi.get('/api.Event')
   .then(res => setEvents(res.data))
   .catch(err => console.error(err))
   .finaly(() => setLoading(false));
}, []);

if (loading){
   return <p>Loading Events</p>
}
if (events.length === 0){
   return <p>No events Found</p>
}
  return (
            <div className="hero">
            <div className="event-view">

            <EventCard key={e.id} event={e} />

            </div>
        </div>
  )
}
