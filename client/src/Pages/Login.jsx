import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const history = useNavigate()
  function navigate(){
    history('/signup')
  }
  return (
    <div>
      <h1>login</h1>
      <button onClick={navigate}>Signup</button>
    </div>
  )
}

export default Login