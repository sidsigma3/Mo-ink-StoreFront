import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, Globe } from "lucide-react";
import { IoLanguage } from "react-icons/io5";


const LanguageSwitcher = ({ className = "" }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "od", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা" },
    { code: "ta", name: "Tamil", nativeName: "தমিழ்" }
  ];

  const currentLang = languages.find(lang => lang.code === i18n.language);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Mobile View - Icon and Language Codes */}
      <div className="sm:hidden">
        {/* Mobile Icon Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-purple-800 focus:border-transparent"
        >
          <IoLanguage className="w-5 h-5 text-gray-600" />
        </button>

        {/* Mobile Language Selection */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Language Options */}
            <div className="absolute top-full right-0 mt-1 flex bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`px-3 py-2 text-xs font-medium uppercase transition-colors duration-150 ${
                    i18n.language === language.code 
                      ? 'bg-purple-800 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {language.code}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Desktop View - Dropdown */}
      <div className="hidden sm:block">
        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-purple-800 focus:border-transparent w-full"
        >
          <IoLanguage className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 flex-1 text-left">
            {currentLang?.nativeName || "Select"}
          </span>
          <ChevronDown 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-150 flex items-center gap-3 ${
                    i18n.language === language.code 
                      ? 'bg-purple-100 text-purple-800 border-r-2 border-purple-500' 
                      : 'text-gray-700'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {language.nativeName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {language.name}
                    </span>
                  </div>
                  {i18n.language === language.code && (
                    <div className="ml-auto w-2 h-2 bg-purple-800 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};


export default LanguageSwitcher;