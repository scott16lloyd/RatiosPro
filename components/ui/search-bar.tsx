'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { fetchSearchResults } from '@/hooks/index';
import { useQuery } from '@tanstack/react-query';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { SetStateAction, useEffect, useState } from 'react';

export function SearchBar() {
  const [searchString, setSearchString] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(searchString.length > 0);
  }, [searchString]);

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchString(event.target.value);
    () => refetch();
    setIsOpen(true);
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['search', searchString],
    queryFn: fetchSearchResults,
    enabled: false,
  });

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="flex w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 items-center h-12 mb-4">
      <Popover open={isOpen}>
        <PopoverTrigger asChild>
          <div className="flex flex-row w-full h-full space-x-2">
            <Input
              type="text"
              placeholder="Search with a ticker symbol e.g. APPL"
              className="h-full w-11/12 xs:text-xs md:text-lg"
              onChange={handleSearchChange}
            />
            <Button
              className="bg-primary h-full w-14"
              type="submit"
              size="icon"
            >
              <Search size={20} />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-full"
          align="start"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
        >
          <div className="grid gap-4">
            <span>search data</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
