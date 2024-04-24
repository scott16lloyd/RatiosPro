'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { getuser } from '@/utils/supabase/dbFunctions';
import { User } from 'lucide-react';
import { signout } from '@/utils/supabase/dbFunctions';

type User = {
  id: string;
  email: string;
  role: string;
};

export function TopNavBar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getuser()
      .then((userObject) =>
        setUser({
          id: userObject?.user.id || '',
          email: userObject?.user.email || '',
          role: userObject?.user.role || '',
        })
      )
      .catch((error) => {
        console.error('Failed to fetch user:', error);
      });
  }, []);

  return (
    <nav className="w-full">
      <div className="container py-8 mx-auto flex justify-between items-center 6xl:max-w-6xl">
        <Link href="/home">
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
          <PopoverContent avoidCollisions={true} collisionPadding={10}>
            <div className="flex flex-col w-max h-max justify-evenly">
              <div className="w-full h-full flex flex-col gap-1 justify-between">
                <span className="text-md hover:cursor-pointer hover:bg-zinc-700 hover:rounded-[5px] p-1">
                  {user?.email ? user?.email : 'Not logged in'}
                </span>
                <Link
                  href={'/view-all/liked'}
                  className="text-md hover:cursor-pointer hover:bg-zinc-700 hover:rounded-[5px] p-1"
                >
                  <span>Liked stocks</span>
                </Link>
                <Link
                  href={
                    'https://billing.stripe.com/p/login/test_cN2cPhevxcCD6K4eUU'
                  }
                  className="text-md hover:cursor-pointer hover:bg-zinc-700 hover:rounded-[5px] p-1"
                >
                  <span>Account settings</span>
                </Link>
              </div>
              <Separator className="w-full h-0.5 my-2" />
              <Button variant="link" onClick={() => signout()}>
                Sign out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
