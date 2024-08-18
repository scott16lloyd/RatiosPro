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

  const { error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    return { error: sessionError.message };
  }

  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('full_name') as string,
      },
    },
  });

  if (error) {
    console.error(error);
    return { error: error.message };
  }

  revalidatePath('/', 'layout');

  return { error: null };
}
