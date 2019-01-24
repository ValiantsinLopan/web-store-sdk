import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

const options = {
  fallbackLng: 'en-US',
  debug: true,
  load: 'currentOnly',
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  nsSeparator: false,
  keySeparator: false,
  returnEmptyString: false,
  returnNull: false,
  wait: true,
  // react i18next special options (optional)
  react: {
    wait: false,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default',
  },
  backend: {
    // for all available options read the backend's repository readme file
    loadPath: (lng, ns) => `/locales/${lng[0]}/${ns}.json`,
  },
};

if (typeof XMLHttpRequest === 'undefined') {
  i18n
    .use(LanguageDetector)
    .use(reactI18nextModule) // if not using I18nextProvider
    .init(options);
} else {
  i18n
    .use(XHR)
    .use(LanguageDetector)
    .use(reactI18nextModule) // if not using I18nextProvider
    .init(options);
}
export default i18n;
