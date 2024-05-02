import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AlignJustify } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="h-screen w-full flex flex-col">
      <Sheet>
        <div className="w-full p-6 flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-start text-gradient">
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
              <Button className="relative inline-flex w-32 h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full rounded-md overflow-hidden cursor-pointer items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl hover:bg-slate-900/90">
                  Sign Up
                </span>
              </Button>
              <Button className="w-32 h-12 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="text-white font-medium p-4 text-xl">
                  Login
                </span>
              </Button>
            </div>
          </SheetContent>
          <div className="hidden md:flex flex-row gap-4">
            <Button className="relative inline-flex w-32 h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full rounded-md overflow-hidden cursor-pointer items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl hover:bg-slate-900/90">
                Sign Up
              </span>
            </Button>
            <Button className="w-32 h-12 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="text-white font-medium p-4 text-xl">Login</span>
            </Button>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
