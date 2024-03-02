import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="flex w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 items-center space-x-2 mb-4 h-12">
      <Input
        type="email"
        placeholder="Search with a ticker symbol e.g. APPL"
        className="h-full w-11/12 xs:text-xs md:text-lg"
      />
      <Button className="bg-primary h-full w-14" type="submit" size="icon">
        <Search size={20} />
      </Button>
    </div>
  );
}
