'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { HorizontalBentoBox } from '../ui/horizontal-bento-box';
import { useQuery } from '@tanstack/react-query';
import { fetchMostPopularBySector } from '@/hooks';
import { BentoSkeleton } from '@/components/ui/skeletons/bento-skeleton';
import { findIndex } from 'lodash';

export function UpDownGrid({ title = 'No title' }: { title: string }) {
  const [activeButton, setActiveButton] = useState('Technology');

  const changeColor = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const getButtonClass = (buttonName: string) => {
    return activeButton === buttonName
      ? 'dark:bg-white hover:dark:bg-white text-black dark:hover:text-black w-min'
      : 'w-min';
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['sectorData'],
    queryFn: fetchMostPopularBySector,
  });

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="group relative flex items-center justify-center p-4 gap-2 w-full h-min-content px-0">
      <div className="w-full relative z-0 px-4 items-center">
        <div className="flex flex-row items-center justify-between">
          <h2 className="mb-6 sm:mb-2 text-2xl xs:text-sm sm:text-lg lg:text-xl font-semibold">
            {title}
          </h2>
          <Link
            className="mb-6 sm:mb-2 text-sm underline"
            href={`/view-all/${title}`}
          >
            View all
          </Link>
        </div>
        <div className="w-full md:px-12 lg:px-14 xl:px-18 2xl:px-28 pb-4">
          <div className="flex justify-between gap-2 lg:gap-4 xl:gap-6 overflow-x-scroll scrollbar-hide">
            {data &&
              Object.keys(data).map((sector: any) => (
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
        <div className="grid grid-flow-row gap-4 sm:gap-4 md:gap-5 xl:gap-7 pt-2 md:px-10 lg:px-14 xl:px-18 2xl:px-28 snap-mandatory scrollbar-hide items-center w-full">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div className="p-1 w-full sm:h-24 md:h-36 lg:h-44" key={index}>
                  <BentoSkeleton key={index} />
                </div>
              ))
            : data &&
              data[activeButton] &&
              data[activeButton]
                .slice(0, 8)
                .map((stock: any, index: number) => (
                  <HorizontalBentoBox
                    key={index}
                    symbol={stock.symbol}
                    name={stock.companyName}
                    price={stock.price}
                    industryOrChange={stock.industry}
                  />
                ))}
        </div>
      </div>
    </div>
  );
}
