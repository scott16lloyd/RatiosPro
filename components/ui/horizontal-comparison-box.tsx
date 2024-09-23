import { ArrowRight } from 'lucide-react';
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
import { Info } from 'lucide-react';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { Button } from '@/components/ui/button';
import {
  CRDescription,
  QuickRatioDescription,
  DebtToEquityRatioDescription,
  PERatioDescription,
  PSRatioDescription,
  PBRatioDescription,
} from '@/lib/ratioDescriptions';

interface ComparisonItem {
  company: string;
  currValue: number;
  prevValue: number;
  prevYear: string;
  currYear: string;
}

interface HorizontalComparisonBoxProps {
  ratioName: string;
  items: ComparisonItem[];
}

export default function HorizontalComparisonBox({
  ratioName,
  items,
}: HorizontalComparisonBoxProps) {
  // Logic to determine text color based on value
  const colorRules: Record<string, (value: number) => string> = {
    CR: (value: number) => {
      if (value >= 2) return 'text-gradient';
      if (value < 1) return 'danger-gradient';
      return 'warning-gradient';
    },
    QR: (value: number) => (value >= 1 ? 'text-gradient' : 'danger-gradient'),
    DE: (value: number) => {
      if (value < 1) return 'text-gradient';
      if (value === 1) return 'warning-gradient';
      return 'danger-gradient';
    },
    PE: (value: number) => {
      if (value < 15) return 'text-gradient';
      if (value >= 15 && value < 20) return 'warning-gradient';
      return 'danger-gradient';
    },
    PSR: (value: number) => {
      if (value < 2) return 'text-gradient';
      if (value >= 2 && value < 5) return 'warning-gradient';
      return 'danger-gradient';
    },
    PBR: (value: number) => (value < 1 ? 'text-gradient' : 'danger-gradient'),
  };

  // Select color class based on value and its ratio
  const getColorClass = (value: number, ratioName: string): string => {
    console.log(value, ratioName);
    console.log(colorRules[ratioName](value));
    return colorRules[ratioName](value);
  };

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

  return (
    <div className="bg-secondary flex flex-col items-center py-2 px-2 md:px-4 lg:px-6 xl:px-2 2xl:px-3 rounded-lg w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 outline outline-zinc-700 outline-1 shadow-md shadow-zinc-900 scrollbar-hide">
      <h2 className="w-full gap-2 flex flex-row items-center text-lg md:text-3xl lg:text-4xl xl:text-4xl mb-4 self-start">
        {ratioName}
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
      </h2>
      {items && items.length > 0 ? (
        items.map((item, index) => (
          <div
            key={item.company}
            className={
              index !== 0
                ? 'mt-4 pt-4 border-t border-zinc-700 w-10/12'
                : 'w-10/12'
            }
          >
            <div className="text-lg font-medium">{item.company}</div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-400">{item.prevYear}</span>
                <span
                  className={`text-2xl font-bold ${getColorClass(
                    item.currValue,
                    ratioName
                  )}`}
                >
                  {item.currValue.toFixed(2)}
                </span>
              </div>
              <ArrowRight className="text-gray-400 mx-4" />
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-400">{item.currYear}</span>
                <span
                  className={`text-2xl font-bold ${getColorClass(
                    item.currValue,
                    ratioName
                  )}`}
                >
                  {item.prevValue.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No comparison data available.</p>
      )}
    </div>
  );
}
