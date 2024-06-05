import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation(); // Uso del hook de traducción para soportar multi-lenguaje
    // Función para cambiar idioma de la interfaz
    const changeLanguage = (language) => {
    i18n.changeLanguage(language); // Activa el cambio de idioma
    localStorage.setItem('i18nextLng', language); // Almacena el lenguaje seleccionado en localStorage
    };

  return (
    <div className='leng-btn'>
        <button onClick={() => changeLanguage('en')} className={`btn ${i18n.language === 'en' ? 'active' : ''}`} >En</button>
        <button onClick={() => changeLanguage('es')} className={`btn ${i18n.language === 'es' ? 'active' : ''}`} >Es</button>
    </div>
  )
}

export default LanguageSwitcher