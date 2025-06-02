import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="continer">
        <Sidebar/>
        <Header/>
        <div className="hero">
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}