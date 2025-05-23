import React, {useContext} from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import * as jwt_decode from 'jwt-decode'

export default function UserSummary() {
  const {token} = useContext(AuthContext)
  let name = '', role = ''

  try {
    const decoded = jwt_decode(token)
    name = decoded.unique_name || decoded.email || 'User'
    role = Array.isArray(decoded.role)
    ? decoded.role.join(', ')
    : decoded.role || 'User'
     }catch{

    }
 

  return (
        <div className="user-sum">
            <img className="sum-image" src="img/profileimg.svg" alt=""></img>
            <h3 className="sum-name">{name}</h3>
            <span className="sum-role">{role}</span>
        </div> 
    )
}
