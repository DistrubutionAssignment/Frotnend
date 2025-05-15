import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './assets/layouts/Dashbord'
import EventsDashbord from './assets/components/eventsDashbord'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<EventsDashbord/>}></Route>
      </Routes>
    </Layout>
  )
}

export default App
