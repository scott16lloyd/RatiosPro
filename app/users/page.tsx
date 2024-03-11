import { createClient } from '@/utils/supabase/server';

export default async function Notes() {
  const supabase = createClient();
  let users;
  try {
    const { data, error } = await supabase.from('test').select();
    if (error) throw error;
    users = data;
  } catch (error) {
    console.error('Error fetching users: ', (error as Error).message);
    users = [];
  }

  console.log(users);

  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
