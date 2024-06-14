import { TopNavBar } from '@/components/ui/top-nav-bar';
import { SearchBar } from '@/components/ui/search-bar';
import { LeftToRightGrid } from '@/components/layouts/left-to-right-grid';
import { UpDownGrid } from '@/components/layouts/up-down-grid';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/utils/supabase/supabaseServerClient';
import { getSubscription } from '@/utils/supabase/dbFunctions';

export default async function Home() {
  const supabase = createServerClient();

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
      <LeftToRightGrid title="Biggest Gainers" fetchType="Biggest Gainers" />
      <LeftToRightGrid title="Trending" fetchType="Trending" />
      <UpDownGrid title="Discover" />
    </main>
  );
}
