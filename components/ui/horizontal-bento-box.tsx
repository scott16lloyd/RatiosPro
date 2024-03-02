import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from './card';

interface HorizontalBentoBoxProps {
  symbol: string;
  name: string;
  price: number;
  industry: string;
}

export function HorizontalBentoBox({
  symbol,
  name,
  price,
  industry,
}: HorizontalBentoBoxProps) {
  return (
    <Card className="snap-start w-auto sm:h-24 md:h-36 lg:h-44 border-none p-1 noselect flex items-center">
      <CardContent className="p-2 md:p-4 lg:p-6 xl:p-8 flex justify-between items-center w-full">
        <div className="flex-grow flex justify-center content-start flex-col gap-2 w-full max-w-44 md:max-w-96 lg:max-w-xl xl:max-w-4xl md:pb-2 lg:pb-4 xl:pb-5 overflow-hidden">
          <span className="w-full sm:text-lg md:text-2xl lg:text-3xl text-zinc-600 truncate">
            {name}
          </span>
          <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl truncate">
            {symbol}
          </span>
        </div>
        <div className="flex-grow flex justify-center flex-col gap-2 md:pb-2 lg:pb-4 xl:pb-5 overflow-hidden items-end">
          <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold truncate">
            ${price.toFixed(2)}
          </p>
          <p className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-light text-gradient max-w-36 md:max-w-60 truncate">
            {industry}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
