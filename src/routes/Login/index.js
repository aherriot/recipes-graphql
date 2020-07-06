import React from 'react'

function Login() {
  const username = window.localStorage.getItem('username')
  const userId = window.localStorage.getItem('userId')
  return (
    <div>
      Logged in as {username} {userId}
    </div>
  )
}

export default Login
