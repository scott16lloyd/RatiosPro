'use client';

import { useQueries } from '@tanstack/react-query';
import { fetchBiggestGainers, fetchMostPopular } from '@/hooks/index';
import { LeftToRightGrid } from '@/components/layouts/left-to-right-grid';

export function RowContainer() {
  const results = useQueries({
    queries: [
      {
        queryKey: ['Biggest Gainers'],
        queryFn: fetchBiggestGainers,
      },
      {
        queryKey: ['Most Popular'],
        queryFn: fetchMostPopular,
      },
    ],
  });

  const [
    {
      isLoading: biggestGainerIsLoading,
      error: biggestGainerError,
      data: biggestGainerData,
    },
    {
      isLoading: mostPopularIsLoading,
      error: mostPopularError,
      data: mostPopularData,
    },
  ] = results;

  return (
    <div className="w-full">
      <LeftToRightGrid
        title="Biggest Gainers"
        isLoading={biggestGainerIsLoading}
        error={biggestGainerError}
        data={biggestGainerData}
      />
      <LeftToRightGrid
        title="Trending"
        isLoading={mostPopularIsLoading}
        error={mostPopularError}
        data={mostPopularData}
      />
    </div>
  );
}
