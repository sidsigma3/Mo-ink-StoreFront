import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = ({ className = "" }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
   <select
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className={`p-2 border rounded ${className}`}
        style={{ appearance: 'auto', WebkitAppearance: 'auto' }}
    >

      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
      <option value="bn">বাংলা</option>
      <option value="ta">தமிழ்</option>
      {/* Add more languages as needed */}
    </select>
  );
};

export default LanguageSwitcher;
