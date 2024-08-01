'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CreditCard,
  Mail,
  SquarePen,
  Lock,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { ProfilePicture } from '@/components/ui/profilePicture';
import { getuser } from '@/utils/supabase/dbFunctions';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';

type User = {
  id: string;
  email: string;
  role: string;
};

export default function Account() {
  // Router used to navigate back
  const router = useRouter();
  // User state
  const [user, setUser] = useState<User | null>(null);

  // Get user information
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

  // Account settings page
  return (
    <main className="flex min-h-screen flex-col gap-4 overflow-x-hidden p-4 items-center mx-auto md:max-w-2xl lg:max-w-3xl">
      <div className="relative flex w-full items-center">
        <Button
          variant="secondary"
          onClick={() => router.back()}
          className="absolute left-0 h-full"
        >
          <ArrowLeft className="h-full" />
        </Button>
        <div className="flex-grow text-center">
          <h1 className="text-xl md:text-2xl">Account settings</h1>
        </div>
      </div>
      <div className="flex flex-row mx-auto w-full rounded-xl bg-secondary p-4 shadow-md items-center gap-4">
        <ProfilePicture />
        <div className="flex flex-col">
          {/* TODO: update with dynamic name once users full name is being captured */}
          <span className="font-medium md:text-xl">Scott Lloyd</span>
          <span className="font-light md:text-xl">
            {user?.email ? user?.email : 'Not logged in'}
          </span>
        </div>
        <div className="ml-auto">
          <Button variant="ghost" className="h-full">
            <SquarePen className="h-full" />
          </Button>
        </div>
      </div>
      <div className="flex flex-row mx-auto w-full rounded-xl bg-secondary p-4 shadow-md items-center gap-2">
        <div className="flex flex-col w-full gap-2">
          <Button
            variant="ghost"
            className="p-0 text-lg font-normal md:text-xl"
          >
            <div className="relative flex flex-row mx-auto w-full items-center gap-2">
              <CreditCard className="mx-2 h-full" />
              Billing
              <ChevronRight className="absolute right-0 h-full" />
            </div>
          </Button>
          <Separator className="w-full" />
          <Button
            variant="ghost"
            className="p-0 text-lg font-normal md:text-xl"
          >
            <div className="relative flex flex-row mx-auto w-full items-center gap-2">
              <Lock className="mx-2 h-full" />
              Change password
              <ChevronRight className="absolute right-0 h-full" />
            </div>
          </Button>
          <Separator className="w-full" />
          <Button
            variant="ghost"
            className="p-0 text-lg font-normal md:text-xl"
          >
            <div className="relative flex flex-row w-full items-center gap-2">
              <Mail className="mx-2 h-full" />
              Invite friends
              <ChevronRight className="absolute right-0 h-full" />
            </div>
          </Button>
        </div>
      </div>
      <div className="flex flex-row mx-auto w-full rounded-xl bg-secondary p-4 shadow-md items-center gap-2">
        <Button
          variant="ghost"
          className="p-0 text-lg font-normal w-full md:text-xl"
        >
          <div className="relative flex flex-row w-full items-center gap-2">
            <span className="text-red-500 mx-2 h-full">
              <LogOut />
            </span>
            <span className="text-red-500 md:text-xl">Log out</span>
          </div>
        </Button>
      </div>
    </main>
  );
}
