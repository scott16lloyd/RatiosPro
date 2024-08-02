import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/utils/supabase/supabaseServerClient';
import { redirect } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function ChangePasswordPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.log(error);
    redirect('/sign-in');
  }
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
