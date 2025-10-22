// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import vi from "./locales/vi.json";
import jp from "./locales/jp.json";
import LanguageDetector from "i18next-browser-languagedetector";


i18n
    .use(LanguageDetector) // phát hiện ngôn ngữ trình duyệt
    .use(initReactI18next).init({
        resources: {
            en: {
                translation: en
            },
            vi: {
                translation: vi
            },
            ja: {
                translation: jp
            },
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
