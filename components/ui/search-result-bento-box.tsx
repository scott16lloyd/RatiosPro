import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface SearchResultBentoBoxProps {
  symbol: string;
  name: string;
  exchangeShortName: string;
}

export function SearchResultBentoBox({
  symbol,
  name,
  exchangeShortName,
}: SearchResultBentoBoxProps) {
  console.log(name);
  return (
    <Link
      href={`/details/${symbol}`}
      onClick={() => {
        localStorage.setItem('stockName', name);
      }}
    >
      <Card className="sm:w-32 md:w-52 sm:h-24 md:h-36 lg:w-72 lg:h-44 xl:w-80 xl:h-48 border-none p-2 md:p-4 noselect ring-zinc-700 ring-1">
        <CardContent className="p-0 h-full flex flex-col justify-between lg:gap-1">
          <div className="flex flex-row w-full items-start">
            <span className="w-full sm:text-xs md:text-md lg:text-xl text-zinc-600 truncate">
              {name}
            </span>
          </div>
          <div className="flex items-center content-start flex-row gap-2 md:gap-4 lg:gap-6">
            <span className="text-xl md:text-4xl lg:text-5xl font-semibold">
              {symbol}
            </span>
          </div>
          <div className="flex flex-col items-end md:gap-2 lg:gap-3">
            <p className="sm:text-xs md:text-md lg:text-xl ">
              {exchangeShortName}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
