'use client';

import { SearchResultBentoBox } from '@/components/ui/search-result-bento-box';
import { BentoSkeleton } from '@/components/ui/skeletons/bento-skeleton';
import { SmallBentoBox } from '@/components/ui/small-bento-box';
import { TopNavBar } from '@/components/ui/top-nav-bar';
import { getUsersLikedStocks } from '@/utils/supabase/dbFunctions';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function LikedPage() {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const fetchLikedStocks = async () => {
    const likedStocks = await getUsersLikedStocks();
    return likedStocks;
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ['likedStocks'],
    queryFn: fetchLikedStocks,
  });

  if (error) return 'An error has occurred: ' + error.message;
  return (
    <div className="flex h-screen flex-col items-center justify-center md:gap-4 overflow-x-hidden pb-6">
      <TopNavBar />
      <div className="flex items-center flex-col h-full w-full px-4 md:px-8">
        <div className="w-full text-left pb-4">
          <span className="text-2xl lg:text-3xl">Liked stocks</span>
        </div>
        {isLoading ? (
          <div className="grid place-items-center gap-x-8 gap-y-4 md:gap-y-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-3 items-center w-full xl:w-10/12">
            {Array.from({ length: 8 }).map((_, index) => (
              <div className="sm:w-32 md:w-52 sm:h-24 md:h-36 lg:w-72 lg:h-44 xl:w-80 xl:h-48">
                <BentoSkeleton key={index} />
              </div>
            ))}
          </div>
        ) : data && data.length > 0 ? (
          <div className="grid place-items-center gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-3 items-center w-full">
            {data.map((stock: any, index: number) => (
              <SmallBentoBox
                key={index}
                symbol={stock.stock_symbol}
                name={stock.stock_name}
                price={stock.stock_price}
                changesPercentage={stock.stock_change_percentage}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-row w-full h-1/2 items-center justify-center overflow-hidden">
            <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl">
              No stocks added to favorites yet
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
