import i18n, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

import en from "./localization/en.json";
import tr from "./localization/tr.json";

export const LANGUAGE_STORAGE_KEY = "lang";

const LANGUAGE_DETECTOR: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: (callback: (language: string) => void) => {
    AsyncStorage.getItem(LANGUAGE_STORAGE_KEY, (err, language) => {
      if (err || !language) {
        callback(Localization.locale);
        return;
      }
      callback(language);
    });
  },
  init: () => {},
  cacheUserLanguage: (language: string) => {
    AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  },
};

i18n
  .use(LANGUAGE_DETECTOR) // Use custom language detector
  .use(initReactI18next) // Bind react-i18next to the i18next instance
  .init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
    },
    fallbackLng: "en",
    compatibilityJSON: "v3",
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
