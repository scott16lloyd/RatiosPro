'use client';

import { TopNavBar } from '@/components/ui/top-nav-bar';
import { SearchBar } from '@/components/ui/search-bar';
import {
  fetchBiggestGainers,
  fetchMostPopular,
  fetchMostPopularBySector,
} from '@/hooks';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { HorizontalBentoBox } from '@/components/ui/horizontal-bento-box';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { BentoSkeleton } from '@/components/ui/skeletons/bento-skeleton';

export default function ViewAllPage({
  params,
}: {
  params: { category: string };
}) {
  const category = params.category;
  const [activeButton, setActiveButton] = useState('Technology');

  // Define query options
  type QueryResult = {
    isLoading: boolean;
    error: Error | null;
    data: any;
  };

  // Select fetch function based on category
  const queryBiggestGainers: UseQueryOptions<any, Error> = {
    queryKey: ['fetchBiggestGainers'],
    queryFn: fetchBiggestGainers,
  };

  const queryMostPopular: UseQueryOptions<any, Error> = {
    queryKey: ['fetchMostPopular'],
    queryFn: fetchMostPopular,
  };

  const querySectors: UseQueryOptions<any, Error> = {
    queryKey: ['fetchSectors'],
    queryFn: fetchMostPopularBySector,
  };

  let queryResult: QueryResult | undefined;

  switch (category) {
    case 'Biggest%20Gainers':
      queryResult = useQuery(queryBiggestGainers);
      break;
    case 'Trending':
      queryResult = useQuery(queryMostPopular);
      break;
    case 'Discover':
      queryResult = useQuery(querySectors);
      break;
    default:
      throw new Error(`Unknown category: ${category}`);
  }

  console.log(queryResult);

  if (queryResult.error) {
    return <div>Error: {queryResult.error.message}</div>;
  }

  const changeColor = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const getButtonClass = (buttonName: string) => {
    return activeButton === buttonName
      ? 'dark:bg-white hover:dark:bg-white text-black dark:hover:text-black w-min'
      : 'w-min';
  };

  console.log(queryResult.data);

  return (
    <div className="flex min-h-screen flex-col items-center md:gap-4 overflow-x-hidden">
      <TopNavBar />
      <SearchBar />
      <div className="flex justify-center items-center flex-col w-full h-full">
        <div className="w-full text-left pb-4">
          <span className="text-2xl lg:text-3xl px-4 md:px-16 lg:px-24 xl:px-44">
            {decodeURIComponent(params.category)}
          </span>
        </div>
        <div className="flex justify-center items-center w-full px-4 md:px-16 lg:px-24 xl:px-44">
          <div className="flex justify-between gap-2 lg:gap-4 xl:gap-6 overflow-x-scroll scrollbar-hide items-center max-w-2/3 p-2 pb-4">
            {params.category === 'Discover' &&
              queryResult.data &&
              Object.keys(queryResult.data).map((sector: any) => (
                <Button
                  key={sector}
                  variant="outline"
                  size="sm"
                  onClick={() => changeColor(sector)}
                  className={getButtonClass(sector)}
                >
                  {sector}
                </Button>
              ))}
          </div>
        </div>
        <div className="grid gap-y-4 grid-cols-1 items-center w-full max-w-2/3 px-4 md:px-16 lg:px-24 xl:px-44">
          {queryResult.isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div className="p-1 w-full sm:h-24 md:h-36 lg:h-44">
                  <BentoSkeleton key={index} />
                </div>
              ))
            : params.category === 'Discover' &&
              queryResult.data &&
              queryResult.data[activeButton].map(
                (stock: any, index: number) => (
                  <HorizontalBentoBox
                    key={index}
                    symbol={stock.symbol}
                    name={stock.companyName}
                    price={stock.price}
                    industryOrChange={stock.industry}
                  />
                )
              )}
          {params.category !== 'Discover' &&
            Array.isArray(queryResult.data) &&
            queryResult.data.map((data, index) => (
              <HorizontalBentoBox
                key={index}
                name={data.name}
                symbol={data.symbol}
                price={data.price}
                industryOrChange={
                  data.industry || Number(data.changesPercentage.toFixed(1))
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
}
