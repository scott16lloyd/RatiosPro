import stripe from 'stripe';
import { NextResponse, NextRequest } from 'next/server';
import {
  removeUserSubscription,
  updateUserSubscription,
} from '@/utils/supabase/dbFunctions';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY!);
    // Local development secret
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    const payload = await req.text();
    console.log('Payload:', payload);
    const sig = req.headers.get('stripe-signature')!;
    console.log('Signature:', sig);

    let event: stripe.Event | null = null;

    try {
      event = stripeInstance.webhooks.constructEvent(
        payload,
        sig,
        webhookSecret
      );
    } catch (err: any) {
      console.error(`Failed to construct event: ${err.message}`);
      return NextResponse.json({
        message: 'Webhook Error',
        error: err.message,
      });
    }

    event = stripeInstance.webhooks.constructEvent(payload, sig, webhookSecret);

    let userID: string | undefined;
    let subscriptionID: string | stripe.Subscription | undefined;
    let customerMetadata: stripe.Metadata | undefined;

    async function handleSubscriptionUpdate(
      stripeInstance: any,
      subscriptionID: string | stripe.Subscription
    ) {
      const subscription = event!.data.object as stripe.Subscription;
      subscriptionID = subscription.id;
      const stripeCustomer = await stripeInstance.customers.retrieve(
        subscription.customer as string
      );

      if (!stripeCustomer || stripeCustomer.deleted) {
        console.error('Customer retrieval failed');
      } else if ('metadata' in stripeCustomer && stripeCustomer.metadata) {
        userID = stripeCustomer.metadata.userID;
      }
      console.log(userID);
      console.log(subscriptionID);
      if (userID && subscriptionID) {
        await updateUserSubscription(userID, subscriptionID);
      } else {
        console.error('No user ID or subscription ID found');
      }
    }

    switch (event.type) {
      case 'checkout.session.completed':
        console.log('Checkout session completed!');
        const session = event.data.object as stripe.Checkout.Session;
        const customer = await stripeInstance.customers.update(
          session.customer as string,
          { metadata: { userID: session.client_reference_id } }
        );
        subscriptionID = session.subscription!;
        customerMetadata = customer.metadata;

        break;
      case 'customer.subscription.created':
        console.log('New subscription!');
        const customerSubscriptionCreated = event.data.object;
        await handleSubscriptionUpdate(
          stripeInstance,
          customerSubscriptionCreated.id
        );
        break;
      case 'customer.subscription.deleted':
        const customerSubscriptionDeleted = event.data.object;
        await removeUserSubscription(
          customerSubscriptionDeleted.customer as string
        );
      case 'customer.subscription.paused':
        const customerSubscriptionPaused = event.data.object;
        await removeUserSubscription(
          customerSubscriptionPaused.customer as string
        );
        break;
      case 'customer.subscription.resumed':
        console.log('Subscription renewed!');
        const customerSubscriptionResumed = event.data.object;
        console.log(customerSubscriptionResumed);
        await handleSubscriptionUpdate(
          stripeInstance,
          customerSubscriptionResumed.id
        );
        break;

      default:
        // Handle other cases
        break;
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error });
  }
}
