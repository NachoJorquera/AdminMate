// Importación de módulos necesarios
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';

// Configuración de los recursos de traducción
const resources = {
    en: { translation: translationEN }, // Asocia las traducciones en inglés
    es: { translation: translationES } // Asocia las traducciones en español
};

// Inicialización de i18n
i18n
    .use(initReactI18next) // Decirle a i18n que use el plugin de integraciión con React
    .init({
        resources, // Establece los recursos de traducción definidos anteriormente
        lng:localStorage.getItem('i18nextLng') || 'en', // Define el idioma inicial, intentando recuperarlo de localStorage o por defecto en inglés.
        fallbackLng: 'en', // Establecer el idioma de reserva en caso de que no se encuentren traducciónes
        keySeparator: false, // Deshabilita el uso de separadores de claves para acceder a las traducciones
        interpolation: {
            escapeValue: false // Desactiva el escape de valores de interpolación
        },
        detection: {
            order: ['localStorage', 'navigator'], // Define el orden de los métodos de detección del idioma
            caches: ['localStorage'] // Configura los lugares donde se almacenarán los daros del idioma detectado
        }
    });

export default i18n;