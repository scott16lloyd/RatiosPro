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
- 1 **Current Assets**: These are assets that are either cash or expected to be converted into cash within a year. They include items like cash, accounts receivable, and inventory. \n
- 2 **Current Liabilities**: These are obligations that will be settled within a year. Examples include accounts payable, short-term debts, and taxes payable.


$$
\\text{Current Ratio} = \\frac{\\text{Current Assets}}{\\text{Current Liabilities}}
$$
`,
    ],
  ];

  const QuickRatioDescription = [
    ['What is the Quick Ratio?'],
    [
      `The **Quick Ratio**, also known as the **Acid-Test Ratio**, measures a company's ability to meet its short-term obligations with its most liquid assets. It provides insights into how effectively a company can use its quick assets to cover its current liabilities. Investors and analysts use the Quick Ratio to evaluate a company's short-term liquidity.
  
  ## **Formula and Calculation:**
  To calculate the Quick Ratio, we compare a company's **Quick Assets** to its **Current Liabilities**. Let's break it down:
  - 1 **Quick Assets**: These are assets that can be quickly converted into cash or are already in cash form. They include items like cash, marketable securities, and accounts receivable.
  - 2 **Current Liabilities**: These are obligations that will be settled within a year. Examples include accounts payable, short-term debts, and taxes payable.
  
  $$
  \\text{Quick Ratio} = \\frac{\\text{Quick Assets}}{\\text{Current Liabilities}}
  $$
  `,
    ],
  ];

  const DebtToEquityRatioDescription = [
    ['What is the Debt to Equity Ratio?'],
    [
      `The **Debt to Equity Ratio** measures a company's financial leverage. It provides insights into the balance between the company's total debt and its shareholders' equity. Investors and analysts use the Debt to Equity Ratio to evaluate a company's financial risk.
  
  ## **Formula and Calculation:**
  To calculate the Debt to Equity Ratio, we compare a company's **Total Liabilities** to its **Shareholders' Equity**. Let's break it down:
  - 1 **Total Liabilities**: These are all the debts and obligations owed by the company. They include both current liabilities (debts due within one year) and long-term liabilities (debts due in more than one year).
  - 2 **Shareholders' Equity**: Also known as net assets, it's the difference between total assets and total liabilities. It represents the net value of the company to its owners or shareholders.
  
  $$
  \\text{Debt to Equity Ratio} = \\frac{\\text{Total Liabilities}}{\\text{Shareholders' Equity}}
  $$
  `,
    ],
  ];

  const PERatioDescription = [
    ['What is the Price to Earnings (P/E) Ratio?'],
    [
      `The **Price to Earnings (P/E)** ratio measures the market value per share relative to the company's earnings per share (EPS). It provides insights into the dollar amount an investor can expect to invest in a company in order to receive one dollar of that company’s earnings. Investors and analysts use the P/E ratio to evaluate a company's relative value and profitability.
  
  ## **Formula and Calculation:**
  To calculate the P/E ratio, we compare a company's **Market Value per Share** to its **Earnings per Share (EPS)**. Let's break it down:
  - 1 **Market Value per Share**: This is the current share price of the company's stock in the open market.
  - 2 **Earnings per Share (EPS)**: This is the portion of a company's profit allocated to each outstanding share of common stock. It's calculated by dividing net income by the number of outstanding shares.
  
  $$
  \\text{P/E Ratio} = \\frac{\\text{Market Value per Share}}{\\text{Earnings per Share (EPS)}}
  $$
  `,
    ],
  ];

  const PSRatioDescription = [
    ['What is the Price to Sales (PSR) Ratio?'],
    [
      `The **Price to Sales (PSR)** ratio measures the company's market capitalization relative to its total sales over a given period. It provides insights into how much investors are willing to pay for each dollar of the company's sales. Investors and analysts use the PSR ratio to evaluate a company's market value relative to its revenue.
  
  ## **Formula and Calculation:**
  To calculate the PSR ratio, we compare a company's **Market Capitalization** to its **Total Sales**. Let's break it down:
  - 1 **Market Capitalization**: This is the total market value of a company's outstanding shares of stock. It's calculated by multiplying the company's current share price by its total number of outstanding shares.
  - 2 **Total Sales**: This is the total revenue that the company has generated from its business activities.
  
  $$
  \\text{PSR Ratio} = \\frac{\\text{Market Capitalization}}{\\text{Total Sales}}
  $$
  `,
    ],
  ];

  const PBRatioDescription = [
    ['What is the Price to Book (PBR) Ratio?'],
    [
      `The **Price to Book (PBR)** ratio measures the market's valuation of a company relative to its book value. It provides insights into how much investors are willing to pay for each dollar of a company's net assets. Investors and analysts use the PBR ratio to evaluate a company's market value relative to its net asset value.
  
  ## **Formula and Calculation:**
  To calculate the PBR ratio, we compare a company's **Market Capitalization** to its **Book Value of Equity**. Let's break it down:
  - 1 **Market Capitalization**: This is the total market value of a company's outstanding shares of stock. It's calculated by multiplying the company's current share price by its total number of outstanding shares.
  - 2 **Book Value of Equity**: This is the value of the company's assets according to its balance sheet. It's calculated by subtracting total liabilities from total assets.
  
  $$
  \\text{PBR Ratio} = \\frac{\\text{Market Capitalization}}{\\text{Book Value of Equity}}
  $$
  `,
    ],
  ];

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
            <div className="mx-auto w-full max-w-5xl overflow-y-scroll">
              <DrawerHeader>
                <DrawerTitle>
                  {ratioName in ratioDescriptions
                    ? ratioDescriptions[ratioName as RatioName][0][0]
                    : 'Default Title'}
                </DrawerTitle>
                <DrawerDescription>
                  <Markdown
                    className={'text-lg'}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    children={
                      ratioName in ratioDescriptions
                        ? ratioDescriptions[ratioName as RatioName]
                            .flat()
                            .join('\n')
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
