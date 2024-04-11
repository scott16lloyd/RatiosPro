'use client';

import axios from 'axios';
import { getuser } from '@/utils/supabase/dbFunctions';

export default function LandingPage() {
  const redirectToCheckout = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { data } = await axios.post('/api/payment', {
      headers: { 'Content-Type': 'application/json' },
    });
    window.location.assign(data);
  };
  return (
    <>
      <h1>Landing Page</h1>
      <button onClick={redirectToCheckout}>check out</button>
    </>
  );
}
