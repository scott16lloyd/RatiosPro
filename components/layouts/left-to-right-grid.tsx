'use client';
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeftIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import Link from 'next/link';
export function LeftToRightGrid() {
  // Functionality for scrolling left and right
  const UseScrollContainer = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (UseScrollContainer.current !== null) {
      if (UseScrollContainer.current) {
        UseScrollContainer.current.scrollTo({
          left: UseScrollContainer.current.scrollLeft - 200,
          behavior: 'smooth',
        });
      }
    }
  };

  const scrollRight = () => {
    if (UseScrollContainer.current) {
      UseScrollContainer.current.scrollTo({
        left: UseScrollContainer.current.scrollLeft + 200,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div className="group relative flex items-center justify-center p-4 gap-2 w-full h-min-content">
      <Button
        variant="ghost"
        onClick={scrollLeft}
        className="group-hover:block hidden absolute top-1/2 left-0 transform -translate-y-1/2 bg-transparent z-10 mx-2 md:mx-3 lg:mx-6 xl:mx-8 2xl:mx-12"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </Button>
      <div className="w-10/12 relative z-0">
        <div className="flex flex-row items-center justify-between">
          <h2 className="mb-6 text-2xl xs:text-sm sm:text-lg lg:text-xl font-semibold">
            Trending
          </h2>
          <Link className="mb-6 text-sm underline" href="#">
            View all
          </Link>
        </div>
        <div
          ref={UseScrollContainer}
          className=" grid grid-rows-2 grid-flow-col gap-4 overflow-x-scroll overscroll-x-contain snap-mandatory snap-x scrollbar-hide"
        >
          <Card className="bg-[#222222] snap-start">
            <CardContent>
              <div className="flex items-center space-x-2">
                <CircleIcon className="w-5 h-5" />
                <div>
                  <p className="text-sm font-medium ">APPL</p>
                  <p className="text-lg font-semibold ">$208.85</p>
                  <p className="text-sm font-medium text-green-400">+1.12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#222222] snap-start">
            <CardContent>
              <div className="flex items-center space-x-2">
                <CircleIcon className=" w-5 h-5" />
                <div>
                  <p className="text-sm font-medium ">APPL</p>
                  <p className="text-lg font-semibold ">$208.85</p>
                  <p className="text-sm font-medium text-green-400">+1.12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#222222] snap-start">
            <CardContent>
              <div className="flex items-center space-x-2">
                <CircleIcon className=" w-5 h-5" />
                <div>
                  <p className="text-sm font-medium ">APPL</p>
                  <p className="text-lg font-semibold ">$208.85</p>
                  <p className="text-sm font-medium text-green-400">+1.12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#222222] snap-start">
            <CardContent>
              <div className="flex items-center space-x-2">
                <CircleIcon className=" w-5 h-5" />
                <div>
                  <p className="text-sm font-medium ">APPL</p>
                  <p className="text-lg font-semibold ">$208.85</p>
                  <p className="text-sm font-medium text-green-400">+1.12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#222222] snap-start">
            <CardContent>
              <div className="flex items-center space-x-2">
                <CircleIcon className=" w-5 h-5" />
                <div>
                  <p className="text-sm font-medium ">APPL</p>
                  <p className="text-lg font-semibold ">$208.85</p>
                  <p className="text-sm font-medium text-green-400">+1.12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <Button
          variant="ghost"
          onClick={scrollRight}
          className="bg-transparent group-hover:block hidden absolute top-1/2 right-0 transform -translate-y-1/2  mx-2 md:mx-3 lg:mx-6 xl:mx-8 2xl:mx-12"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
