import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Footer from '../components/footer'
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