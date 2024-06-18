import { CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PricingComponent() {
  return (
    <div className="mx-auto w-full rounded-xl bg-secondary p-6 shadow-md">
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-4xl md:text-5xl font-bold">€5</span>
            <span className="text-gray-400 md:text-xl">/month</span>
          </div>
          <div className="rounded-full bg-green-900/20 px-3 py-1 text-sm md:text-xl font-medium text-green-400">
            Free trial
          </div>
        </div>
        <p className="text-gray-400 md:text-xl">
          Try out all the features for free for 1 week.
        </p>
        <ul className="space-y-2 text-gray-400 md:text-lg">
          <li className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-green-400" />
            Ratios for all publicly traded companies
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-green-400" />
            AI powered insights
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-green-400" />
            Calculation Breakdown
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-green-400" />
            Full price history
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-green-400" />
            Search public companies
          </li>
        </ul>
        <Button disabled className="w-full p-5">
          <span className="text-white text-xl font-medium">Coming soon</span>
        </Button>
      </div>
    </div>
  );
}
