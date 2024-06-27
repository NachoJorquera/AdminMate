import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import PageHeading from '../components/PageHeading';
import NotifierForm from '../components/NotifierForm';
import NotiMessge from '../components/NotiMessage';

function DeliveriesForm() {
    // Uso del hook de traducción para soportar multi-lenguaje
    const { t } = useTranslation();
    const [notificationSent, setNotificationSent] = useState(false);

    const handleNotificationSent = () => {
      setNotificationSent(true);
    };
    
  return (
    <>
        <Navbar />
        <PageHeading>{t('delih1')}</PageHeading>
        {/* <NotifierForm /> */}
        {notificationSent ? (
          <NotiMessge />
        ) : (
          <NotifierForm onNotificationSent={handleNotificationSent} />
        )}
    </>
  )
}

export default DeliveriesForm