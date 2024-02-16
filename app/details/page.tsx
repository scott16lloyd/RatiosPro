import { Button } from '@/components/ui/button';
import { PriceHistory } from '@/components/ui/price-history';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { SmallResultBox } from '@/components/ui/small-result-box';
import { MediumResultBox } from '@/components/ui/medium-result-box';
import { HorizontalResultBox } from '@/components/ui/horizontal-result-box';
import { VerticalResultBox } from '@/components/ui/vertical-result-box';

export default function DetailsPage() {
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
        <div className="h-2/6 2xl:h-2/12 flex justify-center mb-8 lg:mb-10">
          <PriceHistory TickerSymbol="AAPL" />
        </div>
        <div className="w-full lg:h-5/6 xl:h-11/12 2xl:h-11/12 flex flex-col gap-2 lg:gap-4 p-4 px-8 md:px-44 lg:px-64 xl:px-130">
          {/* Top Row */}
          <div className="flex flex-row w-full min-h-20 max-h-28 gap-2 lg:gap-4">
            <div className="h-full w-4/12 items-center flex justify-center">
              <SmallResultBox />
            </div>
            <div className="h-full w-8/12 items-center flex justify-center">
              <MediumResultBox />
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
                <MediumResultBox />
              </div>
            </div>
            <div className="flex flex-col h-full w-4/12 gap-2 lg:gap-4">
              <div className="w-full min-h-20 max-h-28 items-center flex flex-col justify-center">
                <SmallResultBox />
              </div>
              <div className="w-full min-h-48 max-h-52">
                <VerticalResultBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
