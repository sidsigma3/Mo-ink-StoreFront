import React, { useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ModalInquirySuccess = ({ isOpen, onClose }) => {
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
            src="https://lottie.host/59560710-528a-44c2-b8ea-89d408356d40/2m5GISkSQc.json"
            loop
            autoplay
            style={{ width: '240px', height: '240px' }}
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          OTP Verified Successfully
        </h2>

        <p className="text-md mb-4 text-gray-500">
          We've confirmed your code. You're all set to proceed with your secure session.
        </p>
      </div>
    </div>
  );
};

export default ModalInquirySuccess;
