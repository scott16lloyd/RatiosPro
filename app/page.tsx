'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '@/components/ui/PaymentsForm';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function LandingPage() {
  return (
    <>
      <h1>Landing Page</h1>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </>
  );
}
