'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import appleIcon from '@/public/appleIcon.png';
import googleIcon from '@/public/googleIcon.png';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { CardStack } from '@/components/ui/card-stack';
import { cn } from '@/utils/cn';
import { useState, useEffect } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { login, signup } from '@/app/sign-in/actions';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { PasswordResetPopover } from '@/components/ui/password-reset-popover';

const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        'font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5',
        className
      )}
    >
      {children}
    </span>
  );
};

export default function SignInPage({ searchParams }: { searchParams: any }) {
  const { toast } = useToast();
  // Manage form inputs
  const [isSignUp, setIsSignUp] = useState(searchParams.signup);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle form submission
  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    // Clear the error message when the form is submitted
    setError(null);
    setEmailAlert(false);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const result = await login(formData);

      if (result && 'error' in result) {
        const { error } = result;
        if (error) {
          console.error(error);
          if (error === 'Invalid login credentials') {
            // Handle the custom error
            toast({
              title: 'Error',
              description: 'Invalid login credentials. Please try again.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Error',
              description: 'An error occurred during login. Please try again.',
              variant: 'destructive',
            });
          }
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    // Clear the error message when the form is submitted
    setError(null);
    setEmailAlert(false);

    // Validation checks before signup
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast({
        title: 'Error',
        description: 'All fields are required. Please fill them out.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'The passwords do not match. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    // Commented out and displaying error message until signup is available
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('full_name', `${firstName} ${lastName}`);

    try {
      const result = await signup(formData);

      // Handle any error returned from the signup function
      if (result && result.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
        return;
      }
      setEmailAlert(true);
      // Clear the form inputs
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Remove error messages if user changes from sign up to sign in or vice versa
  useEffect(() => {
    setError(null);
  }, [isSignUp]);

  const CARDS = [
    {
      id: 0,
      name: 'Manu Arora',
      designation: 'Senior Software Engineer',
      content: (
        <p>
          These cards are amazing, <Highlight>I want to use them</Highlight> in
          my project. Framer motion is a godsend ngl tbh fam 🙏
        </p>
      ),
    },
    {
      id: 1,
      name: 'Elon Musk',
      designation: 'Senior Shitposter',
      content: (
        <p>
          I dont like this Twitter thing,{' '}
          <Highlight>deleting it right away</Highlight> because yolo. Instead, I
          would like to call it <Highlight>X.com</Highlight> so that it can
          easily be confused with adult sites.
        </p>
      ),
    },
    {
      id: 2,
      name: 'Tyler Durden',
      designation: 'Manager Project Mayhem',
      content: (
        <p>
          The first rule of
          <Highlight>Fight Club</Highlight> is that you do not talk about fight
          club. The second rule of
          <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
          club.
        </p>
      ),
    },
  ];
  return (
    <div className="flex flex-col py-4 px-3 gap-4 h-screen">
      {emailAlert ? (
        <Alert variant="success">
          <AlertTitle>Thank you for signing up!</AlertTitle>
          <AlertDescription>
            Please check your email to verify your account.
          </AlertDescription>
        </Alert>
      ) : (
        ''
      )}
      <div className="h-full w-full flex flex-row items-center justify-center xl:justify-start">
        <Card className="h-full w-full md:w-3/4 md:h-3/4 xl:w-5/12 xl:h-full ring-zinc-700 ring-1 flex flex-col items-center">
          <CardContent className="p-4 h-full w-full md:w-2/3 flex flex-col space-y-4">
            <div className="flex flex-col w-full gap-5 flex-grow-1">
              <div className="flex flex-col w-max text-left">
                <span className="text-3xl md:text-4xl font-light">
                  {!isSignUp ? 'Welcome back' : 'Get started'}
                </span>
                <span className="text-md md:text-lg lg:text-xl xl:text-2xl font-light text-zinc-500">
                  {!isSignUp ? 'Sign in to your account' : 'Create an account'}
                </span>
              </div>
              <div className="w-full flex flex-col gap-4 h-full justify-evenly">
                <Button
                  variant="outline"
                  className="w-full p-5 bg-background ring-zinc-700 ring-1 border-none rounded-sm"
                >
                  <div className="flex items-center space-x-2">
                    <div className="relative w-6 h-6">
                      <Image
                        src={appleIcon}
                        alt="Apple Login"
                        layout="fill"
                        objectFit="contain"
                      />{' '}
                    </div>
                    <span className="text-lg md:text-xl lg:text-2xl font-light">
                      Apple
                    </span>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full p-5 bg-background ring-zinc-700 ring-1 border-none rounded-sm"
                >
                  <div className="flex items-center space-x-2">
                    <div className="relative w-6 h-6">
                      <Image
                        src={googleIcon}
                        alt="Google Login"
                        layout="fill"
                        objectFit="contain"
                      />{' '}
                    </div>
                    <span className="text-lg md:text-xl lg:text-2xl font-light">
                      Google
                    </span>
                  </div>
                </Button>
              </div>
              <div className="w-full flex flex-row items-center justify-center gap-2 overflow-hidden">
                <Separator className="w-1/2" />
                <span className="text-xs md:text-sm lg:text-md font-medium text-zinc-700">
                  or
                </span>
                <Separator className="w-1/2" />
              </div>
            </div>
            <form>
              <div className="flex flex-col flex-grow-2 gap-2 w-full">
                <div className="flex flex-row w-full items-center gap-1.5">
                  {isSignUp ? (
                    <div className="grid w-full items-center gap-1.5">
                      <Label
                        htmlFor="firstName"
                        className="text-zinc-500 font-light md:text-sm lg:text-md"
                      >
                        First name
                      </Label>
                      <Input
                        type="text"
                        id="firstName"
                        placeholder="First name"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="rounded-sm py-5 w-full dark:border-zinc-700 dark:border-1 md:text-md lg:text-lg"
                      />
                    </div>
                  ) : (
                    ''
                  )}
                  {isSignUp ? (
                    <div className="grid w-full items-center gap-1.5">
                      <Label
                        htmlFor="lastName"
                        className="text-zinc-500 font-light md:text-sm lg:text-md"
                      >
                        Last name
                      </Label>
                      <Input
                        type="text"
                        id="lastName"
                        placeholder="Last name"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="rounded-sm py-5 w-full dark:border-zinc-700 dark:border-1 md:text-md lg:text-lg"
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label
                    htmlFor="email"
                    className="text-zinc-500 font-light md:text-sm lg:text-md"
                  >
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-sm py-5 w-full dark:border-zinc-700 dark:border-1 md:text-md lg:text-lg"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label
                    htmlFor="password"
                    className="text-zinc-500 font-light md:text-sm lg:text-md"
                  >
                    Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-sm py-5 w-full dark:border-zinc-700 dark:border-1 md:text-md lg:text-lg"
                  />
                </div>
                {isSignUp ? (
                  <div className="grid w-full items-center gap-1.5">
                    <Label
                      htmlFor="password"
                      className="text-zinc-500 font-light md:text-sm lg:text-md"
                    >
                      Confirm password
                    </Label>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="rounded-sm py-5 w-full dark:border-zinc-700 dark:border-1 md:text-md lg:text-lg"
                    />
                  </div>
                ) : (
                  ''
                )}
                {error && (
                  <div className="error-message text-red-500">{error}</div>
                )}
                {isLoading ? (
                  <Button disabled className="p-5">
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin text-white" />
                    <span className="text-white md:text-lg lg:text-xl">
                      Please wait
                    </span>
                  </Button>
                ) : (
                  <Button
                    className="p-5 mt-2"
                    onClick={!isSignUp ? handleLogin : handleSignup}
                  >
                    <span className="text-white md:text-lg lg:text-xl">
                      {!isSignUp ? 'Sign In' : 'Sign Up'}
                    </span>
                  </Button>
                )}
                <span className="text-zinc-500 font-light text-center text-xs md:text-sm lg:text-md">
                  {!isSignUp
                    ? 'Don’t have an account?'
                    : 'Already have an account?'}
                  <Link
                    href={'#'}
                    onClick={(event) => {
                      event.preventDefault();
                      !isSignUp ? setIsSignUp(true) : setIsSignUp(false);
                    }}
                    className="underline ml-2"
                  >
                    {!isSignUp ? 'Sign Up Now' : 'Sign in'}
                  </Link>
                </span>
                <Dialog>
                  <DialogTrigger asChild>
                    <span className="text-zinc-500 font-light text-center text-xs md:text-sm lg:text-md underline hover:cursor-pointer">
                      Forgot password
                    </span>
                  </DialogTrigger>
                  <PasswordResetPopover />
                </Dialog>
              </div>
            </form>
            <div className="flex flex-col h-full justify-end">
              <span className="text-zinc-500 font-light text-center text-xs md:text-sm lg:text-md">
                By continuing, you agree to Ratio Pro’s
                <Link href={'#'} className="underline px-1">
                  Terms of service
                </Link>
                and
                <Link href={'#'} className="underline px-1">
                  Privacy Policy
                </Link>
                , and to receive periodic emails with updates.
              </span>
            </div>
          </CardContent>
        </Card>
        <div className="hidden xl:flex w-7/12 h-full flex-col justify-center items-center">
          <CardStack items={CARDS} />
        </div>
      </div>
    </div>
  );
}
