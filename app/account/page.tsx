'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CreditCard,
  SquarePen,
  Lock,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { ProfilePicture } from '@/components/ui/profilePicture';
import { getuser } from '@/utils/supabase/dbFunctions';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  updateUserEmail,
  updateUsername,
  getUsername,
} from '@/utils/supabase/dbFunctions';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { PasswordResetPopover } from '@/components/ui/password-reset-popover';
import { signout } from '@/utils/supabase/dbFunctions';

type User = {
  id: string;
  email: string;
  role: string;
};

export default function Account() {
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitEmail = async (email: string, confirmEmail: string) => {
    setIsLoading(true);

    // Check if emails match
    if (email !== confirmEmail) {
      toast({
        title: 'Error',
        description: 'The email addresses do not match. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    try {
      // Send email request change
      const update = await updateUserEmail(email);

      if (update && 'error' in update) {
        const { error } = update;
        if (error) {
          console.error('Failed to update email:', error);
          toast({
            title: 'Error',
            description: error ? error : 'An unexpected error occurred.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Success',
            description:
              'Email change request sent. Please check your inbox for ' +
              email +
              '.',
          });
          setNewEmail('');
          setConfirmEmail('');
        }
      }
    } catch (error) {
      console.error('Failed to update email:', error);
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const submitUsername = async (username: string) => {
    // Check if username is empty
    if (!username) {
      toast({
        title: 'Error',
        description: 'Username cannot be empty.',
        variant: 'destructive',
      });
      return;
    }

    // Check if username is too short
    if (username.length < 2) {
      toast({
        title: 'Error',
        description: 'Username must be at least 3 characters long.',
        variant: 'destructive',
      });
      return;
    }

    // Check if username is too long
    if (username.length > 50) {
      toast({
        title: 'Error',
        description: 'Username must be less than 50 characters long.',
        variant: 'destructive',
      });
      return;
    }

    // Check if username has special characters
    if (!/^[a-zA-Z0-9_ ]*$/.test(username)) {
      toast({
        title: 'Error',
        description: 'Username must not contain special characters.',
        variant: 'destructive',
      });
      return;
    }

    // Make sure username is 2 words or less
    if (username.split(' ').length > 2) {
      toast({
        title: 'Error',
        description: 'Username must be 2 words or less.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      // Update username
      const update = await updateUsername(username);

      if (update && 'error' in update) {
        const { error } = update;
        if (error) {
          console.error('Failed to update username:', error);
          toast({
            title: 'Error',
            description: error ? error : 'An unexpected error occurred.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Success',
            description: 'Your username has been updated.',
          });
          setUsername(username);
        }
      }
    } catch (error) {
      console.error('Failed to update username:', error);
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get user's id, email, and role
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

    // Fetch username
    getUsername()
      .then((result) => {
        if ('error' in result) {
          console.error('Failed to get username:', result.error);
        } else {
          setUsername(result[0]?.full_name || 'Not set');
          setNewUsername(result[0]?.full_name || '');
        }
      })
      .catch((error) => {
        console.error('Error fetching username:', error);
      });
  }, []);

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
      <div className="flex flex-row mx-auto h-fit w-full rounded-xl bg-secondary p-4 shadow-md items-center gap-4">
        <ProfilePicture username={username} />
        <div className="flex flex-col overflow-hidden">
          <span className="font-medium md:text-xl whitespace-nowrap overflow-hidden text-ellipsis">
            {username ? username : 'Not logged in'}
          </span>
          <span className="font-light md:text-xl overflow-hidden text-ellipsis">
            {user?.email ? user?.email : 'Not logged in'}
          </span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-full ml-auto flex-shrink-0">
              <SquarePen className="h-full" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Email Form */}
              <div className="flex flex-row items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  defaultValue={user?.email || 'Not logged in'}
                  className="col-span-3"
                  disabled
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-full">
                      Change email
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Change email</DialogTitle>
                      <DialogDescription>
                        We’ll send an email to your new address with
                        instructions on completing the change.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        submitEmail(newEmail, confirmEmail);
                      }}
                    >
                      <Input
                        id="newEmail"
                        type="email"
                        placeholder="New email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="my-4"
                      />
                      <Input
                        id="confirmEmail"
                        type="email"
                        placeholder="Confirm email"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        className="my-4"
                      />
                      <DialogFooter className="flex justify-end my-4">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? 'Submitting...' : 'Submit'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              {/* Username Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitUsername(newUsername);
                }}
              >
                <div className="flex flex-row items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="username"
                    defaultValue={username}
                    className="col-span-3 my-2"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </div>
                <DialogFooter className="item-end my-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save changes'}
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-row mx-auto w-full rounded-xl bg-secondary p-4 shadow-md items-center gap-2">
        <div className="flex flex-col w-full gap-2">
          <Link
            href={'https://billing.stripe.com/p/login/test_cN2cPhevxcCD6K4eUU'}
            className="text-lg font-normal hover:bg-zinc-700 hover:rounded-[5px] md:text-xl"
          >
            <div className="relative flex flex-row mx-auto w-full items-center gap-2">
              <CreditCard className="mx-2 h-full" />
              Billing
              <ChevronRight className="absolute right-0 h-full" />
            </div>
          </Link>
          <Separator className="w-full" />
          <Dialog>
            <DialogTrigger asChild>
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
            </DialogTrigger>
            <PasswordResetPopover />
          </Dialog>
          {/* Archived feature for later */}
          {/* <Separator className="w-full" />
          <Dialog>
            <DialogTrigger asChild>
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
            </DialogTrigger>
            <InviteUserPopover />
          </Dialog> */}
        </div>
      </div>
      <div className="flex flex-row mx-auto w-full rounded-xl bg-secondary p-4 shadow-md items-center gap-2">
        <Button
          variant="ghost"
          className="p-0 text-lg font-normal w-full md:text-xl"
          onClick={() => signout()}
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
