'use client';

import { Button } from '@/components/ui/button';
import { PriceHistory } from '@/components/ui/price-history';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { SmallResultBox } from '@/components/ui/small-result-box';
import { MediumResultBox } from '@/components/ui/medium-result-box';
import { HorizontalResultBox } from '@/components/ui/horizontal-result-box';
import { VerticalResultBox } from '@/components/ui/vertical-result-box';
import { fetchBalanceSheet, fetchIncomeStatement } from '@/hooks/index';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function DetailsPage({
  params,
}: {
  params: { ticker: string };
}) {
  const symbol = params.ticker;

  // Define query options
  type QueryResult = {
    isLoading: boolean;
    error: Error | null;
    data: any;
  };

  // Queries balance sheet data
  const queryBalanceSheet: UseQueryOptions<any, Error> = {
    queryKey: ['fetchBalanceSheet', symbol],
    queryFn: fetchBalanceSheet,
  };

  const balanceSheetData: QueryResult = useQuery(queryBalanceSheet);

  // Queries income statement data
  const queryIncomeStatement: UseQueryOptions<any, Error> = {
    queryKey: ['fetchIncomeStatement', symbol],
    queryFn: fetchIncomeStatement,
  };

  const incomeStatementData: QueryResult = useQuery(queryIncomeStatement);

  let currentRatio: number = 0,
    quickRatio: number = 0,
    returnOnEquity: number = 0,
    returnOnAssets: number = 0,
    salesToReceivables: number = 0,
    currentROE: number = 0,
    previousROE: number = 0;

  if (balanceSheetData.isLoading || incomeStatementData.isLoading) {
    // Data is still loading
    console.log('Loading data...');
  } else if (balanceSheetData.error || incomeStatementData.error) {
    // An error occurred while fetching the data
    console.error(
      'Error fetching data:',
      balanceSheetData.error,
      incomeStatementData.error
    );
  } else if (
    balanceSheetData.data.length > 0 &&
    incomeStatementData.data.length > 0
  ) {
    // Data is available
    console.log(
      'Fetched data:',
      balanceSheetData.data,
      incomeStatementData.data
    );
    // Calculate current ratio
    currentRatio =
      balanceSheetData.data[0].totalCurrentAssets /
      balanceSheetData.data[0].totalCurrentLiabilities;
    currentRatio = parseFloat(currentRatio.toFixed(2));

    // Calculate quick ratio
    quickRatio =
      (balanceSheetData.data[0].totalCurrentAssets -
        balanceSheetData.data[0].inventory) /
      balanceSheetData.data[0].totalCurrentLiabilities;
    quickRatio = parseFloat(quickRatio.toFixed(2));

    // Calculate return on equity
    const ROE = () => {
      let currentROE =
        incomeStatementData.data[0].netIncome /
        balanceSheetData.data[0].totalStockholdersEquity;
      currentROE = parseFloat(currentROE.toFixed(2));

      let previousROE =
        incomeStatementData.data[1].netIncome /
        balanceSheetData.data[1].totalStockholdersEquity;
      previousROE = parseFloat(previousROE.toFixed(2));

      let ROE = currentROE - previousROE;
      ROE = parseFloat(ROE.toFixed(2));
      return [ROE, currentROE, previousROE];
    };
    [returnOnEquity, currentROE, previousROE] = ROE();

    // Calculate return on assets
    const ROA = () => {
      let currentROA =
        incomeStatementData.data[0].netIncome /
        balanceSheetData.data[0].totalAssets;

      let previousROA =
        incomeStatementData.data[1].netIncome /
        balanceSheetData.data[1].totalAssets;

      let ROA = currentROA - previousROA;
      return ROA;
    };
    returnOnAssets = ROA();

    // Calculate sales to receivables
    const SR = () => {
      let currentSR =
        incomeStatementData.data[0].revenue /
        balanceSheetData.data[0].netReceivables;

      let previousSR =
        incomeStatementData.data[1].revenue /
        balanceSheetData.data[1].netReceivables;

      let SR = currentSR - previousSR;
      return SR;
    };
    salesToReceivables = SR();
  }

  console.log(currentROE);
  console.log(previousROE);

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
        {balanceSheetData.data &&
        balanceSheetData.data.length > 0 &&
        incomeStatementData.data &&
        incomeStatementData.data.length > 0 ? (
          <>
            <div className="h-2/6 2xl:h-2/12 flex justify-center mb-8 lg:mb-10">
              <PriceHistory TickerSymbol={symbol} />
            </div>
            <div className="w-full lg:h-5/6 xl:h-11/12 2xl:h-11/12 flex flex-col gap-2 lg:gap-4 p-4 px-8 md:px-44 lg:px-64 xl:px-130">
              {/* Top Row */}
              <div className="flex flex-row w-full min-h-20 max-h-28 gap-2 lg:gap-4">
                <div className="h-full w-4/12 items-center flex justify-center">
                  <SmallResultBox ratioName="CR" value={currentRatio} />
                </div>
                <div className="h-full w-8/12 items-center flex justify-center">
                  <MediumResultBox ratioName="ROE" value={returnOnEquity} />
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
                    <MediumResultBox ratioName="ROE" value={returnOnEquity} />
                  </div>
                </div>
                <div className="flex flex-col h-full w-4/12 gap-2 lg:gap-4">
                  <div className="w-full min-h-20 max-h-28 items-center flex flex-col justify-center">
                    <SmallResultBox ratioName="QR" value={quickRatio} />
                  </div>
                  <div className="w-full min-h-48 max-h-52">
                    <VerticalResultBox
                      ratioName="ROE"
                      value={[returnOnEquity, currentROE, previousROE]}
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
