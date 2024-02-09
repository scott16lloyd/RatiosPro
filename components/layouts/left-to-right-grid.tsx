'use client';
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SmallBentoBox } from '@/components/ui/small-bento-box';
import { ChevronLeftIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
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

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="flex w-full h-min-content px-0">
      <div className="w-full px-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="mb-6 text-2xl xs:text-sm sm:text-lg lg:text-xl font-semibold">
            {title}
          </h2>
          <Link className="mb-6 text-sm underline" href="#">
            View all
          </Link>
        </div>
        <div className="flex justify-center md:px-10">
          <Carousel
            className="w-full"
            opts={{
              align: 'start',
            }}
          >
            <CarouselContent className="w-full max-w-md">
              {isLoading
                ? // Display skeleton when data is loading
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
                : // Display data when it's loaded
                  data &&
                  data.map((data, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-5/12 md:basis-7/12 lg:basis-9/12 xl:basis-10/12"
                    >
                      <div className="p-1">
                        <SmallBentoBox
                          key={index}
                          symbol={data.symbol}
                          price={data.price}
                          changesPercentage={data.changesPercentage}
                        />
                      </div>
                    </CarouselItem>
                  ))}
            </CarouselContent>

            <CarouselPrevious className="md:flex hidden items-center justify-center" />
            <CarouselNext className="md:flex hidden items-center justify-center" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
