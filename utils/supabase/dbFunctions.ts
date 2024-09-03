'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/supabaseServerClient';
import { createLocalClient } from '@/utils/supabase/supabaseClient';
import { createServiceClient } from '@/utils/supabase/supabaseServiceClient';
import stripe from 'stripe';

export async function login(formData: FormData) {
  // Supabase client instance
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    return error.message;
  } else {
    supabase.auth.refreshSession();
  }

  revalidatePath('/', 'layout');
  redirect('/home');
}

export async function signup(formData: FormData) {
  // Supabase client instance
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return error.message;
  }

  revalidatePath('/', 'layout');
  redirect('/home');
}

export async function signout() {
  // Supabase client instance
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
  }
  revalidatePath('/', 'layout');
  redirect('/sign-in');
}

export async function getuser() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    redirect('/sign-in');
  } else {
    return data;
  }
}

export async function addLikedStock(
  stock_symbol: string,
  stock_name: string,
  stock_price: number,
  stock_change_percentage: number
) {
  const supabase = createClient();

  const { user } = await getuser();

  if (!user) {
    throw new Error('User not found');
  }

  const { data, error } = await supabase.from('liked_stocks').insert([
    {
      user_id: user.id,
      stock_symbol: stock_symbol,
      stock_name: stock_name,
      stock_price: stock_price,
      stock_change_percentage: stock_change_percentage,
    },
  ]);

  if (error) {
    console.error(error);
  }
}

export async function removeLikedStock(stockName: string) {
  const supabase = createClient();

  const { user } = await getuser();

  if (!user) {
    throw new Error('User not found');
  }

  const { data, error } = await supabase
    .from('liked_stocks')
    .delete()
    .eq('user_id', user.id)
    .eq('stock_symbol', stockName);

  if (error) {
    console.error(error);
  }
}

const inMemoryCache: Record<string, string[]> = {};

export async function checkLikedStock(stockName: string): Promise<boolean> {
  const supabase = createClient();
  const { user } = await getuser();

  if (!user) {
    throw new Error('User not found');
  }

  // Determine if localStorage is available (i.e., running in a browser environment)
  const isBrowser =
    typeof window !== 'undefined' && typeof localStorage !== 'undefined';

  const cacheKey = `liked_stocks_${user.id}`;
  let likedStocks: string[] | null = null;

  if (isBrowser) {
    likedStocks = JSON.parse(localStorage.getItem(cacheKey) || 'null');
  } else {
    likedStocks = inMemoryCache[cacheKey] || null;
  }

  if (!likedStocks) {
    const { data, error } = await supabase
      .from('liked_stocks')
      .select('stock_symbol')
      .eq('user_id', user.id);

    if (error) {
      console.error(error);
      return false;
    }

    likedStocks = data.map((stock) => stock.stock_symbol);

    if (isBrowser) {
      localStorage.setItem(cacheKey, JSON.stringify(likedStocks));
    } else {
      inMemoryCache[cacheKey] = likedStocks; // No error here since likedStocks is now string[]
    }
  }

  return likedStocks.includes(stockName);
}

export async function getUsersLikedStocks() {
  const supabase = createClient();
  const { user } = await getuser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('liked_stocks')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error(error);
  }

  return data || [];
}

export async function updateUserSubscription(
  userID: string | null,
  subscriptionId: string | stripe.Subscription | null
) {
  const supabase = createClient();

  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY!);

  const subscription = await stripeInstance.subscriptions.retrieve(
    subscriptionId as string
  );

  const data = {
    user_id: userID,
    subscription_id: subscription.id,
    status: subscription.status,
    subscription_period_start: new Date(
      subscription.current_period_start * 1000
    ).toISOString(),
    subscription_period_end: new Date(
      subscription.current_period_end * 1000
    ).toISOString(),
    subscription_start: new Date(subscription.start_date * 1000).toISOString(),
    subscription_end: subscription.ended_at
      ? new Date(subscription.ended_at * 1000).toISOString()
      : null,
    stripe_customer_id: subscription.customer,
  };

  const { error } = await supabase
    .from('subscribers')
    .upsert([data], { onConflict: 'user_id' });

  if (error) {
    console.error('Error inserting data:', error);
    return { error };
  } else {
    return {};
  }
}

export async function removeUserSubscription(stripeCustomerID: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('subscribers')
    .update({ status: 'inactive' })
    .eq('stripe_customer_id', stripeCustomerID);

  if (error) {
    console.error('Error removing user subscription', error);
    return { error };
  } else {
    return {};
  }
}

export async function getSubscription(userID: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .eq('user_id', userID);

  if (error) {
    console.error('Error getting subscription', error);
    return { error };
  }

  if (!data || data.length === 0) {
    // No subscription found for the user
    return { error: 'No subscription found' };
  }

  const subscription = data[0];

  if (subscription.status === 'active') {
    return true;
  } else {
    return false;
  }
}

export async function addWaitlister(email: string) {
  const supabase = createServiceClient();

  const { error } = await supabase.from('waitlisters').insert([
    {
      email: email,
    },
  ]);

  if (error) {
    console.error('Error adding to waitlist', error);
    return { error: error.message };
  } else {
    return {};
  }
}

export async function updateUserEmail(email: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.updateUser({
    email: email,
  });

  if (error) {
    console.error('Error updating email', error);
    return { error: error.message };
  } else {
    return { error: null };
  }
}

export async function updateUsername(username: string) {
  const supabase = createClient();
  const { user } = await getuser();

  if (!user) {
    return [];
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: username,
    })
    .eq('id', user.id);

  if (error) {
    console.error('Error updating username', error);
    return { error: error.message };
  } else {
    return { error: null };
  }
}

export async function getUsername() {
  const supabase = createClient();
  const { user } = await getuser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id);

  if (error) {
    console.error('Error getting username', error);
    return { error: error.message };
  }

  return data;
}

export async function resetPasswordRequest(email: string) {
  // Sends an email with password reset URL
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo:
      process.env.NEXT_PUBLIC_REDIRECT_URL + '/account/password-change',
  });

  if (error) {
    console.error(error);
    console.error('Error requesting password reset', error);
    return { error: error.message };
  } else {
    return { error: null };
  }
}

export async function resetPassword(password: string) {
  // Takes the new password and updates the user's password
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error(error);
    console.error('Error resetting password.', error);
    return { error: error.message };
  } else {
    return { error: null };
  }
}

export async function inviteUser(email: string) {
  // Sends an invite to the email provided
  const supabase = createServiceClient();

  const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL + '/set-password', //Redirects to a set password page
  });

  if (error) {
    console.error('Error inviting user', error);
    return { error: error.message };
  } else {
    return { error: null };
  }
}
