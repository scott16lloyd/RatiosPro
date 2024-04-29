'use server';

import stripe from 'stripe';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/supabaseServerClient';

export async function POST() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return NextResponse.redirect('https://ratios-pro.vercel.app/sign-in');
  }
  try {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY!);
    // Calculate the Unix timestamp for 30 days from now
    const futureDate = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
    const session = await stripeInstance.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1P1Zs6D5QdesrOkbqnnpaYBp',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: process.env.SUCCESS_URL || 'http://localhost:3000/success',
      cancel_url: process.env.CANCEL_URL || 'http://localhost:3000/home',
      client_reference_id: data.user.id,
      subscription_data: { billing_cycle_anchor: futureDate },
    });

    console.log(session.client_reference_id);

    return NextResponse.json(session.url);
  } catch (error) {
    NextResponse.json({ message: 'Internal Server Error', error });
    console.error(error);
    return NextResponse.redirect('https://ratios-pro.vercel.app/error');
  }
}
