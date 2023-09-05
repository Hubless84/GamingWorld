import React from "react";
import { useNavigate } from 'react-router-dom';
import "./PaymentSuccess.css"; // Import your CSS file

const PaymentSuccess = () => {
    const navigate = useNavigate();
  return (
    <div className="payment-success-container">
      <h1 className="payment-success-message">
        The payment was successfully made.
      </h1>
      <p className="payment-success-thankyou">
        An email with the purchase invoice will be sent to your email account.
      </p>
      <button className="payment-success-back-button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;





