import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from './card';

export function HorizontalBentoBox() {
  return (
    <Card className="snap-start w-full sm:h-24 md:h-36 lg:h-44 border-none p-1 noselect flex items-center">
      <CardContent className="p-2 md:p-4 lg:p-6 xl:p-8 flex justify-between w-full">
        <div className="flex items-center justify-center content-start flex-row gap-2 md:gap-8 lg:gap-10 md:pb-2 lg:pb-4 xl:pb-5">
          <span className="text-3xl md:text-5xl lg:text-6xl">AAPL</span>
        </div>
        <div className="flex flex-col md:gap-4 lg:gap-6 items-end">
          <p className="text-2xl md:text-4xl lg:text-5xl font-semibold ">
            $208.85
          </p>
          <p className="text-lg md:text-2xl lg:text-3xl font-medium text-gradient">
            +1.12%
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
