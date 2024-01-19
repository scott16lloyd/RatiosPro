import { Link, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { SmallBentoBox } from '../ui/small-bento-box';
import { HorizontalBentoBox } from '../ui/horizontal-bento-box';

export function UpDownGrid({ title = 'No title' }: { title: string }) {
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
        <div className="w-full items-center gap-4 flex justify-center pb-4">
          <Button variant="outline">Popular</Button>
          <Button variant="outline">Tech</Button>
          <Button variant="outline">Healthcare</Button>
        </div>
        <div
          //   ref={UseScrollContainer}
          //   onMouseDown={handleMouseDown}
          //   onMouseUp={handleMouseUp}
          //   onMouseMove={handleMouseMove}
          className="grid grid-flow-row gap-4 sm:gap-6 md:gap-7 xl:gap-12 md:px-10 lg:px-14 xl:px-18 2xl:px-28 snap-mandatory scrollbar-hide items-center w-full"
        >
          <HorizontalBentoBox />
          <HorizontalBentoBox />
          <HorizontalBentoBox />
        </div>
      </div>
    </div>
  );
}
