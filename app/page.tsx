import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AlignJustify, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="h-screen w-full flex flex-col items-center md:items-start px-6">
      <Sheet>
        <div className="w-full py-6 flex flex-row justify-between items-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-start text-gradient">
            Ratios Pro
          </h1>
          <SheetTrigger asChild>
            <AlignJustify className="md:hidden" size={32} />
          </SheetTrigger>
          <SheetContent className="bg-background flex flex-col items-center gap-6">
            <div className="w-full flex flex-row justify-between items-center">
              <h1 className="text-3xl font-bold text-start text-gradient">
                Ratios Pro
              </h1>
            </div>
            <div className="flex flex-row gap-8">
              <Button className="relative inline-flex w-32 h-12 overflow-hidden p-[1px] outline-none">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full rounded-md overflow-hidden cursor-pointer items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl hover:bg-slate-900/90">
                  Sign Up
                </span>
              </Button>
              <Button className="w-32 h-12 flex items-center justify-center outline-none">
                <span className="text-white font-medium p-4 text-xl">
                  Login
                </span>
              </Button>
            </div>
            <Separator className="w-full" />
            <div className="flex flex-col w-full gap-8">
              <Link href="#">
                <div className="flex flex-row w-full justify-between">
                  <span className="text-xl font-white">Pricing</span>
                  <ChevronRight size={32} />
                </div>
              </Link>
            </div>
            <div className="flex flex-col w-full gap-8">
              <Link href="#">
                <div className="flex flex-row w-full justify-between">
                  <span className="text-xl font-white">Contact</span>
                  <ChevronRight size={32} />
                </div>
              </Link>
            </div>
          </SheetContent>
          <div className="hidden md:flex flex-row gap-4">
            <Button className="relative inline-flex w-32 h-12 overflow-hidden p-[1px] outline-none">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full rounded-md overflow-hidden cursor-pointer items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl hover:bg-slate-900/90">
                Sign Up
              </span>
            </Button>
            <Button className="w-32 h-12 flex items-center justify-center outline-none">
              <span className="text-white font-medium p-4 text-xl">Login</span>
            </Button>
          </div>
        </div>
      </Sheet>
      <div className="w-full flex flex-col items-center md:w-7/12 md:pt-4 justify-center gap-2 pb-6 md:pb-10">
        <span className="text-4xl font-bold text-center md:text-left tracking-wide leading-tight">
          Empowering Investors with{' '}
          <span className="text-gradient">Essential Financial Ratios</span>
        </span>
        <span className="text-center md:text-left">
          Designed to assist in analyzing stocks by providing essential
          financial ratios. Users can effortlessly access key metrics for any
          publicly traded company.
        </span>
        <div className="w-full h-full">
          <Image
            src={'/iphone-screen.png'}
            alt="Image of RatiosPro software running on iPhone"
            width={50}
            height={50}
          />
        </div>
      </div>
      <Button className="relative inline-flex w-max h-12 overflow-hidden p-[1px] outline-none md:self-center">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full rounded-md overflow-hidden cursor-pointer items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl hover:bg-slate-900/90">
          Join the Waitlist
        </span>
      </Button>
    </div>
  );
}
