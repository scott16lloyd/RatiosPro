'use client';

import { useEffect, useState } from 'react';
import { BentoSkeleton } from '@/components/ui/skeletons/bento-skeleton';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex'; // or rehype-mathjax
import 'katex/dist/katex.min.css'; // Include the CSS for rendering math
import {
  CRDescription,
  QuickRatioDescription,
  DebtToEquityRatioDescription,
  PERatioDescription,
  PSRatioDescription,
  PBRatioDescription,
} from '@/lib/ratioDescriptions';
export function SmallResultBox({
  ratioName,
  prevValue,
  prevYear,
  currValue,
  currYear,
}: {
  ratioName: string;
  prevValue: number;
  prevYear: number;
  currValue: number;
  currYear: number;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Logic to determine text color based on value
  const colorRules = {
    CR: (currValue: number, prevValue: number) => {
      if (currValue >= 2) {
        return 'text-gradient';
      } else if (currValue < 1) {
        return 'danger-gradient';
      } else if (currValue >= 1 && currValue < 2) {
        return 'warning-gradient';
      }

      if (prevValue >= 2) {
        return 'text-gradient';
      } else if (prevValue < 1) {
        return 'danger-gradient';
      } else if (prevValue >= 1 && prevValue < 2) {
        return 'warning-gradient';
      }
    },
    QR: (currValue: number, prevValue: number) => {
      if (currValue >= 1) {
        return 'text-gradient';
      } else if (currValue < 1) {
        return 'danger-gradient';
      }

      if (prevValue >= 1) {
        return 'text-gradient';
      } else if (prevValue < 1) {
        return 'danger-gradient';
      }
    },

    DE: (currValue: number, prevValue: number) => {
      if (currValue < 1) {
        return 'text-gradient';
      } else if (currValue === 1) {
        return 'warning-gradient';
      } else if (currValue > 1) {
        return 'danger-gradient';
      }

      if (prevValue < 1) {
        return 'text-gradient';
      } else if (prevValue === 1) {
        return 'warning-gradient';
      } else if (prevValue > 1) {
        return 'danger-gradient';
      }
    },

    PE: (currValue: number, prevValue: number) => {
      if (currValue < 15) {
        return 'text-gradient';
      } else if (currValue >= 15 && currValue < 20) {
        return 'warning-gradient';
      } else if (currValue >= 20) {
        return 'danger-gradient';
      }

      if (prevValue < 15) {
        return 'text-gradient';
      } else if (prevValue >= 15 && prevValue < 20) {
        return 'warning-gradient';
      } else if (prevValue >= 20) {
        return 'danger-gradient';
      }
    },

    PSR: (currValue: number, prevValue: number) => {
      if (currValue < 2) {
        return 'text-gradient';
      } else if (currValue >= 2 && currValue < 5) {
        return 'warning-gradient';
      } else if (currValue >= 5) {
        return 'danger-gradient';
      }

      if (prevValue < 2) {
        return 'text-gradient';
      } else if (prevValue >= 2 && prevValue < 5) {
        return 'warning-gradient';
      } else if (prevValue >= 5) {
        return 'danger-gradient';
      }
    },

    PBR: (currValue: number, prevValue: number) => {
      if (currValue < 1) {
        return 'text-gradient';
      } else if (currValue >= 1) {
        return 'danger-gradient';
      }

      if (prevValue < 1) {
        return 'text-gradient';
      } else if (prevValue >= 1) {
        return 'danger-gradient';
      }
    },
  };

  let prevValueColor = colorRules[ratioName as keyof typeof colorRules]
    ? colorRules[ratioName as keyof typeof colorRules](prevValue, currValue)
    : 'warning-gradient';
  let currValueColor = colorRules[ratioName as keyof typeof colorRules]
    ? colorRules[ratioName as keyof typeof colorRules](currValue, prevValue)
    : 'warning-gradient';

  type RatioName = 'CR' | 'QR' | 'DE' | 'PE' | 'PSR' | 'PBR';

  // Select description based on selected ratio
  const ratioDescriptions: Record<RatioName, string[][]> = {
    CR: CRDescription,
    QR: QuickRatioDescription,
    DE: DebtToEquityRatioDescription,
    PE: PERatioDescription,
    PSR: PSRatioDescription,
    PBR: PBRatioDescription,
  };

  return isLoading ? (
    <BentoSkeleton />
  ) : (
    <div className="aspect-square overflow-auto p-2 bg-secondary rounded-2xl flex flex-col outline outline-zinc-700 outline-1 shadow-md shadow-zinc-900">
      <div className="flex flex-row justify-start md:p-2 w-full items-center gap-2">
        <span className="text-lg md:text-3xl lg:text-4xl xl:text-4xl">
          {ratioName ? ratioName : 'null'}
        </span>
        <Drawer>
          <DrawerTrigger>
            <Info
              size={22}
              color="rgb(203 213 225)"
              strokeWidth={1}
              className="cursor-pointer"
            />
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-5xl overflow-y-scroll scrollbar-hide">
              <DrawerHeader>
                <DrawerTitle>
                  {ratioName in ratioDescriptions
                    ? ratioDescriptions[ratioName as RatioName][0][0]
                    : 'Default Title'}
                </DrawerTitle>
                <DrawerDescription>
                  <Markdown
                    className={'text-lg sm:text-base'}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    children={
                      ratioName in ratioDescriptions
                        ? ratioDescriptions[ratioName as RatioName][1][0]
                        : 'Default title'
                    }
                  />
                </DrawerDescription>
              </DrawerHeader>
            </div>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="flex flex-row justify-center items-center h-full w-full">
        <div className="flex flex-row lg:gap-2">
          <div className="flex flex-col items-center md:gap-1">
            <span
              className={`text-1.5xl md:text-5xl font-bold ${prevValueColor}`}
            >
              {prevValue ? prevValue : 'null'}
            </span>
            <span className="text-xxs md:text-sm xl:text-md lg:text-lg font-extralight">
              {prevYear ? prevYear : 'null'}
            </span>
          </div>
          <div className="border-l border-white h-8 md:h-12 mx-2"></div>
          <div className="flex flex-col items-center md:gap-1">
            <span
              className={`text-1.5xl md:text-5xl font-bold ${currValueColor}`}
            >
              {currValue ? currValue : 'null'}
            </span>
            <span className="text-xxs md:text-sm xl:text-md lg:text-lg font-extralight">
              {currYear ? currYear : 'null'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
