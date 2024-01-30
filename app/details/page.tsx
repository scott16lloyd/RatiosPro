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
      <div className="w-full h-screen flex flex-col justify-center overflow-x-scroll">
        <div className="w-full flex justify-start p-4">
          <Button size="icon" variant="secondary">
            <Link href="/">
              <ArrowLeft />
            </Link>
          </Button>
        </div>
        <div className="h-2/6 2xl:h-2/12 flex justify-center mb-10">
          <PriceHistory />
        </div>
        <div className="w-full h-2/3 lg:h-5/6 xl:h-11/12 2xl:h-11/12 flex flex-col lg:gap-4 2xl:gap-0 p-4 md:px-44 lg:px-64 xl:px-80 2xl:px-110 overflow-x-auto">
          {/* Top Row */}
          <div className="flex flex-row w-full h-1/4 gap-2 lg:gap-6 xl:gap-8 2xl:gap-2">
            <div className="h-full w-4/12 items-center flex justify-center">
              <SmallResultBox />
            </div>
            <div className="h-full w-8/12 items-center flex justify-center">
              <MediumResultBox />
            </div>
          </div>
          {/* Bottom Columns */}
          <div className="flex flex-row h-3/4 w-full gap-2 lg:gap-6 xl:gap-8 2xl:gap-2">
            <div className="flex flex-col h-full w-8/12 gap-2 lg:gap-6 xl:gap-8 2xl:gap-2 my-2">
              <div className="w-full min-h-16 max-h-24 h-1/4 items-center flex justify-center">
                <HorizontalResultBox />
              </div>
              <div className="w-full min-h-16 max-h-24 h-1/4 items-center flex justify-center">
                <HorizontalResultBox />
              </div>
              <div className="w-full h-full items-center flex justify-center">
                <MediumResultBox />
              </div>
            </div>
            <div className="flex flex-col h-full w-4/12 gap-2 lg:gap-6 xl:gap-8 2xl:gap-2 my-2">
              <div className="w-full h-1/3 items-center flex justify-center">
                <SmallResultBox />
              </div>
              <div className="w-full h-2/3">
                <VerticalResultBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
