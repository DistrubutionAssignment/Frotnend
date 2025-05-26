import React,{useContext} from 'react'
import UserSummary from './partals/UserSummary'
import { AuthContext } from '../../contexts/AuthContext'

export default function Header() {
    const {token} = useContext(AuthContext)
  return (
        <div className="header">
            <div className="head-title">
                <h1>Dashbord</h1>
                <span>Hello, {token ? 'Welcome back!' : "guest"}</span>
            </div>

           {token && <UserSummary/>}   
         
        </div>
    )
}
