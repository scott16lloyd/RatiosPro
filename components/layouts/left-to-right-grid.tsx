import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeftIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import Link from 'next/link';
export function LeftToRightGrid() {
  return (
    <div className="flex items-center justify-between bg-[#121212] p-4 gap-2 w-full">
      <Button className="bg-transparent text-white">
        <ChevronLeftIcon className="w-6 h-6" />
      </Button>
      <div className="w-3/4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="mb-6 text-lg font-semibold text-white">Trending</h2>
          <Link className="mb-6 text-sm text-white underline" href="#">
            View all
          </Link>
        </div>
        <div className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-scroll overscroll-x-contain snap-mandatory snap-x ">
          <Card className="bg-[#222222] snap-start">
            <CardContent>
              <div className="flex items-center space-x-2">
                <CircleIcon className="text-white w-5 h-5" />
                <div>
                  <p className="text-sm font-medium text-white">APPL</p>
                  <p className="text-lg font-semibold text-white">$208.85</p>
                  <p className="text-sm font-medium text-green-400">+1.12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#222222] snap-start">
            <CardContent>
              <div className="flex items-center space-x-2">
                <CircleIcon className="text-white w-5 h-5" />
                <div>
                  <p className="text-sm font-medium text-white">APPL</p>
                  <p className="text-lg font-semibold text-white">$208.85</p>
                  <p className="text-sm font-medium text-green-400">+1.12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#222222] snap-start">
            <CardContent>
              <div className="flex items-center space-x-2">
                <CircleIcon className="text-white w-5 h-5" />
                <div>
                  <p className="text-sm font-medium text-white">APPL</p>
                  <p className="text-lg font-semibold text-white">$208.85</p>
                  <p className="text-sm font-medium text-green-400">+1.12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#222222] snap-start">
            <CardContent>
              <div className="flex items-center space-x-2">
                <CircleIcon className="text-white w-5 h-5" />
                <div>
                  <p className="text-sm font-medium text-white">APPL</p>
                  <p className="text-lg font-semibold text-white">$208.85</p>
                  <p className="text-sm font-medium text-green-400">+1.12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#222222] snap-start">
            <CardContent>
              <div className="flex items-center space-x-2">
                <CircleIcon className="text-white w-5 h-5" />
                <div>
                  <p className="text-sm font-medium text-white">APPL</p>
                  <p className="text-lg font-semibold text-white">$208.85</p>
                  <p className="text-sm font-medium text-green-400">+1.12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <Button className="bg-transparent text-white">
          <ChevronRightIcon className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
