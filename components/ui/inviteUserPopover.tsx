import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { inviteUser } from '@/utils/supabase/dbFunctions';

export function InviteUserPopover() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const validateEmail = (email: string) => {
    // Simple email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const submitEmail = async (email: string) => {
    setIsLoading(true);

    // Validate email
    if (!validateEmail(email)) {
      toast({
        title: 'Error',
        description: 'Invalid email. Please try again.',
      });
      return;
    }

    try {
      // send invite to user email
      const request = await inviteUser(email);

      if (request && 'error' in request) {
        const { error } = request;
        if (error) {
          console.error('Failed to send invite.', error);
          toast({
            title: 'Error',
            description: error ? error : 'An unexpected error occurred.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Success',
            description: 'If the email exists, an invite will be sent to it.',
          });
        }
      }
    } catch (error) {
      console.error('Failed to send invite:', error);
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
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Invite a friend</DialogTitle>
        <DialogDescription>
          Enter the email of the person you want to invite.
        </DialogDescription>
      </DialogHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitEmail(email);
        }}
      >
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <DialogFooter className="flex justify-end my-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
