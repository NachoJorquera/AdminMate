import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './NotifierForm.css';
import { Link, useParams } from 'react-router-dom';

const NotifierForm = ( { onNext } ) => {
    const { apartment_number } = useParams();
    const [residents, setResidents] = useState([]);
    const [selectedResidents, setSelectedResidents] = useState([]);
    const [deliveryType, setDeliveryType] = useState('');
    const [notificationMethod, setNotificationMethod] = useState('');
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

    useEffect(() => {
        logSelectedResidents();
    }, [selectedResidents]);

    const logSelectedResidents = () => {
        console.log("Selected residents:", selectedResidents);
    };

    const handleDeliveryType = (event) => {
        setDeliveryType(event.target.value);
    };

    const handleNotificationMethod = (event) => {
        setNotificationMethod(event.target.value);
    };

    const handleNotify = () => {
        const notificationData = {
            residents: selectedResidents,
            deliveryType,
            notificationMethod,
        };

        const messages = {
            delivery: 'Su pedido delivery ha llegado y lo está esperando en recepción.',
            package: 'Su paquete ha llegado y está listo para ser retirado en recepción.',
            mail: 'Su correspondencia ha llegado y está lista para ser retirada en recepción.'
        };

        const message = messages[notificationData.deliveryType] || 'Error al seleccionar tipo de encomienda.';
        console.log(message);
        // console.log(notificationData.deliveryType);
        // if (notificationData.deliveryType === 'delivey') {
        //     console.log('Su pedido delivery ha llegado y lo está esperando en recepción.');
        // } else if (notificationData.deliveryType === 'package') {
        //     console.log('Su paquete ha llegado y está listo para ser retirado en recepción.');
        // } else if (notificationData.deliveryType === 'mail') {
        //     console.log('Su correspondencia ha llegado y está lista para ser retirada en recepción.');
        // } else {
        //     console.log('Error al seleccionar tipo de encomienda.')
        // }
        // return notificationData;
        // console.log('Notification Data:', notificationData);
        // console.log(typeof notificationData.deliveryType);
    };
    
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
                    <select id='deliveryType' className='select-box' value={deliveryType} onChange={handleDeliveryType}>
                        <option value='' disabled selected>{t('selectType')}</option>
                        <option value='delivery'>{t('deli')}</option>
                        <option value='package'>{t('package')}</option>
                        <option value='mail'>{t('mail')}</option>
                    </select>
                </div>
                <div className='select'>
                    <label htmlFor='notificationType' className='label'>{t('notiType')}</label>
                    <select id='notificationType' className='select-box' value={notificationMethod} onChange={handleNotificationMethod}>
                        <option value='' disabled selected>{t('selectType')}</option>
                        <option value='wsp'>WhatsApp</option>
                        <option value='email'>{t('email')}</option>
                        <option value='sms'>SMS</option>
                    </select>
                </div>
            </div>
            <div className='card-footer'>
                <Link to='/deliveries' className='button-1'>{t('back')}</Link>
                <button className='button-2' onClick={handleNotify}>{t('notify')}</button>
            </div>
        </div>
    </div>
  )
}

export default NotifierForm