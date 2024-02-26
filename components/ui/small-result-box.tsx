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

  const CRDescription = [
    ['What is the Current Ratio?'],
    [
      `The **current ratio** measures a company’s ability to pay its **short-term obligations**—those due within a year. It provides insights into how effectively a company can utilize its current assets to cover its current debts and other payables. Investors and analysts use the current ratio to evaluate a company’s financial health.

## **Formula and Calculation:**
To calculate the current ratio, we compare a company’s **current assets** to its **current liabilities**. Let’s break it down:

- 1. **Current Assets**: These are assets that are either cash or expected to be converted into cash within a year. They include items like cash, accounts receivable, and inventory.
- 2. **Current Liabilities**: These are obligations that will be settled within a year. Examples include accounts payable, short-term debts, and taxes payable.

`,
    ],
  ];

  const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

# A table:

| a | b |
| - | - |
`;

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
            <div className="mx-auto w-full max-w-5xl">
              <DrawerHeader>
                <DrawerTitle>{CRDescription[0][0]}</DrawerTitle>
                <DrawerDescription>
                  <Markdown className="text-lg">{CRDescription[1][0]}</Markdown>
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
