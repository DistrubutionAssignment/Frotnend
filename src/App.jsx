import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './assets/layouts/Dashbord'
import EventsDashbord from './assets/components/EventsDashbord'
import EventDetailsPage from './routing/pages/EventDetailsPage'
import EventBookingPage from './routing/pages/EventBookingPage'
import EventBookingConfirmation from './routing/pages/EventBookingConfirmation'
import LoginForm from './assets/components/LoginRegister/LoginForm'
import PersonalRegister from './assets/components/LoginRegister/PersonalRegister'
import SendVerification from './routing/pages/SendVerfiication'
import VerifyCode from './routing/pages/VerifyCode'
import AuthLayout from './assets/layouts/AuthLayout'
import BoookingDashbord from './assets/components/BoookingDashbord'

function App() {
  return (
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/register" element={<PersonalRegister/>} />
          <Route path="/send-verification" element={<SendVerification />} />
          <Route path="/verify-code" element={<VerifyCode />} />
        </Route>

        <Route element={<Layout />}>
          <Route path="/" element={<EventsDashbord />} />
          <Route path='/bookings' element={<BoookingDashbord/>} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/events/:id/booking" element={<EventBookingPage />}/>
          <Route path="/events/:id/confirmation" element={<EventBookingConfirmation />}/>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
  )
}

export default App
