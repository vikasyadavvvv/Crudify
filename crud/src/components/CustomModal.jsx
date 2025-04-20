import React from 'react';
import { FiX } from 'react-icons/fi';

const CustModal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center px-4">
      <div className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 transition"
          aria-label="Close"
        >
          <FiX className="text-2xl" />
        </button>

        {/* Modal Content */}
        <div className="text-gray-800">{children}</div>
      </div>
    </div>
  );
};

export default CustModal;

