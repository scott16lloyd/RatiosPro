import { CircleIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function SmallBentoBox() {
  return (
    <Card className="snap-start sm:w-32 md:w-52 sm:h-24 md:h-36 lg:w-72 lg:h-44 xl:w-80 xl:h-48 border-none p-1 noselect">
      <CardContent className="p-1 md:p-2 lg:p-3 xl:p-4">
        <div className="flex items-center content-start flex-row gap-2 md:gap-4 lg:gap-6 md:pb-2 lg:pb-4 xl:pb-5">
          <Avatar className="h-6 w-6 md:h-10 md:w-10 lg:h-14 lg:w-14 p-1 bg-white">
            <AvatarImage
              src="https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201609051049"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-lg md:text-3xl lg:text-4xl">AAPL</span>
        </div>
        <div className="flex flex-col md:gap-2 lg:gap-3">
          <p className="text-lg md:text-3xl lg:text-4xl font-semibold ">
            $208.85
          </p>
          <p className="text-sm md:text-xl lg:text-2xl font-medium text-green-400">
            +1.12%
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
