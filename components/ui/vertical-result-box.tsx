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

export function VerticalResultBox({
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
    }, 2000); // Adjust this delay to match the loading time of your chart

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const data = [
    {
      name: value[1][1] ? value[1][1] : 'previous',
      uv: value[1][0],
      max: 1,
    },
    {
      name: value[0][1] ? value[0][1] : 'current',
      uv: value[0][0],
      max: 1,
    },
  ];

  let barColor = 'white';
  if (value[0][0] > value[1][0]) {
    barColor = 'url(#greenGradient)';
  } else {
    barColor = 'url(#redGradient)';
  }

  return isLoading ? (
    <BentoSkeleton />
  ) : (
    <div className="w-full h-full p-1 gap-1 md:px-4 lg:px-6 xl:px-2 2xl:px-3 bg-secondary rounded-2xl flex flex-col items-center justify-between">
      <div className="text-left w-full px-2 text-base md:text-lg lg:text-xl xl:text-2xl">
        <span>{ratioName}</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barCategoryGap={4}
          layout="horizontal"
          margin={{ top: 20, bottom: 2, left: 0, right: 0 }}
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
          <XAxis dataKey="name" type="category">
            <Label offset={0} position="outside" />
          </XAxis>
          <YAxis type="number" domain={[0, 1]} hide />
          <Bar dataKey="uv" radius={[8, 8, 8, 8]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? 'white' : barColor}
              />
            ))}
            <LabelList
              dataKey="uv"
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
                    {value}
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
