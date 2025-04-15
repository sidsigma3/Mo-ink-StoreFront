import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuItems = ["Home", "Features", "Why us", "Products", "FAQs"];


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
    <header className="w-full px-6 py-1 flex justify-between items-center border-b border-gray-200 bg-white relative z-50">
      {/* Logo + Brand */}
      <div className="flex items-center gap-2">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-20 h-20 object-contain"
        />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-6 text-lg font-semibold text-gray-800">
        {menuItems.map((item) => (
          <a
            key={item}
            href="#"
            className="hover:text-purple-800 hover:underline transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Desktop Login Button */}
      <div className="hidden lg:block">
        <button
        onClick={() => navigate("/login")}
          type="button"
          className="text-base sm:text-lg font-medium rounded-full text-purple-800 py-2 px-10 border-1 border-purple-800 hover:bg-purple-800 hover:text-white transition-colors"
        >
          Sign Up
        </button>
      </div>

      {/* Hamburger Icon for Tablet & Mobile */}
      <div className="lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 right-0 w-3/4 bg-white shadow-xl rounded-2xl border-t border-gray-200 lg:hidden z-40">
          <div className="flex flex-col p-4 space-y-4 text-base font-medium text-gray-800">
            {menuItems.map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-purple-800 hover:underline transition-colors"
              >
                {item}
              </a>
            ))}

            <button
            onClick={() => navigate("/login")}
              type="button"
              className="text-base font-medium rounded-full text-purple-800 py-2 px-10 border-1 border-purple-800 hover:bg-purple-800 hover:text-white transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainHeader;
