import { TopNavBar } from '@/components/ui/top-nav-bar';
import { SearchBar } from '@/components/ui/search-bar';
import { LeftToRightGrid } from '@/components/layouts/left-to-right-grid';
import { UpDownGrid } from '@/components/layouts/up-down-grid';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 overflow-x-hidden">
      <TopNavBar />
      <SearchBar />
      <LeftToRightGrid title="Favourites" />
      <LeftToRightGrid title="Trending" />
      <UpDownGrid title="Discover" />
    </main>
  );
}
