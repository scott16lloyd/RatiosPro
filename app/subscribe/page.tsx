import CheckoutButton from '@/components/ui/checkoutButton';
import { getSubscription } from '@/utils/supabase/dbFunctions';
import { createServerClient } from '@/utils/supabase/supabaseServerClient';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function SubscribePage() {
  const supabase = createServerClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.log(error);
    redirect('/sign-in');
  } else {
    const isSubscribed = await getSubscription(data.user.id);

    if (isSubscribed) {
      redirect('/home');
    }
  }
  return (
    <>
      <div>Subscribe page</div>
      <CheckoutButton />
    </>
  );
}
