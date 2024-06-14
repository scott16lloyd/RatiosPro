'use client';

import { PricingComponent } from '@/components/ui/pricing';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AlignJustify, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { PricingInfo } from '@/components/ui/pricing-info';

export default function Pricing() {
  return (
    <main className="flex min-h-screen flex-col gap-4 overflow-x-hidden p-2">
      <Sheet>
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-start text-gradient px-2 lg:p-6">
            Ratios Pro
          </h1>
          <SheetTrigger asChild>
            <AlignJustify className="md:hidden mx-6" size={32} />
          </SheetTrigger>
          <SheetContent className="bg-background flex flex-col items-center gap-6">
            <div className="w-full flex flex-row justify-between items-center">
              <h1 className="text-3xl font-bold text-start text-gradient">
                Ratios Pro
              </h1>
            </div>
            {/* Commented out until signup is available */}
            {/* <div className="flex flex-row gap-8">
              <Link href={'/sign-in'}>
                <Button className="relative inline-flex w-32 h-12 overflow-hidden p-[1px] outline-none">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full rounded-md overflow-hidden cursor-pointer items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl hover:bg-slate-900/90">
                    Sign Up
                  </span>
                </Button>
              </Link>
              <Link href={'/sign-in'}>
                <Button className="w-32 h-12 flex items-center justify-center outline-none">
                  <span className="text-white font-medium p-4 text-xl">
                    Login
                  </span>
                </Button>
              </Link>
            </div> */}
            <Separator className="w-full" />
            <div className="flex flex-col w-full gap-8">
              <Link href="/pricing">
                <div className="flex flex-row w-full justify-between">
                  <span className="text-xl font-white">Pricing</span>
                  <ChevronRight size={32} />
                </div>
              </Link>
            </div>
            <div className="flex flex-col w-full gap-8">
              <Link
                href="#"
                onClick={() =>
                  (window.location.href = 'mailto:scott16lloyd@gmail.com')
                }
              >
                <div className="flex flex-row w-full justify-between">
                  <span className="text-xl font-white">Contact</span>
                  <ChevronRight size={32} />
                </div>
              </Link>
            </div>
          </SheetContent>
          {/* Commented out until signup is available */}
          {/* <div className="hidden md:flex flex-row gap-4 px-6">
            <Link
              href={{
                pathname: '/sign-in',
                query: {
                  signup: true,
                },
              }}
            >
              <Button className="relative inline-flex w-32 h-12 overflow-hidden p-[1px] outline-none">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full rounded-md overflow-hidden cursor-pointer items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl hover:bg-slate-900/90">
                  Sign Up
                </span>
              </Button>
            </Link>
            <Link href={'/sign-in'}>
              <Button className="w-32 h-12 flex items-center justify-center outline-none">
                <span className="text-white font-medium p-4 text-xl">
                  Login
                </span>
              </Button>
            </Link>
          </div> */}
        </div>
      </Sheet>
      <div className="flex flex-col px-8 md:px-32">
        <div className="flex flex-col px-6 gap-4 mb-4">
          <span className="text-4xl lg:text-5xl xl:text-6xl font-bold text-center tracking-wide xl:leading-tight">
            Subscription Pricing
          </span>
          <span className="md:text-xl text-center">
            Get access to our full suite of tools and features with our simple
            subscription plan
          </span>
        </div>
        <PricingComponent />
        <PricingInfo />
      </div>
    </main>
  );
}
