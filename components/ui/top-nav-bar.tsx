import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function TopNavBar() {
  return (
    <nav className="w-full">
      <div className="container py-8 mx-auto flex justify-between items-center 6xl:max-w-6xl">
        <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold text-gradient">
          Financial Ratio Calculator
        </span>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
