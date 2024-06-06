import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import './NotifierForm.css';

const NotifierForm = ( { apartmentNumber, onNotify, onBack }) => {
  return (
    <div className='card'>
        <button className='arrow-btn' onClick={onBack}><FontAwesomeIcon icon={faArrowLeft} /></button>
        <h2 className='card-title'>Notification Details</h2>
        <h4 className='card-subtitle'>For Apartment N°{apartmentNumber}</h4>
        <div className='card-content'>
            <div className='select'>
                <label htmlFor='residents' className='label'>Select Resident(s):</label>
                <select id='residents' className='select-box'>
                    <option value='' disabled selected>Choose residents</option>
                    <option value='resident1'>Resident 1</option>
                    <option value='resident2'>Resident 2</option>
                    <option value='resident3'>Resident 3</option>
                </select>
            </div>
            <div className='select'>
                <label htmlFor='deliveryType' className='label'>Deliver Type:</label>
                <select id='deliveryType' className='select-box'>
                    <option value='' disabled selected>Select type</option>
                    <option value='delivey'>Delivery</option>
                    <option value='package'>Package</option>
                    <option value='mail'>Mail</option>
                </select>
            </div>
            <div className='select'>
                <label htmlFor='notificationType' className='label'>Notification Type:</label>
                <select id='notificationType' className='select-box'>
                    <option value='' disabled selected>Select notification</option>
                    <option value='wsp'>WhatsApp</option>
                    <option value='email'>Email</option>
                    <option value='sms'>SMS</option>
                </select>
            </div>
        </div>
        <button className='button' onClick={onNotify}>Notify</button>
    </div>
  )
}

export default NotifierForm