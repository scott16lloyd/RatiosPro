'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ErrorPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect after 5 seconds (5000 milliseconds)
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    // Clean up the timer if the component is unmounted before 5 seconds
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex flex-col justify-center items-center p-4">
      <h1>You are not a beta user, please join the waitlist.</h1>
      <p>Redirecting in 5 seconds...</p>
    </main>
  );
}
