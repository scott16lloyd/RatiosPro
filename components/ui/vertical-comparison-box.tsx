'use client';

import { useState, useEffect } from 'react';
import { BentoSkeleton } from '@/components/ui/skeletons/bento-skeleton';
import {
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  Cell,
  LabelList,
  Label,
  Tooltip,
} from 'recharts';
import { Info } from 'lucide-react';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { Button } from './button';
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
import {
  ROADescription,
  RTDescription,
  ROEDescription,
} from '@/lib/ratioDescriptions';

export function VerticalComparisonBox({
  ratioName,
  value,
}: {
  ratioName: string;
  value: number[][];
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

  console.log('VALUE:' + value);

  const data = [
    { name: '2021', companyA: 0.4, companyB: 0.8 }, // Example values for 2021
    { name: '2022', companyA: 0.9, companyB: 0.8 }, // Example values for 2022
  ];

  console.log('data' + data);

  const getBarColor = (a: number, b: number, isCompanyA: boolean) => {
    if (a > b && isCompanyA) {
      return 'url(#greenGradient)';
    } else if (a < b && !isCompanyA) {
      return 'url(#greenGradient)';
    }
    return 'white'; // Set the smaller value's bar to white
  };

  type RatioName = 'ROA' | 'RT' | 'ROE';

  // Select description based on selected ratio
  const ratioDescriptions: Record<RatioName, string[][]> = {
    ROA: ROADescription,
    RT: RTDescription,
    ROE: ROEDescription,
  };

  return isLoading ? (
    <BentoSkeleton />
  ) : (
    <div className="w-full row-span-2 overflow-auto gap-1 md:px-4 lg:px-6 xl:px-2 2xl:px-3 bg-secondary rounded-2xl flex flex-col items-center justify-between outline outline-zinc-700 outline-1 shadow-md shadow-zinc-900">
      <div className="text-left w-full px-2 md:px-0 py-2 text-lg md:text-3xl lg:text-4xl xl:text-4xl flex flex-row items-center gap-2">
        <span>{ratioName ? ratioName : 'null'}</span>
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
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data ? data : []}
          barCategoryGap={1}
          layout="horizontal"
          margin={{ top: 20, bottom: 2, left: 1, right: 8 }}
        >
          <defs>
            <linearGradient
              id="greenGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="50%"
                style={{ stopColor: 'hsla(120, 65%, 53%, 1)' }}
              />
              <stop
                offset="100%"
                style={{ stopColor: 'hsla(120, 100%, 37%, 1)' }}
              />
            </linearGradient>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="50%"
                style={{ stopColor: 'hsla(0, 100%, 50%, 1)' }}
              />
              <stop
                offset="100%"
                style={{ stopColor: 'hsla(0, 100%, 37%, 1)' }}
              />
            </linearGradient>
          </defs>
          <XAxis dataKey="name">
            <Label offset={0} position="outside" />
          </XAxis>
          <YAxis type="number" domain={[0, 1]} hide />
          <Tooltip />
          <Bar dataKey="companyA" name="Company A" radius={[8, 8, 8, 8]}>
            {data.map(
              (entry, index) => (
                console.log(
                  'ENTRY A: ' + entry.companyA + ' ENTRY B: ' + entry.companyB
                ),
                (
                  <Cell
                    key={`cell-${index}`}
                    fill={getBarColor(entry.companyA, entry.companyB, true)}
                  />
                )
              )
            )}
            <LabelList
              dataKey="companyA"
              position="top"
              content={(props) => {
                const { x, y, value } = props;
                return (
                  <text
                    x={(x as number) + 15}
                    y={y}
                    dy={-4}
                    fill={props.index === 0 ? 'grey' : 'white'}
                    textAnchor="middle"
                  >
                    {value ? value : 0}
                  </text>
                );
              }}
            />
          </Bar>
          <Bar dataKey="companyB" name="Company B" radius={[8, 8, 8, 8]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry.companyA, entry.companyB, false)}
              />
            ))}
            <LabelList
              dataKey="companyB"
              position="top"
              content={(props) => {
                const { x, y, value } = props;
                return (
                  <text
                    x={(x as number) + 15}
                    y={y}
                    dy={-4}
                    fill={props.index === 0 ? 'grey' : 'white'}
                    textAnchor="middle"
                  >
                    {value ? value : 0}
                  </text>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
