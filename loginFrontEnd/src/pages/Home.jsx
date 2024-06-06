import React from 'react'
import Navbar from '../components/Navbar'
import PageHeading from '../components/PageHeading';
import { useTranslation } from 'react-i18next';

function Home() {
    // Uso del hook de traducción para soportar multi-lenguaje
    const { t } = useTranslation();
  
  return (
    <>
        <Navbar />
        <PageHeading>HOME</PageHeading>
    </>
  )
}

export default Home