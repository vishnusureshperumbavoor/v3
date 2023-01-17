import React from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>signup</h1>
      <button onClick={()=>navigate('/login')}>Login page</button>
    </div>
  )
}

export default Signup