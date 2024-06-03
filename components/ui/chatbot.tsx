'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useChat } from 'ai/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import robotGif from '@/public/robotGIF.gif';
import Image from 'next/image';
import { LineLoader } from '@/components/ui/line-loader';

// Define query options
type QueryResult = {
  isLoading: boolean;
  error: Error | null;
  data: any;
};

export default function Chatbot({
  symbol,
  companyRatios,
}: {
  symbol: string;
  companyRatios: QueryResult;
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  console.log(companyRatios);

  useEffect(() => {
    const handleSubmit = async (event: any) => {
      setLoading(true);
      console.log('submitting');
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ticker: symbol,
            companyRatios: companyRatios,
          }),
        });
        const data = await response.json();
        setData(data.content.message.content);
        console.log(data);
        // handle the response data
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && !hasSubmitted) {
      handleSubmit(symbol);
      setHasSubmitted(true);
    }
  }, [isOpen]);

  return (
    <Popover>
      <div className="fixed bottom-4 right-4 z-50">
        <PopoverTrigger asChild>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-primary bg-secondary flex items-center justify-center cursor-pointer p-1"
          >
            <div className="rounded-full bg-white dark:bg-gray-950 dark:bg-border-gradient" />
            <Image src={robotGif} alt="AI Robot" width={300} height={100} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-72 md:w-80 m-2 max-h-[75vh] lg:w-96 overflow-scroll">
          <div className="flex flex-col flex-grow justify-center items-center px-2 w-full">
            <span className="text-xl lg:text-2xl font-medium">
              Warren Bottet
            </span>
            <Separator className="my-2" />
            <span className="text-xl lg:text-2xl font-medium">{symbol}</span>

            <span>{data}</span>
            {loading ? <LineLoader /> : ''}
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
}
