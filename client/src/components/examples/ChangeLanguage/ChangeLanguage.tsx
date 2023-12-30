import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./changeLanguage.css";

const languages = [
  { code: "en", lang: "English" },
  { code: "fr", lang: "French" },
];

function ChangeLanguage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="btn-container">
      {languages.map((lng) => {
        return (
          <button
            className={lng.code === i18n.language ? "selected" : ""}
            key={lng.code}
            onClick={() => changeLanguage(lng.code)}
          >
            {lng.lang}
          </button>
        );
      })}
    </div>
  );
}

export default ChangeLanguage;
