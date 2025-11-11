import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh from "./zh.json";
import en from "./en.json";
import jp from "./jp.json";

// 初始化 i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      zh: { translation: zh },
      en: { translation: en },
      jp: { translation: jp },
    },
    lng: "zh",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;