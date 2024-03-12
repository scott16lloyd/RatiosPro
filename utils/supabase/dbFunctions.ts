'use server';

import { createClient } from '@/utils/supabase/supabaseClient';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signUpNewUser(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: 'https://localhost:3000/',
    },
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  revalidatePath('/home', 'layout');
  redirect('/home');
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  revalidatePath('/home', 'layout');
  redirect('/home');
}

export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
  } else {
    revalidatePath('/sign-in', 'layout');
    redirect('/sign-in');
  }
}

export async function getUser() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.log(error);
  } else {
    console.log(data.user);
    return data;
  }
}

export async function protectedRoute() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.log(error);
    redirect('/sign-in');
  }
}
