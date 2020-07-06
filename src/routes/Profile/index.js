import React from 'react'
import Header from 'commonComponents/Header'

function Profile() {
  const username = window.localStorage.getItem('username')
  // const userId = window.localStorage.getItem('userId')
  return (
    <div>
      <Header />
      Logged in as {username} (userId)
    </div>
  )
}

export default Profile
