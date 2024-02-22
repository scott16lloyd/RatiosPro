'use client';

import { Button } from '@/components/ui/button';
import { PriceHistory } from '@/components/ui/price-history';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { SmallResultBox } from '@/components/ui/small-result-box';
import { MediumResultBox } from '@/components/ui/medium-result-box';
import { HorizontalResultBox } from '@/components/ui/horizontal-result-box';
import { VerticalResultBox } from '@/components/ui/vertical-result-box';
import {
  fetchBalanceSheet,
  fetchIncomeStatement,
  fetchRatios,
} from '@/hooks/index';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function DetailsPage({
  params,
}: {
  params: { ticker: string; name: string };
}) {
  const symbol = params.ticker;
  console.log(symbol);

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
    console.log('Fetched data:', ratios.data);

    return (
      <>
        <div className="w-full h-screen flex flex-col justify-start">
          <div className="w-full flex justify-start p-4">
            <Button size="icon" variant="secondary">
              <Link href="/">
                <ArrowLeft />
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold">{symbol}</h1>
          </div>
          {ratios.data && ratios.data.length > 0 ? (
            <>
              <div className="h-2/6 2xl:h-2/12 flex justify-center mb-8 lg:mb-10">
                <PriceHistory TickerSymbol={symbol} />
              </div>
              <div className="w-full lg:h-5/6 xl:h-11/12 2xl:h-11/12 flex flex-col gap-2 lg:gap-4 p-4 px-8 md:px-44 lg:px-64 xl:px-130">
                {/* Top Row */}
                <div className="flex flex-row w-full min-h-20 max-h-28 gap-2 lg:gap-4">
                  <div className="h-full w-4/12 items-center flex justify-center">
                    <SmallResultBox
                      ratioName="CR"
                      value={Number(ratios.data[0].currentRatio.toFixed(2))}
                    />
                  </div>
                  <div className="h-full w-8/12 items-center flex justify-center">
                    <MediumResultBox
                      ratioName="ROE"
                      value={Number(ratios.data[0].returnOnEquity.toFixed(2))}
                    />
                  </div>
                </div>
                {/* Bottom Columns */}
                <div className="flex flex-row w-full gap-2 lg:gap-4">
                  <div className="flex flex-col w-8/12 gap-2 lg:gap-4">
                    <div className="w-full min-h-10 max-h-20 items-center flex justify-center">
                      <HorizontalResultBox />
                    </div>
                    <div className="w-full min-h-10 max-h-20 items-center flex justify-center">
                      <HorizontalResultBox />
                    </div>
                    <div className="w-full min-h-20 max-h-28 items-center flex justify-center">
                      <MediumResultBox
                        ratioName="ROE"
                        value={Number(ratios.data[0].returnOnEquity.toFixed(2))}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col h-full w-4/12 gap-2 lg:gap-4">
                    <div className="w-full min-h-20 max-h-28 items-center flex flex-col justify-center">
                      <SmallResultBox
                        ratioName="QR"
                        value={Number(ratios.data[0].quickRatio.toFixed(2))}
                      />
                    </div>
                    <div className="w-full min-h-48 max-h-52">
                      <VerticalResultBox
                        ratioName="ROE"
                        value={[
                          [
                            Number(ratios.data[0].returnOnEquity.toFixed(2)),
                            ratios.data[0].calendarYear,
                          ],
                          [
                            Number(ratios.data[1].returnOnEquity.toFixed(2)),
                            ratios.data[1].calendarYear,
                          ],
                        ]}
                      />
                    </div>
                  </div>
                </div>
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
