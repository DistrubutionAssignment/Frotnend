import React from 'react'

export default function EventsDashbord() {
  return (
            <div className="hero">
            <div className="event-view">
                <div className="event-card">
                     <div className="event-info">
                        <span className="event-cat">Musik</span>
                        <span className="event-status">Active</span>
                     </div>
                     <div className="event-bg">
                        <img src="img/Eventheader.jpg" alt=""></img>
                     </div>
                     <div className="event-detals">
                        <span className="event-date">June 5, 2029 - 3:00 PM</span>
                        <span className="event-name">Sleep Token</span>
                        <div className="event-location">
                            <i className="fa-solid fa-location-dot"></i>
                            <span>Ullevi</span>
                        </div>
                     </div>

                     <div className="event-demand">
                        <span className="event-tickets">50000/50000</span>
                        <span className="min-price">850 kr</span>
                     </div>
                </div>

            </div>
        </div>
  )
}
