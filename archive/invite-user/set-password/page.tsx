'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPassword } from '@/utils/supabase/dbFunctions';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { createLocalClient } from '@/utils/supabase/supabaseClient';

export default function SetPasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const supabase = createLocalClient();

  // Check if user is signed in
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error: getUserError } = await supabase.auth.getUser();
      if (getUserError || !data?.user) {
        console.log(getUserError);
        router.push('/sign-in');
      }
    };
    fetchUser();
  }, [supabase, router]);

  const submitPasswordUpdate = async (
    newPassword: string,
    confirmPassword: string
  ) => {
    setIsLoading(true);

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'The passwords do not match. Please try again.',
      });
      setIsLoading(false);
      return;
    }

    try {
      // Reset the user's password after request
      const update = await resetPassword(newPassword);

      if (update && 'error' in update) {
        const { error } = update;
        if (error) {
          console.error('Failed to set password:', error);
          toast({
            title: 'Error',
            description: error ? error : 'An unexpected error occurred.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Success',
            description: 'Your password has been set.',
          });
          // Clear inputs and redirect to sign-in
          setNewPassword('');
          setConfirmPassword('');
          router.push('/sign-in');
        }
      }
    } catch (error) {
      console.error('Failed to set password:', error);
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

  return (
    <main className="flex min-h-screen flex-col gap-4 overflow-x-hidden p-4 items-center mx-auto md:max-w-2xl lg:max-w-3xl">
      <div className="relative flex w-full items-center">
        <div className="flex-grow text-center">
          <h1 className="text-xl md:text-2xl">Set password</h1>
        </div>
      </div>
      <form
        className="flex flex-col mx-auto h-fit w-full rounded-xl bg-secondary p-4 shadow-md items-center gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          submitPasswordUpdate(newPassword, confirmPassword);
        }}
      >
        <div className="flex flex-col gap-4 w-full">
          <Label htmlFor="password" className="text-sm">
            Password
          </Label>
          <Input
            type="password"
            id="new-password"
            name="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Label htmlFor="confirm-password" className="text-sm">
            Confirm password
          </Label>
          <Input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300"
          />
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Change password'}
        </Button>
      </form>
    </main>
  );
}
