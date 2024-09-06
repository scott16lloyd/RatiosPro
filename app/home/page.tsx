import { TopNavBar } from '@/components/ui/top-nav-bar';
import { SearchBar } from '@/components/ui/search-bar';
import { UpDownGrid } from '@/components/layouts/up-down-grid';
import { redirect } from 'next/navigation';
import { getSubscription } from '@/utils/supabase/dbFunctions';
import { RowContainer } from '@/components/layouts/row-container';
import { getuser } from '@/utils/supabase/dbFunctions';

export default async function Home() {
  const user = await getuser();

  if (user) {
    const isSubscribed = await getSubscription(user.user.id);

    if (!isSubscribed) {
      return redirect('/subscribe');
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
