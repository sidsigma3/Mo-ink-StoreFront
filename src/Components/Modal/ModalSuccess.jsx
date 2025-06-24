import React, { useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ModalSuccess = ({ isOpen, onClose }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 px-12">
      <div
        ref={wrapperRef}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center"
      >
        <div className="w-full flex justify-center">
          <DotLottieReact
            src="https://lottie.host/dea25119-82ca-47b6-8861-adf3a0c37bf1/0ExcGCznnl.json"
            loop
            autoplay
            style={{ width: '240px', height: '240px' }}
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Order Placed Successfully
        </h2>

        <p className="text-md mb-4 text-gray-500">
          Our confirmation details will be sent shortly. Sit back and relax while we prepare your order!
        </p>
      </div>
    </div>
  );
};

export default ModalSuccess;
