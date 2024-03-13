import { signout } from '@/utils/supabase/dbFunctions';
import { createClient } from '@/utils/supabase/supabaseClient';
export default async function LandingPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  return (
    <>
      <h1>Landing Page</h1>
      {data ? <h2>Welcome {data.user?.email}</h2> : <h2>Not signed in</h2>}
      <form>
        <button formAction={signout}>sign out</button>
      </form>
    </>
  );
}
