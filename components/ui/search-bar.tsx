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
import { Separator } from './separator';
import { debounce } from 'lodash';

export function SearchBar() {
  const [searchString, setSearchString] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchString(event.target.value);
    debouncedRefetch();
    setIsOpen(true);
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['search', searchString],
    queryFn: fetchSearchResults,
    enabled: true,
  });

  const debouncedRefetch = debounce(refetch, 300);

  useEffect(() => {
    setIsOpen(searchString.length > 0);
  }, [searchString]);

  if (data) console.log(data);

  // if (isLoading) return 'Loading...';
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
          side="bottom"
          align="start"
          style={{
            width: 'var(--radix-popover-trigger-width)',
            height: '50vh',
            overflowY: 'scroll',
          }}
          onPointerDownOutside={() => setIsOpen(false)}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
        >
          <div className="flex flex-col justify-between lg:gap-4 overflow-hidden">
            {data?.map((result: any, index: number) => {
              return (
                <div key={index}>
                  <div className="p-2 flex flex-row gap-2 text-md md:text-lg lg:text-2xl hover:cursor-pointer hover:bg-zinc-700 hover:rounded-sm">
                    <span className="font-normal">{result.symbol}</span>
                    <span className=" text-zinc-500 font-light truncate text-ellipsis">
                      {result.name}
                    </span>
                  </div>
                  <Separator />
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
