'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/supabaseClient';
import { Subscript } from 'lucide-react';
import { sub } from 'date-fns';

export async function login(formData: FormData) {
  // Supabase client instance
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
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
    console.log(error);
    return error.message;
  }

  revalidatePath('/', 'layout');
  redirect('/home');
}

export async function signout() {
  // Supabase client instance
  const supabase = createClient();

  const { error } = await supabase.auth.signOut({ scope: 'local' });
  if (error) {
    console.log(error);
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

export async function checkLikedStock(stockName: string) {
  const supabase = createClient();
  const { user } = await getuser();

  if (!user) {
    throw new Error('User not found');
  }

  const { data, error } = await supabase
    .from('liked_stocks')
    .select('stock_symbol')
    .eq('user_id', user.id)
    .eq('stock_symbol', stockName);

  if (error) {
    console.error(error);
  }

  if (data) {
    return data.length > 0; // returns true if the user has liked the stock
  }
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

export async function updateUserSubscription() {
  console.log('updateUserSubscription');
  const supabase = createClient();
  const { user } = await getuser();
  console.log(user);

  if (!user) {
    return;
  }

  const timestampz = new Date().toISOString();
  const start_date = new Date();
  let end_date = new Date(start_date);
  end_date.setMonth(end_date.getMonth() + 1);
  const start_date_str = start_date.toLocaleDateString();
  const end_date_str = end_date.toLocaleDateString();

  const data = {
    user_id: user.id,
    subscription_status: true,
    created_at: timestampz,
    subscription_start: start_date_str,
    subscription_end: end_date_str,
    trial: false,
  };

  const { error } = await supabase.from('subscriptions').insert([data]);

  if (error) console.error('Error inserting data:', error);
  else console.log('Data inserted successfully!');
}
