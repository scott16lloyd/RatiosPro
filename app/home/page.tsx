import { TopNavBar } from '@/components/ui/top-nav-bar';
import { SearchBar } from '@/components/ui/search-bar';
import { UpDownGrid } from '@/components/layouts/up-down-grid';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/supabaseServerClient';
import { getSubscription } from '@/utils/supabase/dbFunctions';
import { RowContainer } from '@/components/layouts/row-container';

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.log(error);
    redirect('/sign-in');
  } else {
    const isSubscribed = await getSubscription(data.user.id);

    if (!isSubscribed) {
      redirect('/subscribe');
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center md:gap-4 overflow-x-hidden">
      <TopNavBar />
      <SearchBar />
      <RowContainer />
      <UpDownGrid title="Discover" />
    </main>
  );
}
