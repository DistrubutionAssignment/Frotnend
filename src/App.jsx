import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './assets/layouts/Dashbord'
import EventsDashbord from './assets/components/eventsDashbord'
import EventDetailsPage from './routing/pages/EventDetailsPage'
import EventBookingPage from './routing/pages/EventBookingPage'
import EventBookingConfirmation from './routing/pages/EventBookingConfirmation'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<EventsDashbord/>} />
        <Route path="/events/:id" element={<EventDetailsPage/>} />
        <Route path="/events/:id/booking" element={<EventBookingPage />}/>
        <Route path="/events/:id/confirmation" element={<EventBookingConfirmation />}/>
        <Route/>
      </Routes>
    </Layout>
  )
}

export default App
