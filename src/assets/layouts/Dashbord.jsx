import react from 'react'
import Header from '../components/header'
import EventsDashbord from '../components/eventsDashbord'
import Sidebar from '../components/sidebar'
import Footer from '../components/footer'

export default function Layout({ children }) {
  return (
    <div className="continer">
        <Sidebar/>
        <Header/>
        <div className="hero">
            {children}
        </div>
        <Footer/>
    </div>
  )
}