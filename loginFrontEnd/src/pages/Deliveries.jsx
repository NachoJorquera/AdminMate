import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import PageHeading from '../components/PageHeading';
import ApartmentEntryForm from '../components/ApartmentEntryForm';
import NotifierForm from '../components/NotifierForm';
import NotiMessage from '../components/NotiMessage';
import './Deliveries.css';

function Deliveries() {
    // Uso del hook de traducción para soportar multi-lenguaje
    const { t } = useTranslation();

    const [apartmentNumber, setApartmentNumber] = useState('');
    const [step, setStep] = useState(1);

    const handleApartmentSubmit = (number) => {
        setApartmentNumber(number);
        setStep(2);
    };

    const handleNotify = () => {
        setStep(3)
    }

    const handleBack = () => {
        setStep(1);
    }

    const handleDeli = () => {
        setStep(1);
    }

  return (
    <>
        <Navbar />
        <PageHeading>{t('delih1')}</PageHeading>
        {step === 1 && <ApartmentEntryForm onSubmit={handleApartmentSubmit} />}
        {step === 2 && <NotifierForm apartmentNumber={apartmentNumber} onNotify={handleNotify} onBack={handleBack}/>}
        {step === 3 && <NotiMessage onDeli={handleDeli} />}
    </>
  )
}

export default Deliveries