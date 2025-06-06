import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'

export default function UserSummary() {
  const { token } = useContext(AuthContext)
  const [decoded, setDecoded] = useState(null)

  useEffect(() => {
    if (!token) return
    //chatGPT o4high mini copypaste
    import('jwt-decode')
      .then(pkg => {
        const jwt_decode = pkg.default ?? pkg.jwtDecode ?? pkg

        if (typeof jwt_decode !== 'function') {
          console.error('jwt-decode export is not a function', pkg)
          return
        }

        try {
          const dec = jwt_decode(token)
          setDecoded(dec)
        } catch (err) {
          console.error('problem with deconding jwt', err)
        }
      })
      .catch(err => {
        console.error('Could not read jwt decode:', err)
      })
          //chatGPT o4high mini copypaste slutar här
  }, [token])

  const name = decoded?.unique_name || decoded?.email || 'User'
  const role = Array.isArray(decoded?.role)
    ? decoded.role.join(', ')
    : decoded?.role || 'User'

  return (
    <div className="user-sum">
      <img className="sum-image" src="img/profileimg.svg" alt="" />
      <h3 className="sum-name">{name}</h3>
      <span className="sum-role">{role}</span>
    </div>
  )
}
