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
} from 'recharts';

export function VerticalResultBox() {
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
      name: 'previous',
      uv: 50,
      max: 100,
    },
    {
      name: 'current',
      uv: 100,
      max: 100,
    },
  ];

  return isLoading ? (
    <BentoSkeleton />
  ) : (
    <div className="w-full h-full p-2 gap-1 md:px-4 lg:px-6 xl:px-2 2xl:px-8 bg-secondary rounded-2xl flex flex-col items-center justify-between">
      <div className="text-left w-full px-2 text-base md:text-lg lg:text-xl xl:text-2xl">
        <span>PSR</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barCategoryGap={4}
          layout="horizontal"
          margin={{ top: 20, bottom: 2, left: 2, right: 2 }}
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="50%"
                style={{ stopColor: 'hsla(120, 65%, 53%, 1)' }}
              />
              <stop
                offset="100%"
                style={{ stopColor: 'hsla(120, 100%, 37%, 1)' }}
              />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" type="category" hide />
          <YAxis type="number" domain={[0, 100]} hide />
          <Bar dataKey="uv" radius={[8, 8, 8, 8]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? 'white' : 'url(#gradient)'}
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
