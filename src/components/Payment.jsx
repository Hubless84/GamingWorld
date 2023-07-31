import React from 'react';
import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payment.css';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const totalAmount = location.state.totalAmount;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe has not loaded yet, handle error
      return;
    }

    // Collect payment information from the form
    const cardElement = elements.getElement(CardElement);

    // Create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('Error:', error.message);
      // Display error message to the user
    } else {
      // Payment method created, confirm the PaymentIntent
      // using your server's endpoint
      const response = await fetch('/api/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
      });

      if (response.ok) {
        // Payment successful, show success message
      } else {
        console.log('Payment failed:', response.statusText);
        // Display error message to the user
      }
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Card name holder" />
        <input type="text" name="address" placeholder="Address" />
        <input type="phone" name="phone" placeholder="Enter CellPhone Number" />
        <input type="email" name="email" placeholder="Enter Email" required />
        <CardElement className="card-element" />
        <p> Price to pay :₪{totalAmount}</p>
        <div>
        <button type="submit" disabled={!stripe} className="payment-button">
            Pay Now <Link to="/PaySuccess"></Link>
            </button>
        </div>
    </form>
    );
};

export default Payment;