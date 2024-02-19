'use client';

import { useEffect, useState } from 'react';
import { BentoSkeleton } from '@/components/ui/skeletons/bento-skeleton';

export function SmallResultBox({
  ratioName,
  value,
}: {
  ratioName: string;
  value: number;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isLoading ? (
    <BentoSkeleton />
  ) : (
    <div className="w-full h-full p-2 bg-secondary rounded-2xl flex flex-col">
      <div className="flex flex-row justify-start px-2 w-full">
        <span className="text-base md:text-lg lg:text-xl xl:text-2xl">
          {ratioName ? ratioName : 'null'}
        </span>
      </div>
      <div className="flex flex-row justify-center items-center h-full w-full">
        <span className="text-3xl md:text-4xl lg:text-5xl text-gradient font-bold">
          {value ? value : 'null'}
        </span>
      </div>
    </div>
  );
}
