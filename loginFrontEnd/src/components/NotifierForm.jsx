import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './NotifierForm.css';
import { Link, useParams } from 'react-router-dom';
import { sendNotification } from '../WSP-API';
import i18next from 'i18next';
import Modal from './Modal';
import FormSelect from 'react-bootstrap/FormSelect';

const NotifierForm = ( { onNotificationSent } ) => {
    const { apartment_number } = useParams();
    const [residents, setResidents] = useState([]);
    const [selectedResidents, setSelectedResidents] = useState([]);
    const [deliveryType, setDeliveryType] = useState('');
    const [notificationMethod, setNotificationMethod] = useState('');
    const { t } = useTranslation();
    const [modalChildren, setModalChildren] = useState('');
    const [showModal, setShowModal] = useState(false);

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

    const handleButtonClick = (resident) => {
        setSelectedResidents(prevSelected => {
            if (prevSelected.some(selected => selected.name === resident.name)) {
                return prevSelected.filter(selected => selected.name !== resident.name);
            } else {
                return [...prevSelected, resident];
            }
        });
    };

    useEffect(() => {
        logSelectedResidents();
    }, [selectedResidents]);

    const logSelectedResidents = () => {
        console.log("Selected residents with phone numbers:");
        selectedResidents.forEach(resident => {
            console.log(`Name: ${resident.name}, Phone: ${resident.phone_number}`);
        });
    };

    const handleDeliveryType = (event) => {
        setDeliveryType(event.target.value);
    };

    const handleNotificationMethod = (event) => {
        setNotificationMethod(event.target.value);
    };

    const uiValidation = () => {
        if (selectedResidents.length === 0 && !deliveryType && !notificationMethod) {
            setModalChildren(t('errorNothingSelected'));
            setShowModal(true);
            // alert(t('errorNothingSelected'));
            return false;
        }
        if (selectedResidents.length === 0) {
            setModalChildren(t('errorNoResidentSelected'));
            setShowModal(true);
            // alert(t('errorNoResidentSelected'));
            return false;
        }
        if (!deliveryType) {
            setModalChildren(t('errorNoDeliveryTypeSelected'));
            setShowModal(true);
            // alert(t('errorNoDeliveryTypeSelected'));
            return false;
        }
        if (!notificationMethod) {
            setModalChildren(t('errorNoNotificationMethodSelected'));
            setShowModal(true);
            // alert(t('errorNoNotificationMethodSelected'));
            return false;
        }
        return true;
    };

    const handleNotify = () => {
        if (!uiValidation()) return;

        const notificationData = {
            residents: selectedResidents,
            deliveryType,
            notificationMethod,
        };

        if (notificationData.notificationMethod === 'wsp') {
            selectedResidents.forEach(resident => {
                sendNotification(resident.phone_number, notificationData.deliveryType, i18next.language)
                    .then(response => {
                        onNotificationSent();
                        console.log(`Notification sent successfully to: ${resident.name}`, response);
                        // alert(`Notification sent successfully to: ${resident.name}`, response);
                    })
                    .catch(error => {
                        console.error (`Error sending notification to: ${resident.name}`, error);
                        setModalChildren(`Error sending notification to: ${resident.name}`);
                        setShowModal(true);
                        // alert(`Error sending notification to: ${resident.name}`, error);
                    });
            });
        }
    };
    
  return (
    <div className='d-flex justify-content-center align-items-center'>
        <div className='container-fluid p-3 rounded w-75'>
            <div className='card-body p-2'>
                <h2 className='card-title'>{t('notidetails')}</h2>
                <h4 className='card-subtitle'>{t('notidetails2')}{apartment_number}</h4>
                <div className='card-content'>
                    <div className='resident-buttons'>
                        <label className='label'>{t('selectResi')}</label>
                        <div className='container'>
                            {residents.map((resident, index) => (
                                <button key={index} className={`resident-button ${selectedResidents.some(selected => selected.name === resident.name) ? 'selected' : ''}`} onClick={() => handleButtonClick(resident)}>
                                    {resident.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <br />
                    <div className='container'>
                        <FormSelect value={deliveryType} onChange={handleDeliveryType} size='lg'>
                            <option value='' disabled selected>{t('selectType')}</option>
                            <option value='delivery'>{t('deli')}</option>
                            <option value='package'>{t('package')}</option>
                            <option value='mail'>{t('mail')}</option>
                        </FormSelect>
                    </div>
                    <br />
                    <div className='container'>
                        <FormSelect value={notificationMethod} onChange={handleNotificationMethod} size='lg'>
                            <option value='' disabled selected>{t('notiMethod')}</option>
                            <option value='wsp'>WhatsApp</option>
                            <option value='email'>{t('email')}</option>
                            <option value='sms'>SMS</option>
                        </FormSelect>
                    </div>
                    
                    {/* <div className='select'>
                        <label htmlFor='deliveryType' className='label'>{t('deliType')}</label>
                        <select id='deliveryType' className='select-box' value={deliveryType} onChange={handleDeliveryType}>
                            <option value='' disabled selected>{t('selectType')}</option>
                            <option value='delivery'>{t('deli')}</option>
                            <option value='package'>{t('package')}</option>
                            <option value='mail'>{t('mail')}</option>
                        </select>
                    </div> */}
                    {/* <div className='select'>
                        <label htmlFor='notificationType' className='label'>{t('notiType')}</label>
                        <select id='notificationType' className='select-box' value={notificationMethod} onChange={handleNotificationMethod}>
                            <option value='' disabled selected>{t('selectType')}</option>
                            <option value='wsp'>WhatsApp</option>
                            <option value='email'>{t('email')}</option>
                            <option value='sms'>SMS</option>
                        </select>
                    </div> */}
                </div>
                <div className='card-footer'>
                    <Link to='/deliveries' className='button-1'>{t('back')}</Link>
                    <button className='button-2' onClick={handleNotify}>{t('notify')}</button>
                </div>
                <Modal show={showModal} onClose={() => setShowModal(false)} children={modalChildren} />
            </div>
        </div>
    </div>
  )
}

export default NotifierForm