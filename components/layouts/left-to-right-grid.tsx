'use client';
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SmallBentoBox } from '@/components/ui/small-bento-box';
import { ChevronLeftIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import Link from 'next/link';
export function LeftToRightGrid() {
  // Functionality for scrolling left and right
  const UseScrollContainer = useRef<HTMLDivElement | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollStart, setScrollStart] = useState(0);

  const handleMouseDown = (e: { clientX: React.SetStateAction<number> }) => {
    setIsScrolling(true);
    setScrollStart(e.clientX);
  };

  const handleMouseUp = () => {
    setIsScrolling(false);
  };

  const handleMouseMove = (e: { clientX: React.SetStateAction<number> }) => {
    if (isScrolling && UseScrollContainer.current) {
      UseScrollContainer.current.scrollLeft +=
        Number(scrollStart) - Number(e.clientX);
      setScrollStart(e.clientX);
    }
  };

  const scrollLeft = () => {
    if (UseScrollContainer.current !== null) {
      if (UseScrollContainer.current) {
        UseScrollContainer.current.scrollTo({
          left: UseScrollContainer.current.scrollLeft - window.innerWidth * 0.4,
          behavior: 'smooth',
        });
      }
    }
  };

  const scrollRight = () => {
    if (UseScrollContainer.current) {
      UseScrollContainer.current.scrollTo({
        left: UseScrollContainer.current.scrollLeft + window.innerWidth * 0.4,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div className="group relative flex items-center justify-center p-4 gap-2 w-full h-min-content px-0">
      <Button
        variant="ghost"
        onClick={scrollLeft}
        className="group-hover:block hidden absolute top-1/2 left-0 transform -translate-y-1/2 bg-transparent z-10 mx-2 md:mx-3 lg:mx-6 xl:mx-8 2xl:mx-12"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </Button>
      <div className="w-full relative z-0 px-4">
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
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="grid grid-rows-1 grid-flow-col gap-4 sm:gap-5 overflow-x-auto snap-mandatory scrollbar-hide justify-between"
        >
          <SmallBentoBox />
          <SmallBentoBox />
          <SmallBentoBox />
          <SmallBentoBox />
          <SmallBentoBox />
          <SmallBentoBox />
          <SmallBentoBox />
          <SmallBentoBox />
        </div>
      </div>
      <div className="flex flex-col items-end">
        <Button
          variant="ghost"
          onClick={scrollRight}
          className="group-hover:block hidden absolute top-1/2 right-0 transform -translate-y-1/2  mx-2 md:mx-3 lg:mx-6 xl:mx-8 2xl:mx-12"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
