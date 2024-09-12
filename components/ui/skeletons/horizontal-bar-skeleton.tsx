import { Skeleton } from '@/components/ui/skeletons/skeleton';
export function HorizontalBarSkeleton() {
  return (
    <Skeleton className="snap-start w-auto sm:h-24 md:h-32 lg:h-40 border-none p-1 noselect flex items-center" />
  );
}
