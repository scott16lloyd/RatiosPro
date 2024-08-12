'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { resetPasswordRequest } from '@/utils/supabase/dbFunctions';

export default function ChangePasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const validateEmail = (email: string) => {
    // Simple email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const submitPasswordChange = (email: string) => {
    // Validate email
    if (!validateEmail(email)) {
      toast({
        title: 'Error',
        description: 'Invalid email. Please try again.',
      });
      return;
    }

    // Set loading state
    setIsLoading(true);

    resetPasswordRequest(email)
      .then((resetPassword) => {
        const { error } = resetPassword;
        if (error) {
          console.error('Error sending password reset email:', error);
          toast({
            title: 'Error',
            description: error ? error : 'An unexpected error occurred.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Success',
            description:
              'If the email exists, a password reset link will be sent to it.',
          });
          setEmail('');
        }
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description:
            error instanceof Error
              ? error.message
              : 'An unexpected error occurred.',
          variant: 'destructive',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <main className="flex min-h-screen flex-col gap-4 overflow-x-hidden p-4 items-center mx-auto md:max-w-2xl lg:max-w-3xl">
      <div className="relative flex flex-col gap-2 w-full items-center text-center">
        <div className="flex-grow text-center">
          <h1 className="text-xl md:text-2xl">Change password</h1>
        </div>
        <span>Enter the email you wish to change the password for.</span>
      </div>
      <form
        className="flex flex-col mx-auto h-fit w-full rounded-xl bg-secondary p-4 shadow-md items-center gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          submitPasswordChange(email);
        }}
      >
        <div className="flex flex-col gap-4 w-full">
          <Label htmlFor="email" className="text-sm">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="johndoe@gmail.com"
            className="w-full p-2 rounded-md border border-gray-300"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? 'Requesting...' : 'Request password change'}
        </Button>
      </form>
    </main>
  );
}
