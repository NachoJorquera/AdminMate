import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './NotiMessage.css';

const NotiMessage = ({ onDeli }) => {
  const { t } = useTranslation();
  
  return (
    <>
    <div className='card'>
        <div className='card-content'>
            <div className='headings'>
                <h2 className='card-title'>{t('notiSent')}</h2>
                <h2 className='card-title'>{t('success')}</h2>
            </div>
            <div className='btns'>
                <button className='card-btn' onClick={onDeli}>{t('newDeli')}</button>
                <Link to='/home' className='card-btn'>{t('home')}</Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default NotiMessage