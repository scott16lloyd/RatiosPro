'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/supabaseClient';

// Supabase client instance
const supabase = createClient();

export async function login(formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
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
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/home');
}

export async function signout() {
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
