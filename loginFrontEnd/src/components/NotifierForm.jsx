import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './NotifierForm.css';
import { Link } from 'react-router-dom';

const NotifierForm = ( { apartmentNumber, onNext, onBack }) => {
    const [residents, setResidents] = useState([]);
    const [selectedResidents, setSelectedResidents] = useState([]);
    const [error, setError] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        const fetchResidents = async () => {
            try {
                const response = await axios.get('http://localhost:8081/get-residents', {
                    apartmentNumber: parseInt(apartmentNumber, 10)
                });
                setResidents(response.data);
                console.log('Residentes del departamento:', response.data.map(resident => resident.name));
            } catch (err) {
                setError('Error al obtener la información de los residentes');
            }
        };
        fetchResidents();
    }, [apartmentNumber]);

    const handleSelectionChange = (event) => {
        const options = event.target.options;
        const selected = [];
        for (const option of options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        setSelectedResidents(selected);
    };

    // useEffect(() => {
    //     logSelectedResidents();
    // }, [selectedResidents]);

    // const logSelectedResidents = () => {
    //     console.log("Selected residents:", selectedResidents);
    // }
    
  return (
    <div className='container-fluid'>
        <div className='card-body'>
            <h2 className='card-title'>{t('notidetails')}</h2>
            <h4 className='card-subtitle'>{t('notidetails2')}{apartmentNumber}</h4>
            <div className='card-content'>
                <div className='select'>
                    <label htmlFor='residents' className='label'>{t('selectResi')}</label>
                    <select id='residents' className='select-box' value={selectedResidents} onChange={handleSelectionChange} multiple>
                        {/* <option defaultValue='' disabled selected>{t('chooseResi')}</option> */}
                        {residents.map((resident, index) => (
                            // <option defaultValue='' disabled selected>{t('chooseResi')}</option>,
                            <option key={index} value={resident.name}>{resident.name}</option>
                        ))}
                        {/* <option defaultValue='' disabled selected>{t('chooseResi')}</option>
                        <option value='resident1'>Resident 1</option>
                        <option value='resident2'>Resident 2</option>
                        <option value='resident3'>Resident 3</option> */}
                    </select>
                </div>
                <div className='select'>
                    <label htmlFor='deliveryType' className='label'>{t('deliType')}</label>
                    <select id='deliveryType' className='select-box'>
                        <option defaultValue='' disabled selected>{t('selectType')}</option>
                        <option value='delivey'>{t('deli')}</option>
                        <option value='package'>{t('package')}</option>
                        <option value='mail'>{t('mail')}</option>
                    </select>
                </div>
                <div className='select'>
                    <label htmlFor='notificationType' className='label'>{t('notiType')}</label>
                    <select id='notificationType' className='select-box'>
                        <option defaultValue='' disabled selected>{t('selectType')}</option>
                        <option value='wsp'>WhatsApp</option>
                        <option value='email'>{t('email')}</option>
                        <option value='sms'>SMS</option>
                    </select>
                </div>
            </div>
            <div className='card-footer'>
                <Link to='/deliveries' className='button-1' onClick={onBack}>{t('back')}</Link>
                <button className='button-2' onClick={onNext}>{t('notify')}</button>
            </div>
        </div>
    </div>
  )
}

export default NotifierForm