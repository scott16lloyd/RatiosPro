'use client';

import react, { useState } from 'react';
import { Link } from 'lucide-react';
import { Button } from '../ui/button';
import { HorizontalBentoBox } from '../ui/horizontal-bento-box';

export function UpDownGrid({ title = 'No title' }: { title: string }) {
  const [activeButton, setActiveButton] = useState('popular');

  const changeColor = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const getButtonClass = (buttonName: string) => {
    return activeButton === buttonName
      ? 'dark:bg-white hover:dark:bg-white text-black dark:hover:text-black'
      : '';
  };
  return (
    <div className="group relative flex items-center justify-center p-4 gap-2 w-full h-min-content px-0">
      <div className="w-full relative z-0 px-4 items-center">
        <div className="flex flex-row justify-between w-full">
          <h2 className="mb-6 text-2xl xs:text-sm sm:text-lg lg:text-xl font-semibold w-full">
            {title}
          </h2>
          <Link className="mb-6 text-sm underline" href="#">
            View all
          </Link>
        </div>
        <div className="grid grid-rows-1 grid-flow-col overflow-x-auto snap-mandatory scrollbar-hide w-full lg:px-28 2xl:px-64 md:gap-6 lg:gap-8 xl:px-46 xl:gap-10 items-content-center gap-4 pb-4">
          <Button
            variant="outline"
            onClick={() => changeColor('popular')}
            className={getButtonClass('popular')}
          >
            Popular
          </Button>
          <Button
            variant="outline"
            className={getButtonClass('tech')}
            onClick={() => changeColor('tech')}
          >
            Tech
          </Button>
          <Button
            variant="outline"
            onClick={() => changeColor('healthcare')}
            className={getButtonClass('healthcare')}
          >
            Healthcare
          </Button>
          <Button
            variant="outline"
            onClick={() => changeColor('finance')}
            className={getButtonClass('finance')}
          >
            Finance
          </Button>
          <Button
            variant="outline"
            onClick={() => changeColor('energy')}
            className={getButtonClass('energy')}
          >
            Energy
          </Button>
        </div>
        <div className="grid grid-flow-row gap-4 sm:gap-6 md:gap-7 xl:gap-12 md:px-10 lg:px-14 xl:px-18 2xl:px-28 snap-mandatory scrollbar-hide items-center w-full">
          <HorizontalBentoBox />
          <HorizontalBentoBox />
          <HorizontalBentoBox />
        </div>
      </div>
    </div>
  );
}
