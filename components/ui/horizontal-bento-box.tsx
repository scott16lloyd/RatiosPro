import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from './card';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface HorizontalBentoBoxProps {
  symbol: string;
  name: string;
  price: number;
  industryOrChange: string | number;
}

export function HorizontalBentoBox({
  symbol,
  name,
  price,
  industryOrChange,
}: HorizontalBentoBoxProps) {
  const isIndustry = typeof industryOrChange === 'string';
  return (
    <Link href={`/details/${symbol}`}>
      <Card className="snap-start w-auto sm:h-24 md:h-32 lg:h-40 border-none p-1 noselect flex items-center ring-zinc-700 ring-1">
        <CardContent className="p-2 md:p-4 lg:p-6 xl:p-8 flex justify-between items-center w-full">
          <div className="flex justify-center content-start flex-col gap-2 max-w-44 md:max-w-96 lg:max-w-xl xl:max-w-4xl overflow-hidden">
            <span className="w-full sm:text-lg md:text-2xl lg:text-3xl text-zinc-600 truncate">
              {name}
            </span>
            <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl truncate">
              {symbol}
            </span>
          </div>
          <div className="flex justify-evenly flex-col gap-2 lg:gap-y-4 overflow-hidden items-end">
            <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold truncate">
              ${price.toFixed(2)}
            </p>
            <div className="flex items-center gap-1 md:gap-2">
              {!isIndustry && (
                <div className="flex items-center">
                  {industryOrChange > 0 ? (
                    <ArrowUpRight
                      color="hsla(120, 100%, 37%, 1)"
                      className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10"
                    />
                  ) : (
                    <ArrowDownRight
                      color="hsla(0, 100%, 37%, 1)"
                      className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10"
                    />
                  )}
                </div>
              )}
              <p
                className={`text-sm sm:text-lg md:text-2xl lg:text-3xl font-light max-w-36 md:max-w-60 lg:max-w-96 truncate ${
                  isIndustry ? 'text-gradient' : 'text-white'
                }`}
              >
                {isIndustry ? industryOrChange : `${industryOrChange}%`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
