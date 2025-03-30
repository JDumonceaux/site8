import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
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

export { default } from 'i18next';
