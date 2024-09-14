'use client';

import { TopNavBar } from '@/components/ui/top-nav-bar';
import { ComparisonSelector } from '@/components/ui/comparison-selector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { VerticalComparisonBox } from '@/components/ui/vertical-comparison-box';

interface SelectedStock {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
  exchangeShortName: string;
}

export default function ComparePage() {
  const [selectedFirstStock, setSelectedFirstStock] =
    useState<SelectedStock | null>(null);
  const [selectedSecondStock, setSelectedSecondStock] =
    useState<SelectedStock | null>(null);

  return (
    <main className="w-full h-screen flex flex-col justify-start items-center gap-4">
      <TopNavBar />
      <div className="w-full flex flex-col items-center lg:items-start justify-center lg:flex-row gap-4 px-4">
        <ComparisonSelector index={1} onStockSelect={setSelectedFirstStock} />
        <ComparisonSelector index={2} onStockSelect={setSelectedSecondStock} />
      </div>
      {selectedFirstStock || selectedSecondStock ? (
        <div className="w-full h-full flex flex-col items-center">
          <Tabs
            defaultValue="roa"
            className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 gap-2"
          >
            <TabsList className="w-full">
              <TabsTrigger value="roa" className="w-full">
                ROA
              </TabsTrigger>
              <TabsTrigger value="password" className="w-full">
                RT
              </TabsTrigger>
              <TabsTrigger value="account" className="w-full">
                ROE
              </TabsTrigger>
            </TabsList>
            <TabsContent value="roa" className="h-96 flex-grow">
              <div className="w-full h-full flex flex-grow justify-center">
                <VerticalComparisonBox
                  ratioName="ROA"
                  value={[
                    [0.5, 2021],
                    [0.6, 2022],
                  ]}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : null}
    </main>
  );
}
