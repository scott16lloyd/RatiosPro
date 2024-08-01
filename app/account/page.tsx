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
  const router = useRouter();
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

  return (
    <main className="flex min-h-screen flex-col gap-4 overflow-x-hidden p-2 items-center">
      <div className="relative flex w-full items-center">
        <Button
          size="icon"
          variant="secondary"
          onClick={() => router.back()}
          className="absolute left-0"
        >
          <ArrowLeft />
        </Button>
        <div className="flex-grow text-center">
          <h1 className="text-xl">Account settings</h1>
        </div>
      </div>
      <div className="flex flex-row mx-auto w-full rounded-xl bg-secondary p-4 shadow-md items-center gap-4">
        <ProfilePicture />
        <div className="flex flex-col">
          {/* TODO: update with dynamic name once users full name is being captured */}
          <span className="font-medium">Scott Lloyd</span>
          <span className="font-light">
            {user?.email ? user?.email : 'Not logged in'}
          </span>
        </div>
        <div className="ml-auto">
          <Button size="icon" variant="ghost">
            <SquarePen />
          </Button>
        </div>
      </div>
      <div className="flex flex-row mx-auto w-full rounded-xl bg-secondary p-4 shadow-md items-center gap-4">
        <div className="flex flex-col w-full gap-2">
          <Button variant="ghost" className="p-0 text-base font-normal">
            <div className="relative flex flex-row mx-auto w-full items-center gap-4">
              <CreditCard className="mx-2" />
              Billing
              <ChevronRight className="absolute right-0" />
            </div>
          </Button>
          <Separator className="w-full" />
          <Button variant="ghost" className="p-0 text-base font-normal">
            <div className="relative flex flex-row mx-auto w-full items-center gap-4">
              <Lock className="mx-2" />
              Change password
              <ChevronRight className="absolute right-0" />
            </div>
          </Button>
          <Separator className="w-full" />
          <Button variant="ghost" className="p-0 text-base font-normal">
            <div className="relative flex flex-row w-full items-center gap-4">
              <Mail className="mx-2" />
              Invite friends
              <ChevronRight className="absolute right-0" />
            </div>
          </Button>
        </div>
      </div>
      <div className="flex flex-row mx-auto w-full rounded-xl bg-secondary p-4 shadow-md items-center gap-4">
        <span className="danger-gradient">
          <LogOut />
        </span>
        <span className="danger-gradient">Log out</span>
      </div>
    </main>
  );
}
