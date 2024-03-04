'use client';

import { TopNavBar } from '@/components/ui/top-nav-bar';
import { SearchBar } from '@/components/ui/search-bar';
import { LeftToRightGrid } from '@/components/layouts/left-to-right-grid';
import { UpDownGrid } from '@/components/layouts/up-down-grid';
import { fetchBiggestGainers, fetchMostPopular } from '@/hooks/index';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center md:gap-4 overflow-x-hidden">
      <TopNavBar />
      <SearchBar />
      <LeftToRightGrid
        title="Biggest Gainers"
        fetchFunction={fetchBiggestGainers}
      />
      <LeftToRightGrid title="Trending" fetchFunction={fetchMostPopular} />
      <UpDownGrid title="Discover" />
    </main>
  );
}
