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
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

  // Fetch chatbot data once per render
  useEffect(() => {
    const handleSubmit = async (event: any) => {
      setLoading(true);
      try {
        const params = {
          ticker: symbol,
          companyRatios: companyRatios.data,
        };
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });
        const data = await response.json();
        setData(data.content.message.content);
        setTypingIndex(0); // Reset typing index
        setDisplayedText(''); // Reset displayed text
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    // Check if chatbot is open and has not been submitted
    if (isOpen && !hasSubmitted) {
      handleSubmit(symbol);
      setHasSubmitted(true);
    }
  }, [isOpen, companyRatios, symbol]);

  // Typing effect
  useEffect(() => {
    if (data) {
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + data.charAt(typingIndex));
        setTypingIndex((prev) => prev + 1);
      }, 20); // Adjust typing speed here

      if (typingIndex >= data.length) {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }
  }, [data, typingIndex]);

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
        <PopoverContent className="w-72 md:w-80 m-2 max-h-[75vh] lg:w-96 overflow-y-scroll p-1">
          <div className="flex flex-col flex-grow justify-center items-center px-2 w-full">
            <span className="text-xl lg:text-2xl font-medium">
              Warren Bottet
            </span>
            <Separator className="my-2" />
            <span className="text-xl lg:text-2xl font-medium">{symbol}</span>

            <span className="text-sm md:text-md lg:text-lg p-1">
              {displayedText}
            </span>
            {loading ? <LineLoader /> : ''}
          </div>
          <div className="text-center">
            <span className="text-zinc-500 text-sm">
              AI generated suggestions, check important info.
            </span>
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
}
