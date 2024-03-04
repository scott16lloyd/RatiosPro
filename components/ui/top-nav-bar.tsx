import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export function TopNavBar() {
  return (
    <nav className="w-full">
      <div className="container py-8 mx-auto flex justify-between items-center 6xl:max-w-6xl">
        <Link href="/">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold text-gradient">
              Ratios Pro
            </span>
            <span className="text-lg sm:text-xl md:text-xl lg:text-2xl font-light">
              Financial Ratio Calculator
            </span>
          </div>
        </Link>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
