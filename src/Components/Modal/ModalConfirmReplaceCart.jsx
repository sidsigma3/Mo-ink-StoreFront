// ModalConfirmReplaceCart.js
import React from "react";
import "./ModalSendInvoice.css";

const ModalConfirmReplaceCart = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="msinvoice-overlay">
      <div className="msinvoice-box">
        <button className="msinvoice-close" onClick={onCancel}>
          &times;
        </button>
        <div className="msinvoice-icon msinvoice-icon--primary">
          <span>!</span>
        </div>
        <h2 className="msinvoice-title">Replace Existing Cart?</h2>
        <p className="msinvoice-message">
          Your cart already has some items. Do you want to replace them with items from this order?
        </p>
        <div className="msinvoice-actions">
          <button className="msinvoice-btn msinvoice-btn--outline" onClick={onCancel}>
            Cancel
          </button>
          <button className="msinvoice-btn msinvoice-btn--primary" onClick={onConfirm}>
            Yes, Replace Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmReplaceCart;
