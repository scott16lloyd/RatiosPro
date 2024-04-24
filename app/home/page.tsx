import { TopNavBar } from '@/components/ui/top-nav-bar';
import { SearchBar } from '@/components/ui/search-bar';
import { LeftToRightGrid } from '@/components/layouts/left-to-right-grid';
import { UpDownGrid } from '@/components/layouts/up-down-grid';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/supabaseServerClient';
import CheckoutButton from '@/components/ui/checkoutButton';
import { getSubscription } from '@/utils/supabase/dbFunctions';

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.log(error);
    redirect('/sign-in');
  } else {
    console.log(data.user);
    const isSubscribed = await getSubscription(data.user.id);

    console.log(isSubscribed);

    if (!isSubscribed) {
      redirect('/subscribe');
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center md:gap-4 overflow-x-hidden">
      <TopNavBar />
      <SearchBar />
      <CheckoutButton />
      <LeftToRightGrid title="Biggest Gainers" fetchType="Biggest Gainers" />
      <LeftToRightGrid title="Trending" fetchType="Trending" />
      <UpDownGrid title="Discover" />
    </main>
  );
}
