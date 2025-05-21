import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './assets/layouts/Dashbord'
import EventsDashbord from './assets/components/eventsDashbord'
import EventDetailsPage from './routing/pages/EventDetailsPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<EventsDashbord/>} />
        <Route path="/events/:id" element={<EventDetailsPage/>} />
      </Routes>
    </Layout>
  )
}

export default App
