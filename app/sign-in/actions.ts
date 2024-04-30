'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/supabaseServerClient';

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
    throw new Error(error.name || 'An error occurred during login');
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
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    throw new Error(sessionError.message || 'An error occurred during login');
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw new Error(error.stack || 'An error occurred during login');
  }

  revalidatePath('/', 'layout');
  redirect('/home');
}
