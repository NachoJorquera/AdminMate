import React from 'react'
import Navbar from '../components/Navbar'
import './Parking.css'
import { useTranslation } from 'react-i18next';

function Parking() {
  // Uso del hook de traducción para soportar multi-lenguaje
  const { t } = useTranslation();
  
  return (
    <>
        <Navbar />
        <div className='title'>
            <h1>{t('parkh1')}</h1>
        </div>
    </>
  )
}

export default Parking