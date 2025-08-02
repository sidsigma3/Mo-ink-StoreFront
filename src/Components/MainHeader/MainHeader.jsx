import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";


const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();



  const menuItems = [
    { name: t("home"), path: "/#home" },
    { name: t("features"), path: "/#features" },
    { name: t("whyUs"), path: "/#why-us" },
    { name: t("products"), path: "/#products" },
    { name: t("faqs"), path: "/#faqs" },
    { name: t("blogs"), path: "/blogs" },
    { name: t("contactUs"), path: "/#contact" }
  ];

  

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="w-full px-2 py-3  flex justify-between items-center relative z-50">
      {/* Logo + Brand */}
      <div className="flex items-center gap-2">
      <a href="/#home">
  <img
    src="/images/logo.png"
    alt="Logo"
    className=" h-10 object-contain"
  />
</a>

      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-6 text-lg font-semibold text-gray-800">
      {menuItems.map((item) => (
  <HashLink
    key={item.name}
    to={item.path}
    smooth
    onClick={() => setIsOpen(false)} // Close the mobile menu on navigation
    className="hover:text-purple-800 hover:underline transition-colors"
  >
    {item.name}
  </HashLink>
))}

      </nav>

      {/* Desktop Login Button */}
      <div className="hidden lg:block">
        <div className=" d-flex gap-3 align-items-center">
            <div className="">
              <LanguageSwitcher className="w-full " />
            </div>
              {/* <button
                onClick={() => navigate("/login")}
                type="button"
                className="text-base sm:text-lg font-medium rounded-full text-purple-800 py-2 px-10 border-1 border-purple-800 hover:bg-purple-800 hover:text-white transition-colors"
              >
              {t("Sign Up")}
              </button> */}
        </div>
      </div>

      {/* <div className="">
        <LanguageSwitcher className="w-full" />
      </div> */}


      {/* Hamburger Icon for Tablet & Mobile */}
      <div className="lg:hidden">

       <div className="d-flex gap-3">
            <div className="">
              <LanguageSwitcher className="w-full" />
            </div>

        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 right-0 w-3/4 bg-white shadow-xl rounded-2xl border-t border-gray-200 lg:hidden z-40">
          <div className="flex flex-col p-4 space-y-4 text-base font-medium text-gray-800">
            {/* ✅ FIXED: Use HashLink with item.name and item.path */}
            {menuItems.map((item) => (
              <HashLink
                key={item.name}
                to={item.path}
                smooth
                onClick={() => setIsOpen(false)}
                className="hover:text-purple-800 hover:underline transition-colors"
              >
                {item.name}
              </HashLink>
            ))}

           
            {/* <button
              onClick={() => {
                setIsOpen(false); // optional: close mobile menu on nav
                navigate("/login");
              }}
              type="button"
              className="text-base font-medium rounded-full text-purple-800 py-2 px-10 border-1 border-purple-800 hover:bg-purple-800 hover:text-white transition-colors"
            >
             {t("Sign Up")}
            </button> */}
          </div>
        </div>
      )}
    </header>
  );
};

export default MainHeader;
