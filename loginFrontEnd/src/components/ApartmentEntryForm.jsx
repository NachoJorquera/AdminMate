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
    <div className='container-fluid'>
        <div className='card-body'>
            <h2 className='card-title'>{t('apartNum')}</h2>
            <form className='card-form' onSubmit={handleSubmit}>
                <input className='form-control' type='text' value={apartmentNumber} onChange={(e) => setApartmentNumber(e.target.value)} placeholder={t('apartInput')} />
                <button className='card-button' type='submit'>{t('next')}</button>
            </form>
        </div>
    </div>
  )
}

export default ApartmentEntryForm