import React from 'react'
import Navbar from '../components/Navbar'
import PageHeading from '../components/PageHeading';
import './Parking.css'
import { useTranslation } from 'react-i18next';

function Parking() {
  // Uso del hook de traducción para soportar multi-lenguaje
  const { t } = useTranslation();
  
  return (
    <>
        <Navbar />
        <PageHeading>{t('parkh1')}</PageHeading>
    </>
  )
}

export default Parking