import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ApartmentEntryForm.css';

const ApartmentEntryForm = ({ onSubmit }) => {
    const [apartmentNumber, setApartmentNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (apartmentNumber.trim() !== '') {
            onSubmit(apartmentNumber);
            setApartmentNumber('');
        }
    }

    // Uso del hook de traducción para soportar multi-lenguaje
    const { t } = useTranslation();

  return (
    <div className='containerr'>
        <div className='cardd'>
            <h2 className='card-title'>{t('apartNum')}</h2>
            <form className='container-form' onSubmit={handleSubmit}>
                <input className='container-input' type='text' value={apartmentNumber} onChange={(e) => setApartmentNumber(e.target.value)} placeholder='Enter apartment number' />
                <button className='container-button' type='submit'>{t('next')}</button>
            </form>
        </div>
        
    </div>
  )
}

export default ApartmentEntryForm