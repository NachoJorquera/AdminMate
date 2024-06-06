import React from 'react'
import { Link } from 'react-router-dom'
import './NotiMessage.css'

const NotiMessage = ({ onDeli }) => {
  return (
    <>
    <div className='card'>
        <div className='card-content'>
            <div className='headings'>
                <h2 className='card-title'>Notification Sent</h2>
                <h2 className='card-title'>Successfully</h2>
            </div>
            <div className='btns'>
                <button className='card-btn' onClick={onDeli}>New Deliver</button>
                <Link to='/home' className='card-btn'>Home</Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default NotiMessage