import React, { useState } from 'react'
import './ApartmentEntryForm.css'

const ApartmentEntryForm = ({ onSubmit }) => {
    const [apartmentNumber, setApartmentNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (apartmentNumber.trim() !== '') {
            onSubmit(apartmentNumber);
            setApartmentNumber('');
        }
    }
  return (
    <div className='containerr'>
        <h2 className='container-title'>Apartment Number:</h2>
        <form className='container-form' onSubmit={handleSubmit}>
            <input className='container-input' type='text' value={apartmentNumber} onChange={(e) => setApartmentNumber(e.target.value)} placeholder='Enter apartment number' />
            <button className='container-button' type='submit'>Next</button>
        </form>
    </div>
  )
}

export default ApartmentEntryForm