'use client';

import react, { useState } from 'react';
import { Car, Link } from 'lucide-react';
import { Button } from '../ui/button';
import { HorizontalBentoBox } from '../ui/horizontal-bento-box';
import { useQuery } from '@tanstack/react-query';
import { fetchMostPopularBySector } from '@/hooks';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export function UpDownGrid({ title = 'No title' }: { title: string }) {
  const [activeButton, setActiveButton] = useState('popular');

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

  console.log(data);

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="group relative flex items-center justify-center p-4 gap-2 w-full h-min-content px-0">
      <div className="w-full relative z-0 px-4 items-center">
        <div className="flex flex-row justify-between w-full">
          <h2 className="mb-6 text-2xl xs:text-sm sm:text-lg lg:text-xl font-semibold w-full">
            {title}
          </h2>
          <Link className="mb-6 text-sm underline" href="#">
            View all
          </Link>
        </div>
        <div className="w-full lg:px-28 2xl:px-64 xl:px-46 pb-4">
          <Carousel
            className=""
            opts={{
              align: 'start',
              dragFree: true,
            }}
          >
            <CarouselContent className="w-full">
              {data &&
                Object.keys(data).map((sector: any) => (
                  <CarouselItem
                    key={sector}
                    className="basis-2/12 md:basis-7/12 lg:basis-9/12 xl:basis-10/12 w-full h-full"
                  >
                    <Button
                      key={sector}
                      variant="outline"
                      onClick={() => changeColor(sector)}
                      className={getButtonClass(sector)}
                    >
                      {sector}
                    </Button>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="grid grid-flow-row gap-4 sm:gap-6 md:gap-7 xl:gap-12 md:px-10 lg:px-14 xl:px-18 2xl:px-28 snap-mandatory scrollbar-hide items-center w-full">
          <HorizontalBentoBox />
          <HorizontalBentoBox />
          <HorizontalBentoBox />
        </div>
      </div>
    </div>
  );
}
