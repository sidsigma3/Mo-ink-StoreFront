import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const ModalAddressDelete = ({ isOpen, onCancel, onConfirm }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 px-12">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center relative"
      >
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>

        {/* Icon Circle */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600 text-xl font-bold">!</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Delete this address?
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-6">
          This action cannot be undone. Are you sure you want to delete this address?
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddressDelete;
