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
    console.error(error);
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/home');

  return { error: null };
}

export async function signup(formData: FormData) {
  // Supabase client instance
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('full_name') as string,
      },
    },
  });

  // Check if there was an error during signup
  if (error) {
    return { error: error.message || 'Unknown error occurred' }; // Handle null message
  }

  // Check if user data is returned (i.e., signup was successful)
  if (data && data.user) {
    revalidatePath('/', 'layout');
    return { error: null }; // No error, signup was successful
  }

  // If no user data and no error, return a generic error message
  return { error: 'Signup failed for unknown reasons' };
}
