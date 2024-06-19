import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import './NotiMessage.css';

const NotiMessage = ({ onDeli }) => {
  const { t } = useTranslation();

  return (
    <div className='container-fluid'>
      <div className='card-body'>
        <div className='card-content'>
            <div className='headings'>
                <h2 className='card-title'>{t('notiSent')}</h2>
                <h2 className='card-title'>{t('success')}</h2>
                <h1><FontAwesomeIcon icon={faEnvelopeCircleCheck} /></h1>
            </div>
            <div className='btns'>
                <Link to='/deliveries' className='card-btn'>{t('newDeli')}</Link>
                <Link to='/home' className='card-btn'>{t('home')}</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default NotiMessage