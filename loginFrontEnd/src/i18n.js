import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';

const resources = {
    en: { translation: translationEN },
    es: { translation: translationES }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng:localStorage.getItem('i18nextLng') || 'en',
        fallbackLng: 'en',
        keySeparator: false,
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        }
    });

export default i18n;