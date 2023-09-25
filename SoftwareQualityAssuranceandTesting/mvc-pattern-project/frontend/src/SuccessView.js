import React from 'react';
import './SuccessModal.css';

const SuccessModal = ({ show, onClose, username }) => {
    console.log("SuccessModal.js: username: ", username);
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Success,    {username}!</h2>
        <p>Your account has been succesfully signed up.</p>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
