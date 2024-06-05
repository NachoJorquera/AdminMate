import React from 'react';
import Navbar from '../components/Navbar';
import { useTranslation } from 'react-i18next';
import './Deliveries.css';

function Deliveries() {
    // Uso del hook de traducción para soportar multi-lenguaje
    const { t } = useTranslation();

  return (
    <>
        <Navbar />
        <div className='title-page'>
            <h1>{t('delih1')}</h1>
        </div>
    </>
  )
}

export default Deliveries