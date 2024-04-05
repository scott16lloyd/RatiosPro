'use client';
import { getuser } from '@/utils/supabase/dbFunctions';
export default function LandingPage() {
  const redirectToCheckout = async () => {
    const { user } = await getuser();
    window.location.href = `https://buy.stripe.com/test_9AQ3gagMB7G41dC7ss?userId=${user.id}`;
  };
  return (
    <>
      <h1>Landing Page</h1>
      <button onClick={redirectToCheckout}>check out</button>
    </>
  );
}
