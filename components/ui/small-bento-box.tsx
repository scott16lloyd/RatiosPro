import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { LikeButton } from '@/components/like-button';

interface SmallBentoBoxProps {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
}

export function SmallBentoBox({
  symbol,
  name,
  price,
  changesPercentage,
}: SmallBentoBoxProps) {
  return (
    <Link href={{ pathname: `/details/${symbol}`, query: { name } }}>
      <Card className="sm:w-32 md:w-52 sm:h-24 md:h-36 lg:w-72 lg:h-44 xl:w-80 xl:h-48 border-none p-2 md:p-4 noselect ring-zinc-700 ring-1">
        <CardContent className="p-0 h-full flex flex-col justify-evenly lg:gap-1">
          <div className="flex flex-row w-full items-center sm:mt-1">
            <span className="w-full sm:text-xxs md:text-sm lg:text-lg text-zinc-600 truncate">
              {name}
            </span>
            <LikeButton
              symbol={symbol}
              name={name}
              price={price}
              changesPercentage={changesPercentage}
            />
          </div>
          <div className="flex items-center content-start flex-row gap-2 md:gap-4 lg:gap-6">
            <span className="text-lg md:text-3xl lg:text-4xl">{symbol}</span>
          </div>
          <div className="flex flex-col md:gap-2 lg:gap-3">
            <p className="text-xl md:text-4xl lg:text-5xl font-semibold ">
              ${price.toFixed(2)}
            </p>
          </div>
          <div className="flex flex-row justify-end items-center gap-1">
            {changesPercentage > 0 ? (
              <ArrowUpRight
                color="hsla(120, 100%, 37%, 1)"
                className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8"
              />
            ) : (
              <ArrowDownRight
                color="hsla(0, 100%, 37%, 1)"
                className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8"
              />
            )}
            <p className="text-xs md:text-lg lg:text-xl font-light">
              {changesPercentage.toFixed(2) + '%'}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
