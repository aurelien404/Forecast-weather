import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const customDetector = {
  name: 'customDetector',
  lookup() {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('fr') ? 'fr' : 'en';
  },
  cacheUserLanguage: false
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['customDetector'],
      detectors: [customDetector]
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;