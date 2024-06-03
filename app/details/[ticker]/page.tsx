'use client';

import { Button } from '@/components/ui/button';
import { PriceHistory } from '@/components/ui/price-history';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { fetchRatios, fetchCompantProfile } from '@/hooks/index';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import ResultGridLayout from '@/components/layouts/result-grid-layout';
import { useRouter, useSearchParams } from 'next/navigation';
import { LikeButton } from '@/components/like-button';
import { useEffect, useState } from 'react';
import { checkLikedStock } from '@/utils/supabase/dbFunctions';
import Chatbot from '@/components/ui/chatbot';

export default function DetailsPage({
  params,
}: {
  params: { ticker: string; name: string };
}) {
  const symbol = params.ticker;
  const router = useRouter();
  const searchParams = useSearchParams();

  const title = searchParams.get('name');

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

  console.log(ratios);

  // Queries company profile
  const queryProfile: UseQueryOptions<any, Error> = {
    queryKey: ['fetchProfile', symbol],
    queryFn: fetchCompantProfile,
  };

  const profile: QueryResult = useQuery(queryProfile);

  const [isLoading, setIsLoading] = useState(false);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  useEffect(() => {
    const checkIfLiked = async () => {
      setIsLoading(true);
      const isLiked = await checkLikedStock(symbol);
      setIsHeartFilled(isLiked ? true : false);
      setIsLoading(false);
    };

    checkIfLiked();
  }, [symbol]);

  if (ratios.isLoading) {
    // Data is still loading
    console.log('Loading data...');
  } else if (ratios.error) {
    // An error occurred while fetching the data
    console.error('Error fetching data:', ratios.error);
  }

  return isLoading ? (
    <></>
  ) : (
    <>
      <div className="w-full h-screen flex flex-col justify-start">
        <div className="w-full flex justify-start p-4">
          <Button size="icon" variant="secondary" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center px-6 lg:gap-4">
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold truncate text-wrap text-center">
            {title}
          </h1>
          <div className="flex flex-row items-center gap-2 md:gap-4">
            <h1 className="text-lg md:text-xl lg:text-2xl font-light text-zinc-600">
              ({symbol})
            </h1>
            <LikeButton
              symbol={symbol}
              name={profile.data ? profile.data.name : ''}
              price={profile.data ? profile.data.price : 0}
              changesPercentage={profile.data ? profile.data.changes : 0}
              isLoading={isLoading}
              isHeartFilledProp={isHeartFilled}
            />
          </div>
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
        <Chatbot symbol={symbol} companyRatios={ratios} />
      </div>
    </>
  );
}
