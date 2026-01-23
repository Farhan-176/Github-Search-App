import React from 'react'
import './Loader.css'

export default function Loader() {
  return (
    <div className="loader-container show">
      <div className="loader">
        <div className="loader-spinner"></div>
        <p className="loader-text">Fetching user data...</p>
      </div>
    </div>
  )
}
