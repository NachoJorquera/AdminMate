import React from 'react'
import './Modal.css'

function Modal({ children, onClose, show }) {
    if (!show) return null;

  return (
    <div className='modal-overlay'>
        <div className='modal-content'>
            <h3><strong>Error</strong></h3>
            <p>{children}</p>
            <button className='close' onClick={onClose}>Close</button>
        </div>
    </div>
  )
}

export default Modal