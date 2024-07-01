import React from 'react'
import Navbar from '../components/Navbar'
import PageHeading from '../components/PageHeading';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";

function Home() {
    // Uso del hook de traducción para soportar multi-lenguaje
    const { t } = useTranslation();
  
  return (
    <>
        <Navbar />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <PageHeading>{t('welcome')}<FontAwesomeIcon icon={faBuilding} /></PageHeading>
    </>
  )
}

export default Home