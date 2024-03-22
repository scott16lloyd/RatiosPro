'use client';

import { Button } from '@/components/ui/button';
import { PriceHistory } from '@/components/ui/price-history';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { fetchRatios } from '@/hooks/index';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import ResultGridLayout from '@/components/layouts/result-grid-layout';
import { useRouter } from 'next/navigation';

export default function DetailsPage({
  params,
}: {
  params: { ticker: string; name: string };
}) {
  const symbol = params.ticker;
  const router = useRouter();

  // Define query options
  type QueryResult = {
    isLoading: boolean;
    error: Error | null;
    data: any;
  };

  // Queries ratios data
  const queryRatio: UseQueryOptions<any, Error> = {
    queryKey: ['fetchRatios', symbol],
    queryFn: fetchRatios,
  };

  const ratios: QueryResult = useQuery(queryRatio);

  if (ratios.isLoading) {
    // Data is still loading
    console.log('Loading data...');
  } else if (ratios.error) {
    // An error occurred while fetching the data
    console.error('Error fetching data:', ratios.error);
  } else if (ratios.data || ratios.data.length > 0) {
    // Data is available
    const stockName = localStorage.getItem('stockName');

    return (
      <>
        <div className="w-full h-screen flex flex-col justify-start">
          <div className="w-full flex justify-start p-4">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => router.back()}
            >
              <ArrowLeft />
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center px-6 lg:gap-4">
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold truncate text-wrap text-center">
              {stockName}
            </h1>
            <h1 className="text-lg md:text-xl lg:text-2xl font-light text-zinc-600">
              ({symbol})
            </h1>
          </div>
          {ratios.data && ratios.data.length > 0 ? (
            <>
              <div className="h-2/6 2xl:h-2/12 flex justify-center mb-8 lg:mb-10">
                <PriceHistory TickerSymbol={symbol ? symbol : 'null'} />
              </div>
              <div className="flex flex-col justify-center items-center w-full">
                <ResultGridLayout data={ratios.data} />
              </div>
            </>
          ) : (
            <div className="h-2/6 2xl:h-2/12 flex flex-col items-center justify-center mb-8 lg:mb-10 text-2xl gap-2">
              <AlertCircle />
              No data available
            </div>
          )}
        </div>
      </>
    );
  }
}
