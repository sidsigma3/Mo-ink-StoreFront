import React, { useState } from "react";
import Toast from '../Toast/Toast';

// 🔸 Added `weight` prop
const ReturnModal = ({ isOpen, onClose, onConfirm, weight }) => {
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [returnWeight, setReturnWeight] = useState("");
const [toasts, setToasts] = useState([]);


  if (!isOpen) return null;

  const handleWeightChange = (e) => {
    
    const value = e.target.value;
    // Allow empty string to let user fully clear input
    setReturnWeight(value === "" ? "" : Number(value));
  };
  
  const isSubmitDisabled = !reason || returnWeight <= 0 || returnWeight > weight;

  const handleConfirm = () => {
     const showToast = (message, type = "error") => {
            setToasts([{ message, type }]);
            setTimeout(() => setToasts([]), 3000);
          };
    if (!reason) {
      showToast("Please select a reason.", "error");
      return;
    }

    onConfirm({ reason, comment, returnWeight });
    setReason("");
    setComment("");
    setReturnWeight(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
        <h2 className="text-xl font-bold mb-3 text-gray-900">Return Request</h2>
        <p className="text-gray-700 mb-3">
          Are you sure you want to request a return? Please select a reason below:
        </p>

        <div className="mb-4">
          <label className="block font-medium mb-2 text-gray-800">
            Reason for return:
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="reason"
                value="Color Mismatch"
                checked={reason === "Color Mismatch"}
                onChange={(e) => setReason(e.target.value)}
              />
              <span>Color Mismatch</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="reason"
                value="Quality Issue"
                checked={reason === "Quality Issue"}
                onChange={(e) => setReason(e.target.value)}
              />
              <span>Quality Issue</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-800 mb-1">
            Return Weight (kg): 
          </label>
          <input
            type="number"
            value={returnWeight}
            onChange={handleWeightChange}
            placeholder="Enter weight..."
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            min="1"
            // 🔸 Use weight as max value
            max={weight}
          />    
          {returnWeight !== "" && returnWeight <= 0 && (
            <p className="text-red-500 text-sm mt-2">
              Return weight must be greater than 0
            </p>
          )}
          {returnWeight !== "" && returnWeight > weight && (
            <p className="text-red-500 text-sm mt-2">
              Return weight cannot exceed {weight} kg
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-800 mb-1">
            Comment (optional):
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="3"
          />
        </div>

        <div className="flex justify-between gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-purple-800 text-white hover:bg-purple-700"
            onClick={handleConfirm}
            disabled={isSubmitDisabled}
          >
            Confirm
          </button>
        </div>
      </div>
        {/* Toast Notification */}
     <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() =>
                            setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                        }
                    />
                ))}
            </div>
    </div>
  );
};

export default ReturnModal;
