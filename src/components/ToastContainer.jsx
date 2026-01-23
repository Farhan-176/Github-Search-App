import React from 'react'
import './ToastContainer.css'

export default function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast--${toast.type}`}>
          <p className="toast-message">{toast.message}</p>
        </div>
      ))}
    </div>
  )
}
