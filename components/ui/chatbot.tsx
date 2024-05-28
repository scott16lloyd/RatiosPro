'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useChat } from 'ai/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import robotGif from '@/public/robotGIF.gif';
import Image from 'next/image';

export default function Chatbot({ symbol }: { symbol: string }) {
  const { messages, isLoading } = useChat();

  const handleSubmit = async (event: any) => {
    console.log('submitting');
    event.preventDefault();
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticker: symbol }), // pass the symbol as ticker
      });
      const data = await response.json();
      console.log(data);
      // handle the response data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Popover>
      <div className="fixed bottom-4 right-4 z-50">
        <PopoverTrigger asChild>
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-primary bg-secondary flex items-center justify-center cursor-pointer p-1">
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
          </div>
          <form onSubmit={handleSubmit}>
            <Button>Analyse</Button>
          </form>
          <span className="lg:text-xl">
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              messages.map((m) => (
                <div key={m.id} className="whitespace-pre-wrap">
                  {m.role === 'user' ? 'User: ' : 'AI: '}
                  {m.content}
                </div>
              ))
            )}
          </span>
          {/* <form onSubmit={handleSubmit}>
            <input
              className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
          </form> */}
        </PopoverContent>
      </div>
    </Popover>
  );
}
