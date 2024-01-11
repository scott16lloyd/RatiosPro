import { TopNavBar } from '@/components/ui/top-nav-bar';
import { SearchBar } from '@/components/ui/search-bar';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <TopNavBar />
      <SearchBar />
    </main>
  );
}
