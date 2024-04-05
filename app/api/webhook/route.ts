import stripe from 'stripe';
import { NextResponse, NextRequest } from 'next/server';
import { updateUserSubscription } from '@/utils/supabase/dbFunctions';
import { getuser } from '@/utils/supabase/dbFunctions';

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: NextRequest, res: NextResponse) {
  const payload = await req.text();
  const response = JSON.parse(payload);

  console.log(response);

  const sig = req.headers.get('stripe-signature');

  const dateTime = new Date(response?.created * 1000).toLocaleDateString();
  const timeString = new Date(response?.created * 1000).toLocaleTimeString();

  try {
    let event = stripeInstance.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log(event);

    if (event.type === 'customer.subscription.created') {
      console.log('condition met');
      await updateUserSubscription();
    }

    console.log('event', event.type);

    return NextResponse.json({ status: 'Success', event: event.type });
  } catch (error) {
    return NextResponse.json({ status: 'Failed', error });
  }
}
