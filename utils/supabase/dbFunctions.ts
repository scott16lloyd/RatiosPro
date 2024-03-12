'use server';

import { supabase } from '@/utils/supabase/supabaseClient';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signUpNewUser(email: string, password: string) {
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

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  console.log('User is signed out');

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.log(error);
  } else {
    console.log(data.user);
    return data;
  }
}
