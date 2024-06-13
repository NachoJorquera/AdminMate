import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './NotifierForm.css';
import { Link, useParams } from 'react-router-dom';

const NotifierForm = ( { onNext } ) => {
    const { apartment_number } = useParams();
    const [residents, setResidents] = useState([]);
    const [selectedResidents, setSelectedResidents] = useState([]);
    const { t } = useTranslation();


    useEffect(() => {
        const fetchResidents = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/deliveries/${apartment_number}`);
                setResidents(response.data);
                // console.log('Residentes del departamento:', response.data.map(resident => resident.name));
            } catch (error) {
                console.error('Error fetching residents:', error);
            }
        };
        fetchResidents();
    }, [apartment_number]);

    const handleButtonClick = (residentName) => {
        setSelectedResidents(prevSelected => {
            if (prevSelected.includes(residentName)) {
                return prevSelected.filter(name => name !== residentName);
            } else {
                return [...prevSelected, residentName];
            }
        });
    };

    // const handleSelectionChange = (event) => {
    //     const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    //     setSelectedResidents(selectedOptions)
    // }

    // const handleSelectionChange = (event) => {
    //     const options = event.target.options;
    //     const selected = [];
    //     for (const option of options) {
    //         if (option.selected) {
    //             selected.push(option.value);
    //         }
    //     }
    //     setSelectedResidents(selected);
    // };

    useEffect(() => {
        logSelectedResidents();
    }, [selectedResidents]);

    const logSelectedResidents = () => {
        console.log("Selected residents:", selectedResidents);
    }
    
  return (
    <div className='container-fluid'>
        <div className='card-body'>
            <h2 className='card-title'>{t('notidetails')}</h2>
            <h4 className='card-subtitle'>{t('notidetails2')}{apartment_number}</h4>
            <div className='card-content'>
                <div className='resident-buttons'>
                    <label className='label'>{t('selectResi')}</label>
                    <div className='container-fluid'>
                        {residents.map((resident, index) => (
                            <button key={index} className={`resident-button ${selectedResidents.includes(resident.name) ? 'selected' : ''}`} onClick={() => handleButtonClick(resident.name)}>
                                {resident.name}
                            </button>
                        ))}
                    </div>
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
                <Link to='/deliveries' className='button-1'>{t('back')}</Link>
                <button className='button-2' onClick={onNext}>{t('notify')}</button>
            </div>
        </div>
    </div>
  )
}

export default NotifierForm