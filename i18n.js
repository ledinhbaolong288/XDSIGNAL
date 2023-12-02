import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './src/dataJSON/en.json';
import vn from './src/dataJSON/vn.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    vn: vn,
  },
  interpolation: {
    escapeValue: false // react already safes from xss 
  }
});

export default i18n; 