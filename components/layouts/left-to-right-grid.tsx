'use client';
import React from 'react';
import { SmallBentoBox } from '@/components/ui/small-bento-box';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { BentoSkeleton } from '@/components/ui/skeletons/bento-skeleton';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
}

interface LeftToRightGridProps {
  title: string;
  fetchFunction: () => Promise<StockData[]>;
}

export function LeftToRightGrid({
  title,
  fetchFunction,
}: LeftToRightGridProps) {
  const { isLoading, error, data } = useQuery({
    queryKey: [title],
    queryFn: fetchFunction,
  });

  console.log('data:', data);

  return (
    <div className="flex w-full h-min-content py-2">
      <div className="w-full px-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl md:mb-2 xs:text-sm sm:text-lg lg:text-xl font-semibold">
            {title}
          </h2>
          <Link className="text-sm md:mb-2 underline" href="#">
            View all
          </Link>
        </div>
        <div className="flex justify-center md:px-10">
          <Carousel
            className="w-full"
            opts={{
              align: 'end',
            }}
          >
            <CarouselContent className="w-full max-w-md">
              {isLoading ? (
                // Display skeleton when data is loading
                Array.from({ length: 6 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-5/12 md:basis-7/12 lg:basis-9/12 xl:basis-10/12"
                  >
                    <div className="p-1 sm:w-32 md:w-52 sm:h-24 md:h-36 lg:w-72 lg:h-44 xl:w-80 xl:h-48">
                      <BentoSkeleton />
                    </div>
                  </CarouselItem>
                ))
              ) : error ? (
                <div>Error: {error.message}</div>
              ) : (
                // Display data when it's loaded
                Array.isArray(data) &&
                data.slice(0, 15).map((data, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-5/12 md:basis-7/12 lg:basis-9/12 xl:basis-10/12"
                  >
                    <div className="p-1">
                      <Link href={`/details/${data.symbol}`}>
                        <SmallBentoBox
                          key={index}
                          symbol={data.symbol}
                          price={data.price}
                          changesPercentage={data.changesPercentage}
                        />
                      </Link>
                    </div>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>

            <CarouselPrevious className="md:flex hidden items-center justify-center" />
            <CarouselNext className="md:flex hidden items-center justify-center" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
