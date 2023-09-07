import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';
import { ShopContext } from './Shop-Context';

const Payment = () => {
  const [popupStyle, setPopupStyle] = useState('hide');
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();
  const { getProductsInCart, getTotalCartAmount, resetCart } = useContext(ShopContext);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showPopup = (message) => {
    setPopupMessage(message);
    setPopupStyle('payment-popup');
    setTimeout(() => hidePopup(), 3000);
  };

  const hidePopup = () => {
    setPopupStyle('hide');
    setPopupMessage('');
  };

  const [paymentStatus, setPaymentStatus] = useState(null); // To track payment status
  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    address: '',
    phone: '',
    email: '',
    cardNumber: '',
    cardValidity: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send payment data to the server

    try {
      // Phone number check
      if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
        showPopup('Phone number is incorrect');
        return;
      }
      // Email check
      if (!isValidEmail(formData.email)) {
        showPopup('Email is incorrect');
        return;
      }
      // Card number check
      if (formData.cardNumber.length !== 16) {
        showPopup('Card number is incorrect');
        return;
      }

      const response = await fetch('/api/payment-success', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: getTotalCartAmount(),
          product_name: getProductsInCart().map((product) => product.name),
        }),
      });

      if (response.ok) {
        setPaymentStatus('success');
        resetCart();
        navigate('/PaymentSuccess'); 
      } else {
        console.log('Payment failed:', response.statusText);
        setPaymentStatus('error');
      }
    } catch (error) {
      console.error('Error sending payment details:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <input type="text" name="fullName" placeholder="Card name holder" value={formData.fullName} onChange={handleInputChange} required />
      <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required/>
      <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} required/>
      <input type="phone" name="phone" placeholder="Enter CellPhone Number" value={formData.phone} onChange={handleInputChange} />
      <input type="email" name="email" placeholder="Enter Email" required value={formData.email} onChange={handleInputChange} />
      <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} />
      <input type="date" name="cardValidity" placeholder="Card Validity" value={formData.cardValidity} onChange={handleInputChange} />
      <p>Price to pay:{getTotalCartAmount()}₪</p>
      {paymentStatus === 'success' ? (
        <div className="payment-success-message">
          Payment was successful!
        </div>
      ) : paymentStatus === 'error' ? (
        <div className="payment-error-message">Payment was not successful. Please try again.</div>
      ) : (
        <div>
          <button type="submit" className="payment-button">
            Pay Now
          </button>
        </div>
      )}

      <div className={popupStyle}>
        <h3>Payment Status</h3>
        <p>{popupMessage}</p>
      </div>
    </form>
  );
};

export default Payment;
