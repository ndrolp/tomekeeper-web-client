import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import commonEng from './locales/en/common.json'
import commonEs from './locales/es/common.json'
import libraryEng from './locales/en/library.json'
import libraryEs from './locales/es/library.json'
import dashboardEng from './locales/en/dashboard.json'
import dashboardEs from './locales/es/dashboard.json'

const resources = {
    en: {
        translation: {
            ...libraryEng,
            ...commonEng,
            ...dashboardEng,
        },
    },
    es: {
        translation: {
            ...libraryEs,
            ...commonEs,
            ...dashboardEs,
        },
    },
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'es',
    interpolation: { escapeValue: false },
})

export default i18n
