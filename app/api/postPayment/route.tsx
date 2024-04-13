import stripe from 'stripe';
import { NextResponse, NextRequest } from 'next/server';
import { updateUserSubscription } from '@/utils/supabase/dbFunctions';
import { sub } from 'date-fns';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY!);
    const webhookSecret =
      'whsec_de6e045c06143722f008c29ec0517c7928394b3cbcee4cfcedd3c1326744f324';

    console.log('Received webhook event');

    const payload = await req.text();
    const sig = req.headers.get('stripe-signature')!;

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

    console.log(event);

    let userID: string | undefined;
    let subscriptionID: string | stripe.Subscription | undefined;
    let customerMetadata: stripe.Metadata | undefined;

    switch (event.type) {
      case 'checkout.session.completed':
        console.log('Checkout session completed!');
        const session = event.data.object as stripe.Checkout.Session;
        const customer = await stripeInstance.customers.update(
          session.customer as string,
          { metadata: { userID: session.client_reference_id } }
        );
        console.log(customer);
        console.log(session);
        console.log(session.subscription);
        subscriptionID = session.subscription!;
        customerMetadata = customer.metadata;

        break;
      case 'customer.subscription.created':
        console.log('New subscription!');
        const subscription = event.data.object as stripe.Subscription;
        subscriptionID = subscription.id;
        console.log(subscription);
        const stripeCustomer = await stripeInstance.customers.retrieve(
          subscription.customer as string
        );

        console.log(stripeCustomer);

        if ('metadata' in stripeCustomer && stripeCustomer.metadata) {
          userID = stripeCustomer.metadata.userID;
        }
        console.log(userID);
        console.log(subscriptionID);
        if (userID && subscriptionID) {
          await updateUserSubscription(userID, subscriptionID);
        } else {
          console.error('No user ID or subscription ID found');
        }
        // Fetch the user from your database using the customerId
        break;
      case 'invoice.paid':
        console.log('Subscription renewed!');
        if (userID && subscriptionID) {
          await updateUserSubscription(userID, subscriptionID);
        } else {
          console.error('No user ID or subscription ID found');
        }

        break;
      case 'payment_intent.succeeded':
        console.log('PaymentIntent was successful!');
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
