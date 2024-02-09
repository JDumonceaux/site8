import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';

use(initReactI18next).init({
  debug: true,
  lng: 'en',
  resources: {
    en: {
      translation: {
        greeting: 'Welcome to my mind',
      },
    },
    fr: {
      translation: {
        greeting: 'Bonjour',
      },
    },
  },
});
