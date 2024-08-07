'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { createLocalClient } from '@/utils/supabase/supabaseClient';
import { redirect } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPassword } from '@/utils/supabase/dbFunctions';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
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
    setError(null);

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
      const update = await resetPassword(newPassword);

      if (update && 'error' in update) {
        const { error } = update;
        if (error) {
          console.error('Failed to update password:', error);
          toast({
            title: 'Error',
            description: error ? error : 'An unexpected error occurred.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Success',
            description: 'Your password has been updated.',
          });
          setNewPassword('');
          setConfirmPassword('');
          // setFormSubmitted(true);
        }
      }
    } catch (error) {
      console.error('Failed to update password:', error);
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
          <h1 className="text-xl md:text-2xl">Change password</h1>
        </div>
      </div>
      <div className="flex flex-col mx-auto h-fit w-full rounded-xl bg-secondary p-4 shadow-md items-center gap-4">
        <div className="flex flex-col gap-4 w-full">
          <Label htmlFor="password" className="text-sm">
            New password
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
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
            className="w-full p-2 rounded-md border border-gray-300"
          />
        </div>
        <Button className="w-full">Change password</Button>
      </div>
    </main>
  );
}
