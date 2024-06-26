'use client';

import React from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

export default async function CheckoutButton() {
  const redirectToCheckout = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('/api/payment', {
        headers: { 'Content-Type': 'application/json' },
      });
      window.location.assign(data);
    } catch (error) {
      console.error(error);
    }
  };
  return <Button onClick={redirectToCheckout}>check out</Button>;
}
