import stripe from 'stripe';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/supabaseServerClient';

export async function POST() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.log(error);
    redirect('/sign-in');
  }
  console.log('USER: ' + data);
  console.log(data.user);
  try {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripeInstance.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1P1Zs6D5QdesrOkbqnnpaYBp',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/error',
      client_reference_id: data.user.id,
    });

    return NextResponse.json(session.url);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error });
  }
}
