import React from 'react'
import Navbar from '../components/Navbar'
import './Visits.css'
import { useTranslation } from 'react-i18next';

function Visits() {
  // Uso del hook de traducción para soportar multi-lenguaje
  const { t } = useTranslation();
  
  return (
    <>
        <Navbar />
        <div className='title'>
            <h1>{t('visitsh1')}</h1>
        </div>
    </>
  )
}

export default Visits