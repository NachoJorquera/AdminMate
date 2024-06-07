import React from 'react';
import { useTranslation } from 'react-i18next';
import './NotifierForm.css';

const NotifierForm = ( { apartmentNumber, onNotify, onBack }) => {
    const { t } = useTranslation();
    
  return (
    <div className='container-fluid'>
        <div className='card-body'>
            <h2 className='card-title'>{t('notidetails')}</h2>
            <h4 className='card-subtitle'>{t('notidetails2')}{apartmentNumber}</h4>
            <div className='card-content'>
                <div className='select'>
                    <label htmlFor='residents' className='label'>{t('selectResi')}</label>
                    <select id='residents' className='select-box'>
                        <option value='' disabled selected>{t('chooseResi')}</option>
                        <option value='resident1'>Resident 1</option>
                        <option value='resident2'>Resident 2</option>
                        <option value='resident3'>Resident 3</option>
                    </select>
                </div>
                <div className='select'>
                    <label htmlFor='deliveryType' className='label'>{t('deliType')}</label>
                    <select id='deliveryType' className='select-box'>
                        <option value='' disabled selected>{t('selectType')}</option>
                        <option value='delivey'>{t('deli')}</option>
                        <option value='package'>{t('package')}</option>
                        <option value='mail'>{t('mail')}</option>
                    </select>
                </div>
                <div className='select'>
                    <label htmlFor='notificationType' className='label'>{t('notiType')}</label>
                    <select id='notificationType' className='select-box'>
                        <option value='' disabled selected>{t('selectType')}</option>
                        <option value='wsp'>WhatsApp</option>
                        <option value='email'>{t('email')}</option>
                        <option value='sms'>SMS</option>
                    </select>
                </div>
            </div>
            <div className='card-footer'>
                <button className='button-1' onClick={onBack}>{t('back')}</button>
                <button className='button-2' onClick={onNotify}>{t('notify')}</button>
            </div>
        </div>
    </div>
  )
}

export default NotifierForm