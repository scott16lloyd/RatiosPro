'use client';

import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import React from 'react';

function PaymentsForm() {
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const paymentElement = elements?.getElement('payment');

    try {
      if (!stripe || !paymentElement) {
        // Handle the case where paymentElement is null or undefined
        console.error('Payment element is missing.');
        return;
      }

      // Proceed with creating the payment intent
      const { data } = await axios.post('/api/create-payment-intent', {
        data: { amount: 100 },
      });

      const clientSecret = data;

      await stripe.confirmCardPayment(clientSecret, {
        elements,
        confirmParams: {
          return_url: 'https://example.com/order/123/complete',
        },
      });
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <PaymentElement />
      <button type="submit">Submit</button>
    </form>
  );
}

export default PaymentsForm;
