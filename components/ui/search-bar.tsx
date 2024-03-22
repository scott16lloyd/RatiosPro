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
import { SetStateAction, useEffect, useState } from 'react';
import { Separator } from './separator';
import { debounce } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const [searchString, setSearchString] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

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
              value={searchString}
              placeholder="Search with a ticker symbol e.g. APPL"
              className="h-full w-11/12 xs:text-xs md:text-lg"
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  router.push(`/view-all/search/${searchString}`);
                }
              }}
            />
            <Button
              className="bg-primary h-full w-14"
              type="submit"
              size="icon"
              onClick={() => {
                router.push(`/view-all/search/${searchString}`);
              }}
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
                <Link
                  href={`/details/${result.symbol}`}
                  onClick={() => {
                    localStorage.setItem('stockName', result.name);
                  }}
                >
                  <div key={index}>
                    <div className="p-2 flex flex-row gap-2 text-md md:text-lg lg:text-2xl hover:cursor-pointer hover:bg-zinc-700 hover:rounded-sm">
                      <span className="font-normal">{result.symbol}</span>
                      <span className=" text-zinc-500 font-light truncate text-ellipsis">
                        {result.name}
                      </span>
                    </div>
                    <Separator />
                  </div>
                </Link>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
