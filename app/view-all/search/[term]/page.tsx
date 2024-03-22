'use client';

import { HorizontalBentoBox } from '@/components/ui/horizontal-bento-box';
import { SearchBar } from '@/components/ui/search-bar';
import { SearchResultBentoBox } from '@/components/ui/search-result-bento-box';
import { BentoSkeleton } from '@/components/ui/skeletons/bento-skeleton';
import { TopNavBar } from '@/components/ui/top-nav-bar';
import { fetchSearchResults } from '@/hooks/index';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function SearchPage({ params }: { params: { term: string } }) {
  const term = params.term;

  const { isLoading, error, data } = useQuery({
    queryKey: ['search', term],
    queryFn: fetchSearchResults,
  });

  if (data) console.log(data);

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center md:gap-4 overflow-x-hidden">
      <TopNavBar />
      <SearchBar />
      <div className="flex justify-center items-center flex-col h-full max-w-10/12">
        <div className="w-full text-left pb-4">
          <span className="text-2xl lg:text-3xl px-4">{`Search for "${term}"`}</span>
        </div>
        <div className="grid place-items-center gap-x-8 gap-y-4 md:gap-y-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-center px-4 max-w-10/12">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div className="sm:w-32 md:w-52 sm:h-24 md:h-36 lg:w-72 lg:h-44 xl:w-80 xl:h-48">
                  <BentoSkeleton key={index} />
                </div>
              ))
            : data.map((stock: any, index: number) => (
                <SearchResultBentoBox
                  key={index}
                  symbol={stock.symbol}
                  name={stock.name}
                  exchangeShortName={stock.exchangeShortName}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
