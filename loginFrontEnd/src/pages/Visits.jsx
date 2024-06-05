import React from 'react'
import Navbar from '../components/Navbar'
import PageHeading from '../components/PageHeading';
import './Visits.css'
import { useTranslation } from 'react-i18next';

function Visits() {
  // Uso del hook de traducción para soportar multi-lenguaje
  const { t } = useTranslation();
  
  return (
    <>
        <Navbar />
        <PageHeading>{t('visitsh1')}</PageHeading>
    </>
  )
}

export default Visits