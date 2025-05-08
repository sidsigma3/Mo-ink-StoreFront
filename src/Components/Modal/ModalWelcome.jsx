import React, { useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ModalWelcome = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    const justLoggedIn = localStorage.getItem("justLoggedIn") === "true";
    if (justLoggedIn) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const name = userData?.customerName || "Customer";

      setCustomerName(name);
      setShowWelcome(true);

      localStorage.removeItem("justLoggedIn");

      setTimeout(() => {
        setShowWelcome(false);
      }, 4000);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowWelcome(false);
      }
    };

    if (showWelcome) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showWelcome]);

  return (
    <div className='w-full'>
      {showWelcome && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center"
            ref={modalRef}
          >
            <div className="w-full flex justify-center">
              <DotLottieReact
                src="https://lottie.host/49e747f4-b776-40d5-b9c2-3885bc288c68/au3CuH3NU1.lottie"
                loop
                autoplay
                style={{ width: '160px', height: '160px' }}
              />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome {customerName}!
            </h2>

            <p className="text-md mb-4 text-gray-500">
              We're delighted to welcome you aboard! Take a moment, explore our collections, and discover products crafted with care.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalWelcome;
