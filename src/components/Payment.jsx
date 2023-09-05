import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';
import { ShopContext } from "./Shop-Context";

const Payment = () => {
  const navigate = useNavigate();
  const { getProductsInCart, getTotalCartAmount,resetCart } = useContext(ShopContext);

  const [paymentStatus, setPaymentStatus] = useState(null); // To track payment status
  const [formData, setFormData] = useState({
    name: '',
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
        // Payment successful, show success message
        setPaymentStatus('success');
        resetCart();
        navigate('/PaymentSuccess'); // Redirect to success page

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
      <input type="text" name="name" placeholder="Card name holder" onChange={handleInputChange} />
      <input type="text" name="city" placeholder="City" onChange={handleInputChange} />
      <input type="text" name="address" placeholder="Address" onChange={handleInputChange} />
      <input type="phone" name="phone" placeholder="Enter CellPhone Number" onChange={handleInputChange} />
      <input type="email" name="email" placeholder="Enter Email" required onChange={handleInputChange} />
      <input type="text" name="cardNumber" placeholder="Card Number" onChange={handleInputChange} />
      <input type="date" name="cardValidity" placeholder="Card Validity" onChange={handleInputChange} />
      <p>Price to pay: ₪{getTotalCartAmount()}</p>
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
    </form>
  );
};

export default Payment;
