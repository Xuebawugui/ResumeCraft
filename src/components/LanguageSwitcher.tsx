import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex gap-3 text-sm">
      <button onClick={() => i18n.changeLanguage("zh")}>中文</button>
      <button onClick={() => i18n.changeLanguage("en")}>EN</button>
      <button onClick={() => i18n.changeLanguage("jp")}>JP</button>
    </div>
  );
}
