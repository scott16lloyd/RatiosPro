import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { signOut, getUser } from '@/utils/supabase/dbFunctions';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/supabaseClient';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export function TopNavBar() {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const handleAction =
    (action: (...args: any[]) => Promise<any>, ...args: any[]) =>
    async () => {
      try {
        const result = await action(...args);
        setError(null); // Clear the error state if action is successful
        return result;
      } catch (error) {
        if ((error as Error).message === 'Email rate limit exceeded') {
          setError('To many login attempts, please wait and try again.');
        } else {
          setError((error as Error).message); // Set the error state if an error is thrown
        }
      }
    };

  useEffect(() => {
    handleAction(getUser)().then((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  console.log(user?.user.email);

  return (
    <nav className="w-full">
      <div className="container py-8 mx-auto flex justify-between items-center 6xl:max-w-6xl">
        <Link href="/">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold text-gradient">
              Ratios Pro
            </span>
            <span className="text-lg sm:text-xl md:text-xl lg:text-2xl font-light">
              Financial Ratio Calculator
            </span>
          </div>
        </Link>
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col w-max h-max">
              <span>{user?.user.email}</span>
              <Separator className="w-full h-0.5 my-2" />
              <Button variant="link" onClick={handleAction(signOut)}>
                Sign out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
