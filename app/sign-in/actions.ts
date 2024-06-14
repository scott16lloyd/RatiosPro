'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createServerClient } from '@/utils/supabase/supabaseServerClient';

export async function login(formData: FormData) {
  // Supabase client instance
  const supabase = createServerClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log('error', error);

    if (error) {
      // Return a plain object with the error message
      return { error: error.message };
    }
  }

  revalidatePath('/', 'layout');
  redirect('/home');
  return { error: null };
}

export async function signup(formData: FormData) {
  // Supabase client instance
  const supabase = createServerClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };
  const { error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    return { error: sessionError.message };
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log('error', error);

    if (error) {
      // Return a plain object with the error message
      return { error: error.message };
    }
  }

  revalidatePath('/', 'layout');
  redirect('/home');
  return { error: null };
}
