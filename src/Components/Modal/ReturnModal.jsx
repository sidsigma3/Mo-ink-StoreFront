import React, { useState } from "react";


const ReturnModal = ({ isOpen, onClose, onConfirm}) => {
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!reason) {
      alert("Please select a reason.");
      return;
    }

    onConfirm({ reason, comment });
    setReason("");
    setComment("");
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
            Comment (optional):
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
            rows="3"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-violet-800 text-white hover:bg-violet-700"
            onClick={handleConfirm}
            disabled={!reason}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnModal;
