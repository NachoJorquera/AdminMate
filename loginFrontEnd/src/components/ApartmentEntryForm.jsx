import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ApartmentEntryForm.css';

const ApartmentEntryForm = () => {
    const [apartmentNumber, setApartmentNumber] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setApartmentNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8081/check-apartment', {
                apartment_number: apartmentNumber
            });

            if (response.data.exists) {
                navigate(`/deliveries/${apartmentNumber}`);
                console.log('Departamento existente');
                // console.log('apartmentNumber:', apartmentNumber);
                // console.log('apartmentNumber type:', typeof apartmentNumber);
            } else {
                setError(true);
                console.log('No existe un departamento registrado para ese número');
            }
        } catch (err) {
            setError(err.response ? err.response.data : 'Error occurred');
        }
    };

    //Uso del hook de traducción para soportar multi-lenguaje
    const { t } = useTranslation();

  return (
    <div className='container-fluid'>
        <div className='card-body'>
            <label className='card-title' htmlFor='apartmentNumber'>{t('apartNum')}</label>
            <form className='card-form' onSubmit={handleSubmit}>
                <input className='form-control' type='number' id='apartmentNumber' value={apartmentNumber} onChange={handleInputChange} required placeholder={t('apartInput')} />
                <button className='card-button' onClick={handleSubmit}>{t('next')}</button>
            </form>
            <div className='card-footer'>
                {error && <p>{t('apartError')}</p>}
            </div>
        </div>
    </div>
  )
}

export default ApartmentEntryForm