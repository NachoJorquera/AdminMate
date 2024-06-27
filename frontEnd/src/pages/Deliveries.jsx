import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import PageHeading from '../components/PageHeading';
import ApartmentEntryForm from '../components/ApartmentEntryForm';

function Deliveries() {
    // Uso del hook de traducción para soportar multi-lenguaje
    const { t } = useTranslation();

  return (
    <>
        <Navbar />
        <PageHeading>{t('delih1')}</PageHeading>
        <ApartmentEntryForm />
    </>
  )
}

export default Deliveries